import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../context/GlobalContext";
import { queryPayments } from "../../api/client";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PieChart = () => {
  const { areas, shops } = useGlobalContext();

  // Fetch payments data
  const {
    data: paymentsData,
    isLoading,
    isError,
  } = useQuery("all-payments", () => queryPayments({}));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading payments.</p>;

  const payments = paymentsData ? paymentsData.payments : [];

  const areaPayments = areas.reduce((acc, area) => {
    const areaShops = shops.filter((shop) => {
      const regions = Array.isArray(shop.region) ? shop.region : [shop.region];
      return regions.some((region) => region?._id === area?._id);
    });

    const totalPaidAmount = payments.reduce((sum, payment) => {
      const shopInArea = areaShops.some(
        (shop) => shop._id === payment.shop._id
      );
      if (shopInArea) {
        return sum + payment.paidAmount;
      }
      return sum;
    }, 0);

    return {
      ...acc,
      [area._id]: totalPaidAmount,
    };
  }, {} as { [key: string]: number });

  // Prepare data for PieChart
  const labels = areas.map((area) => area.name);
  const data = areas.map((area) => areaPayments[area._id] || 0);
  const totalPayment = data.reduce((sum, value) => sum + value, 0);

  // PieChart data
  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Total Payment",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)", // Red
          "rgba(54, 162, 235, 0.9)", // Blue
          "rgba(255, 206, 86, 0.9)", // Yellow
          "rgba(75, 192, 192, 0.9)", // Teal
          "rgba(153, 102, 255, 0.9)", // Purple
          "rgba(255, 159, 64, 0.9)", // Orange
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw as number;
            const percentage =
              totalPayment > 0
                ? ((value / totalPayment) * 100).toFixed(2)
                : "0.00";
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={pieChartData} options={options} />;
};

export default PieChart;
