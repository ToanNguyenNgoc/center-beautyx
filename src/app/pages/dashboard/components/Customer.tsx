/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getCSSVariableValue } from '_metronic/assets/ts/_utils'
import dayjs from 'dayjs'
import { ListsWidget2 } from '_metronic/partials/widgets'


export const Customer: FC = () => {
  return (
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-8'>
        <CustomerChart
          className='card-xxl-stretch mb-xl-3'
          chartColor='danger'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-4'>
        <ListsWidget2 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}


type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

export const CustomerChart: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column p-0'>
        {/* begin::Stats */}
        <div className='flex-grow-1 card-p pb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <div className='me-2'>
              <a href='#' className='text-dark text-hover-primary fw-bold fs-3'>
                Khách hàng đăng ký
              </a>

              <div className='text-muted fs-7 fw-semobold sort-container'>
                {dayjs().format("YYYY")}
              </div>
            </div>

            <div className={`fw-bold fs-3 text-${chartColor}`}>$24,500</div>
          </div>
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

interface CustomerApexOptions extends ApexOptions {

}

const chartOptions = (chartColor: string, chartHeight: string): CustomerApexOptions => {
  return {
    chart: {
      type: 'area'
    },
    series: [
      {
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 500]
      }
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
      labels: {
        show: false,
        style: {
          fontSize: '12px',
        },
      },
    }
  }
}
