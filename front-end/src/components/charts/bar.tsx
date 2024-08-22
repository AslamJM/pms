import { Bar } from "react-chartjs-2";
import { barChartData } from "./fakeData";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const BarChart = () => {
  const options: any = {
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
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };
  return <Bar options={options} data={barChartData} />;
};
