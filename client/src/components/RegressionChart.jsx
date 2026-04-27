import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);

function RegressionChart({ regression }) {
  if (!regression) return null;

  const { b0, b1, points } = regression;

  // Create regression line points
  const minAge = Math.min(...points.map((p) => p.x));
  const maxAge = Math.max(...points.map((p) => p.x));

  const regressionLinePoints = [
    { x: minAge, y: b0 + b1 * minAge },
    { x: maxAge, y: b0 + b1 * maxAge },
  ];

  const chartData = {
    datasets: [
      {
        label: "Data Points",
        data: points,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
      },
      {
        label: "Regression Line",
        data: regressionLinePoints,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        showLine: true,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Age vs Blood Pressure",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `(${context.parsed.x}, ${context.parsed.y.toFixed(2)})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Age (years)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Blood Pressure (mmHg)",
        },
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default RegressionChart;
