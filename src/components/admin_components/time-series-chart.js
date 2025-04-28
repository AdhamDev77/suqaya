"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "العائد المالي",
      data: [400, 300, 200, 278, 189, 239],
      borderColor: "#0088FE",
      backgroundColor: "#0088FE",
    },
    {
      label: "اجمالي المدخلات",
      data: [300, 400, 300, 350, 400, 450],
      borderColor: "#00C49F",
      backgroundColor: "#00C49F",
    },
    {
      label: "القيمة الاجتماعية",
      data: [200, 250, 300, 280, 310, 340],
      borderColor: "#FFBB28",
      backgroundColor: "#FFBB28",
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
    title: {
      display: true,
      text: "Financial Metrics Over Time",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

export function TimeSeriesChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Financial Metrics Over Time</h2>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}