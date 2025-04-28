"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = [
  { name: "Address 1", value: 250 },
  { name: "Address 2", value: 200 },
  { name: "Address 3", value: 150 },
  { name: "Address 4", value: 100 },
  { name: "Others", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Convert data to Chart.js format
const chartData = {
  labels: data.map((item) => item.name),
  datasets: [
    {
      data: data.map((item) => item.value),
      backgroundColor: COLORS,
      hoverOffset: 4,
    },
  ],
};

// Chart.js options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
    title: {
      display: true,
      text: "Company Address Distribution",
    },
  },
};

export function AddressDistributionChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Company Address Distribution</h2>
      <div className="h-[300px] flex justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
