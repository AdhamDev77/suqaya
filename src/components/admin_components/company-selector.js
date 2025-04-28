"use client"

import React from "react"
import { useState } from "react"

const companies = [
  { value: "company1", label: "Company 1", type: "Type A", address: "Address 1" },
  { value: "company2", label: "Company 2", type: "Type B", address: "Address 2" },
  { value: "company3", label: "Company 3", type: "Type A", address: "Address 3" },
]

export function CompanySelector() {
  const [selectedCompany, setSelectedCompany] = useState("")

  return (
    <div className="w-full max-w-xs mx-auto">
      <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Company
      </label>
      <select
        id="company-select"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a company...</option>
        {companies.map((company) => (
          <option key={company.value} value={company.value}>
            {company.label} - {company.type}, {company.address}
          </option>
        ))}
      </select>
    </div>
  )
}

