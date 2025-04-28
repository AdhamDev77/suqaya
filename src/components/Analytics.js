import { React, Suspense } from "react"
import { CompanySelector } from "./admin_components/company-selector"
import { OverviewCards } from "./admin_components/overview-cards"
import { TypeDistributionChart } from "./admin_components/type-distribution-chart"
import { AddressDistributionChart } from "./admin_components/address-distribution-chart"
import { ParametersComparisonChart } from "./admin_components/parameters-comparison-chart"
import { TimeSeriesChart } from "./admin_components/time-series-chart"
import CompanyPerformanceTable from "./admin_components/company-performance-table"

export default function Analytics() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <Suspense fallback={<div>Loading company selector...</div>}>
        <CompanySelector />
      </Suspense>
      <Suspense fallback={<div>Loading overview...</div>}>
        <OverviewCards />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading type distribution...</div>}>
          <TypeDistributionChart />
        </Suspense>
        <Suspense fallback={<div>Loading address distribution...</div>}>
          <AddressDistributionChart />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading parameters comparison...</div>}>
        <ParametersComparisonChart />
      </Suspense>
      <Suspense fallback={<div>Loading time series chart...</div>}>
        <TimeSeriesChart />
      </Suspense>
      <Suspense fallback={<div>Loading company performance table...</div>}>
        <CompanyPerformanceTable />
      </Suspense>
    </div>
  )
}

