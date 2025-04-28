"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = [
  {
    type: "Type A",
    "العائد المالي": 400,
    "اجمالي المدخلات": 300,
    "القيمة الاجتماعية": 200,
    "عدد المؤشرات": 50,
    "عدد النتائج": 80,
    "عدد المتأثرين": 1000,
  },
  {
    type: "Type B",
    "العائد المالي": 350,
    "اجمالي المدخلات": 250,
    "القيمة الاجتماعية": 180,
    "عدد المؤشرات": 40,
    "عدد النتائج": 70,
    "عدد المتأثرين": 800,
  },
  {
    type: "Type C",
    "العائد المالي": 300,
    "اجمالي المدخلات": 200,
    "القيمة الاجتماعية": 150,
    "عدد المؤشرات": 30,
    "عدد النتائج": 60,
    "عدد المتأثرين": 600,
  },
  {
    type: "Type D",
    "العائد المالي": 250,
    "اجمالي المدخلات": 150,
    "القيمة الاجتماعية": 120,
    "عدد المؤشرات": 20,
    "عدد النتائج": 50,
    "عدد المتأثرين": 400,
  },
];

// Define chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

// Extract keys dynamically
const keys = Object.keys(data[0]).filter((key) => key !== "type");

// Prepare datasets for Chart.js
const chartData = {
  labels: data.map((item) => item.type),
  datasets: keys.map((key, index) => ({
    label: key,
    data: data.map((item) => item[key]),
    backgroundColor: COLORS[index % COLORS.length],
  })),
};

// Chart.js options
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
      text: "Parameters Comparison by Company Type",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Company Type",
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

export function ParametersComparisonChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Parameters Comparison by Company Type</h2>
      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
