import { Pie } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { pieChartData } from "./fakeData";

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

export const PieChart = () => {
    const options: any = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    };

    return <Pie options={options} data={pieChartData} />;
};