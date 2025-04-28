"use client"
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Type A", "Type B", "Type C", "Type D"],
  datasets: [
    {
      data: [400, 300, 200, 100],
      backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      borderColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export function TypeDistributionChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Company Type Distribution</h2>
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}