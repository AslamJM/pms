import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useGlobalContext } from "../../context/GlobalContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarCharts = () => {
  const { companyPayments } = useGlobalContext();

  const labels = companyPayments.map(payment => payment.companyName);
  const totalPayments = companyPayments.map(payment => payment.totalPayment);
  const paidPayments = companyPayments.map(payment => payment.paid);
  const duePayments = companyPayments.map(payment => payment.due);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Payment",
        data: totalPayments,
        backgroundColor: "rgba(79, 195, 247, 0.9)",
        borderColor: "rgba(79, 195, 247, 1)",
        borderWidth: 1,
      },
      {
        label: "Paid",
        data: paidPayments,
        backgroundColor: "rgba(54, 162, 235, 0.9)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Due",
        data: duePayments,
        backgroundColor: "rgba(255, 206, 86, 0.9)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Payment",
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};
