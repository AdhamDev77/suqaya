import React from "react"
const metrics = [
  { title: "العائد المالي علي الاستثمار", value: "15%" },
  { title: "اجمالي المدخلات", value: "1,234,567" },
  { title: "القيمة الاجتماعية", value: "987,654" },
  { title: "عدد المؤشرات", value: "42" },
  { title: "عدد النتائج", value: "156" },
  { title: "عدد المتأثرين", value: "10,000+" },
]

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">{metric.title}</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}

