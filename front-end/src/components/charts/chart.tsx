import React from 'react';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../context/GlobalContext';
import { IArea, queryPayments } from '../../api/client';

const ShopList = () => {
  const { areas, shops } = useGlobalContext();

  // Fetch payments data
  const { data: paymentsData, isLoading: paymentsLoading, isError: paymentsError } = useQuery(
    "all-payments",
    () => queryPayments({})
  );

  // Handle loading and errors
  if (paymentsLoading) return <p>Loading...</p>;
  if (paymentsError) return <p>Error loading payments.</p>;

  // Ensure paymentsData is defined
  const payments = paymentsData ? paymentsData.payments : [];

  // Calculate payments for each area
  const areaPayments = areas.reduce((acc, area) => {
    // Filter shops that belong to the current area
    const areaShops = shops.filter(shop => {
      const regions = Array.isArray(shop.region) ? shop.region : [shop.region];
      return regions.some(region => region._id === area._id);
    });

    // Calculate total paid amount for the current area
    const totalPaidAmount = payments.reduce((sum, payment) => {
      // Check if the payment's shop belongs to the current area
      const shopInArea = areaShops.some(shop => shop._id === payment.shop._id);
      if (shopInArea) {
        return sum + payment.paidAmount;
      }
      return sum;
    }, 0);

    return {
      ...acc,
      [area._id]: totalPaidAmount
    };
  }, {} as { [key: string]: number });

  // Prepare data for PieChart
  const labels = areas.map(area => area.name);
  const data = areas.map(area => areaPayments[area._id] || 0);

  return (
    <div>
      <h1>All Areas</h1>
      {areas && areas.length > 0 ? (
        <ul>
          {areas.map((area) => (
            <li key={area._id}>
              {area.name}
              <span>
                {areaPayments[area._id] !== undefined
                  ? `$${areaPayments[area._id].toFixed(2)}`
                  : 'No payment data'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No areas available</p>
      )}
    </div>
  );
};

export default ShopList;
