/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  MixedWidget10,
  MixedWidget11,
  ListsWidget5,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'
import { TopProductWidget, TopContract, OrderWidget, TopServices } from './components';
const DashboardPage: FC = () => (
  <>
    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        {/* <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        /> */}
        <ListsWidget5 className='card-xxl-stretch' />
      </div>
      <div className='col-xxl-8'>
        <TopContract className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
      <div className='col-xxl-7'>
        <TopServices className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
      <div className='col-xxl-5'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
    </div>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget5 className='card-xxl-stretch' />
      </div>
      <div className='col-xxl-8'>
        {/* <MixedWidget10
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='150px'
        /> */}
        <OrderWidget
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='150px'
        />
        <MixedWidget11
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='175px'
        />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
