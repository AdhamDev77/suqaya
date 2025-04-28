import React from "react"
const data = [
  {
    company: "Company A",
    type: "Type A",
    address: "Address 1",
    "العائد المالي": 400,
    "اجمالي المدخلات": 300,
    "القيمة الاجتماعية": 200,
    "عدد المؤشرات": 50,
    "عدد النتائج": 80,
    "عدد المتأثرين": 1000,
  },
  {
    company: "Company B",
    type: "Type B",
    address: "Address 2",
    "العائد المالي": 350,
    "اجمالي المدخلات": 250,
    "القيمة الاجتماعية": 180,
    "عدد المؤشرات": 40,
    "عدد النتائج": 70,
    "عدد المتأثرين": 800,
  },
  {
    company: "Company C",
    type: "Type A",
    address: "Address 3",
    "العائد المالي": 300,
    "اجمالي المدخلات": 200,
    "القيمة الاجتماعية": 150,
    "عدد المؤشرات": 30,
    "عدد النتائج": 60,
    "عدد المتأثرين": 600,
  },
  {
    company: "Company D",
    type: "Type C",
    address: "Address 1",
    "العائد المالي": 250,
    "اجمالي المدخلات": 150,
    "القيمة الاجتماعية": 120,
    "عدد المؤشرات": 20,
    "عدد النتائج": 50,
    "عدد المتأثرين": 400,
  },
]

const CompanyPerformanceTable = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Company Performance Table</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              العائد المالي
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              اجمالي المدخلات
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              القيمة الاجتماعية
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              عدد المؤشرات
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              عدد النتائج
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              عدد المتأثرين
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{row.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["العائد المالي"]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["اجمالي المدخلات"]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["القيمة الاجتماعية"]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["عدد المؤشرات"]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["عدد النتائج"]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row["عدد المتأثرين"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompanyPerformanceTable

