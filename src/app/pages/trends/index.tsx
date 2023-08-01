import TitlePage from 'components/TitlePage'
import { AppSnack, PageCircularProgress, XPagination } from 'components'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFetch, useGetParamUrl, useMessage } from 'app/hooks'
import { API_3RD } from 'app/api/api-route'
import dayjs from 'dayjs'
import { toAbsoluteUrl } from '_metronic/helpers'
import { ITrend } from './trend.interface'
import request3rdApi from 'app/api/api-3rd-client/request'
import { Button, CircularProgress } from '@mui/material'
import { useMutation } from 'react-query'

function Trend() {
  const navigate = useNavigate()
  const location = useLocation()
  const query: any = useGetParamUrl()
  const { totalPage, response, isValidating } = useFetch(true, `${API_3RD.TRENDS}?page=${query?.page ?? 1}&include=services`)
  const onChangePage = (page: number) => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}`
    })
  }
  return (
    <>
      <TitlePage
        title='Trends'
        element={
          <Button
            size='large' color='success' variant='contained'
            onClick={() => navigate('/pages/trend-form')}
          >
            Tạo mới
          </Button>
        }
      />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Bài đăng</span>
            {/* <span className='text-muted mt-1 fw-semobold fs-7'>Over {totalItem}</span> */}
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-100px'>Bài đăng</th>
                  <th className='min-w-70px'>Thumbnail</th>
                  <th className='min-w-140px'>Doanh nghiệp</th>
                  <th className='min-w-140px'>Dịch vụ được gán</th>
                  <th className='min-w-120px'>Ngày đăng</th>
                  <th className='min-w-120px'>Ngày sửa</th>
                  <th className='min-w-100px'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {response?.data?.map((item: ITrend) => (
                  <TrendRow key={item._id} item={item} />
                ))}
              </tbody>
            </table>
            <PageCircularProgress loading={isValidating} />
          </div>
        </div>
      </div>
      <XPagination
        onChangePage={onChangePage}
        totalPage={totalPage}
        defaultPage={query?.page ?? 1}
      />
    </>
  )
}

const TrendRow = ({ item }: { item: ITrend }) => {
  const navigate = useNavigate()
  const { noti, resultLoad, onCloseNoti } = useMessage()
  const handleDetail = (serviceDetail: ITrend) => {
    navigate(`/pages/trend-form/${serviceDetail._id}`)
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: () => request3rdApi.refreshComment(item._id),
    onSuccess: () => resultLoad({ color: 'success', message: 'Refresh trend success' }),
    onError: () => resultLoad({ color: 'error', message: 'Refresh trend fail' })
  })
  return (
    <>
      <tr key={item._id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px me-5'>
              <img src={toAbsoluteUrl(item.organization_image)} alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-bold fs-6'>{item.title}</span>
            </div>
          </div>
        </td>
        <td>
          <div className='symbol symbol-75px me-5'>
            <img style={{ objectFit: 'contain' }} src={toAbsoluteUrl(item.image_thumb)} alt='' />
          </div>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-6'>
            {item.organization_name}
          </span>
        </td>
        <td>
          {item.services?.map((service) => (
            <p key={service.id} className='text-dark d-block fs-6'>
              {service.service_name}
            </p>
          ))}
        </td>
        <td>
          <span className='text-dark d-block fs-7'>
            {dayjs(item.createdAt).format('DD/MM/YYYY')}
          </span>
        </td>
        <td>
          <span className='text-dark d-block fs-7'>
            {dayjs(item.updatedAt).format('DD/MM/YYYY')}
          </span>
        </td>
        <td>
          <div className='d-flex justify-content-end flex-shrink-0'>
            <button
              onClick={() => handleDetail(item)}
              style={{ marginRight: '6px' }}
              className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
            >
              <i className='bi bi-pencil-fill fs-6'></i>
            </button>
            <button
              onClick={() => mutate()}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              {isLoading ? <CircularProgress size={12} /> : <i className="bi bi-arrow-clockwise"></i>}
            </button>
          </div>
        </td>
      </tr>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
    </>
  )
}

export default Trend
