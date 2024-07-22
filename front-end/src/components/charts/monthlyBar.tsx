import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { monthlyBarChartData } from "./fakeData";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

export const MonthlyBarChart = () => {
    const options: any = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Payment",
                },
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    };
    return <Bar options={options} data={monthlyBarChartData} />
};