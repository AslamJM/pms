import { Line } from "react-chartjs-2";
import { lineChartData } from "./fakeData";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const LineGraph = () => {
  const options = {};

  return <Line options={options} data={lineChartData} />;
};
