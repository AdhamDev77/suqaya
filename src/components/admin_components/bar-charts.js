import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: "Jan", total: 1000 },
  { name: "Feb", total: 1200 },
  { name: "Mar", total: 900 },
  { name: "Apr", total: 1500 },
  { name: "May", total: 1800 },
  { name: "Jun", total: 2000 },
];

export function BarCharts() {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
      </div>
      <div className="p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              cursor={{fill: 'rgba(0,0,0,0.1)'}}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="total" 
              fill="#3182ce" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarCharts;