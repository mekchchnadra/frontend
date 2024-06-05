import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

const BarChart = (jsonData) => {
  const [chartLables, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const formattedData = () => {
    console.log("Chart data recieved", jsonData);
    console.log("Labels: ", Object.keys(jsonData.jsonData.chartData));
    setChartLabels(Object.keys(jsonData.jsonData.chartData));
    console.log("Data: ", Object.values(jsonData.jsonData.chartData));
    setChartData(Object.values(jsonData.jsonData.chartData));
  };

  useEffect(() => {
    formattedData();
  }, []);

  const data = {
    labels: chartLables,
    datasets: [
      {
        label: "Rating (0-5)",
        data: chartData, // Example ratings for each attribute
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color for bars
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,

    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <div className={" h-[50vh] w-[60vw]"}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
