/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef, useState } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { useThemeMode } from '_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { ListsWidget2 } from '_metronic/partials/widgets'
import { useMutation, } from 'react-query'
import { QR_KEY } from 'common'
import { statisticApi } from 'app/api'
import moment from 'moment'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

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
  const [counts, setCounts] = useState<{ month: number, t: number, txt: string }[]>([])
  const [year, setYear] = useState<string>(moment().format('YYYY'))
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    setCounts([])
  };
  const { mutate } = useMutation({
    mutationKey: [QR_KEY.CUSTOMER, year],
    mutationFn: ({ month, daysMonth }: { month: number, daysMonth: number }) => statisticApi.customers({
      'from_date': `${year}-${String(month).padStart(2, '0')}-01 00:00:00`,
      'to_date': `${year}-${String(month).padStart(2, '0')}-${daysMonth} 00:00:00`,
    }),
    onSuccess: (data) => {
      setCounts(prev => [...prev, {
        month: Number(moment(data.from_date).format('MM')),
        t: data.total,
        txt: moment(data.from_date).format('[Tháng] MM')
      }])
    },
  })
  useEffect(() => {
    for (var i = 1; i <= 12; i++) {
      const days = new Date(Number(year), i, 0).getDate();
      mutate({
        month: i,
        daysMonth: days
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(
      chartColor,
      chartHeight,
      counts.sort((a, b) => a.month - b.month)
    ))
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
  }, [chartRef, mode, counts])

  return (
    <div className={`card ${className}`}>
      <div className='card-body d-flex flex-column p-0'>
        <div className='flex-grow-1 card-p pb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <div className='me-2'>
              <a href='#' className='text-dark text-hover-primary fw-bold fs-3'>
                Khách hàng đăng ký
              </a>
              <div className='text-muted fs-7 fw-semobold sort-container'>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Năm</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={year}
                    label="Năm"
                    onChange={handleChange}
                  >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={`fw-bold fs-3 text-${chartColor}`}>
              Tổng cộng:{" "}
              {counts.reduce((accumulator, currentValue) => accumulator + currentValue.t, 0)}
            </div>
          </div>
        </div>
        <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
      </div>
    </div>
  )
}

const chartOptions = (chartColor: string, chartHeight: string, counts: any[]): ApexOptions => {
  return {
    chart: {
      type: 'area'
    },
    series: [
      {
        name: 'Lượt đăng ký',
        data: counts.map((i: any) => i.t)
      }
    ],
    xaxis: {
      categories: counts.map((i: any) => i.txt),
      labels: {
        show: false,
        style: {
          fontSize: '12px',
        },
      },
    }
  }
}
