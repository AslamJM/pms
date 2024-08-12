import axios from 'axios';

// Fetch area and payment data
const fetchData = async () => {
  try {
    const [areasResponse, paymentsResponse] = await Promise.all([
      axios.get('/api/areas'),
      axios.get('/api/payments')
    ]);

    const areas = areasResponse.data;
    const payments = paymentsResponse.data;


    const areaPayments = areas.map((area: { id: any; name: any; }) => {
      const totalPaid = payments
        .filter((payment: { areaId: any; }) => payment.areaId === area.id)
        .reduce((sum: any, payment: { amount: any; }) => sum + payment.amount, 0);

      return { area: area.name, totalPaid };
    });

    return areaPayments;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const chart ={ fetchData };