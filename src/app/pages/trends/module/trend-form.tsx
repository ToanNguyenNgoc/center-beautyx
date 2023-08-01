import TitlePage from 'components/TitlePage'
import { useFormik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMessage, usePostMedia } from 'app/hooks'
import { accept_image, accept_video } from 'app/util'
import { IMGS } from '_metronic/assets/imgs/imgs'
import { CircularProgress } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { request3rdApi } from 'app/api/api-3rd-client'
import { LoadingButton } from '@mui/lab'
import { IOrganization, IService } from 'app/interface'
import { AppSnack, SelectionOrg } from 'components'
import { SelectService } from 'app/pages/discounts/module/discount-form/select-service'
import './style.scss'
import { AxiosError } from 'axios'


function TrendForm() {
  const params: any = useParams()
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const { handlePostMedia: handlePostThumb } = usePostMedia()
  const [organization, setOrganization] = useState<IOrganization>()
  const [services, setServices] = useState<IService[]>([])
  const { handlePostMedia, isLoading } = usePostMedia()
  const { mutate, isLoading: isLoadPost } = useMutation({
    mutationFn: (body: any) => params.id ? request3rdApi.putTrend(params.id, body) : request3rdApi.postTrend(body),
    onSuccess: () => params.id ? resultLoad({ message: 'Cập nhật thành công' }) : resultLoad({ message: 'Tạo mới thành công' }),
    onError: (errors: any) => {
      const err = errors as AxiosError
      resultLoad({
        color: 'error',
        message: `Có lỗi xảy ra. Mã lỗi ${err?.request?.status}`
      })
    }
  })
  const formik = useFormik({
    initialValues: {
      media_url: '',
      image_thumb: '',
      title: '',
      content: '',
      trend_url: ''
    },
    onSubmit: (values) => {
      mutate({
        ...values,
        organization_id: organization?.id,
        services: services.map(i => i.id
        )
      })
    }
  })
  const { refetch, isRefetching, data } = useQuery({
    queryKey: ['TREND', params.id],
    queryFn: () => request3rdApi.trend(params.id),
    enabled: params.id ? true : false,
    onSuccess: (data) => {
      const trend = data.context
      const ser: any = trend.services
      setServices(ser)
      formik.setFieldValue('media_url', trend.media_url)
      formik.setFieldValue('image_thumb', trend.image_thumb)
      formik.setFieldValue('title', trend.title)
      formik.setFieldValue('content', trend.content)
      formik.setFieldValue('trend_url', trend.trend_url)
    }
  })
  const onChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => formik.setFieldValue('media_url', data[0]?.original_url),
      version: 'api.beautyx',
      resetOriginalResult:true
    })
  }
  const onChangeThumb = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostThumb({
      e,
      callBack: (data) => formik.setFieldValue('image_thumb', data[0]?.original_url),
      version: 'api.beautyx',
      resetOriginalResult:true
    })
  }
  return (
    <>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <TitlePage title={params.id ? 'Thay đổi nội dung' : 'Thêm mới'} />
      <div className="container">
        <form onSubmit={formik.handleSubmit} className="trend-form">
          <div className="video d-flex justify-content-between">
            <div className="video-left">
              <div className="required form-label">Video</div>
              <div className="drag-video">
                {
                  isLoading &&
                  <div className="drag-video-load">
                    Đang tải video lên...
                    <CircularProgress />
                  </div>
                }
                {
                  formik.values.media_url === "" ?
                    <img src={IMGS.imgPlaceHolder} alt="" />
                    :
                    <video controls>
                      <source src={formik.values.media_url} />
                    </video>
                }
              </div>
              <div className="input-video">
                <input onChange={onChangeVideo} hidden type="file" accept={accept_video} id='video' />
                <label htmlFor="video" className='btn btn-primary btn-up-img'>
                  <i className="bi bi-arrow-bar-up"></i>
                </label>
                <input
                  onChange={formik.handleChange} name='media_url' value={formik.values.media_url}
                  type="text" className='form-control form-control-solid mt-4'
                  placeholder='Hoặc video url...' />
              </div>
            </div>
            <div className="video-right">
              <div className="required form-label">Image thumbnail</div>
              <div className="drag-image">
                <img src={formik.values.image_thumb || IMGS.imgPlaceHolder} alt="" />
              </div>
              <div className="input-img">
                <input onChange={onChangeThumb} hidden type="file" accept={accept_image} id='up-img' />
                <label htmlFor="up-img" className='btn btn-primary btn-up-img'>
                  <i className="bi bi-arrow-bar-up"></i>
                </label>
                <input
                  onChange={formik.handleChange} value={formik.values.image_thumb} name='image_thumb'
                  type="text" className='form-control form-control-solid mt-4'
                  placeholder='Hoặc image url...'
                />
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <div className="required form-label">Tiêu đề</div>
            <input
              type="text" onChange={formik.handleChange} value={formik.values.title} name="title"
              className="form-control form-control-solid" placeholder='Tiêu đề'
            />
          </div>
          <div className="col mt-4">
            <div className="required form-label">Nội dung</div>
            <input
              type="text" onChange={formik.handleChange} value={formik.values.content} name="content"
              className="form-control form-control-solid" placeholder='Nội dung'
            />
          </div>
          <div className="col mt-4">
            <div className="required form-label">Link tiktok</div>
            <input
              type="text" onChange={formik.handleChange} value={formik.values.trend_url} name="trend_url"
              className="form-control form-control-solid" placeholder='Link tiktok'
            />
          </div>
          <div className='mt-4'>
            <SelectionOrg
              organization_id={data?.context?.organization_id} origin={organization}
              setOrigin={setOrganization}
            />
            <div className="mt-4">
              <SelectService
                orgsChoose={organization ? [organization] : []}
                values={services}
                setValues={setServices}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-8">
            {
              params.id &&
              <LoadingButton style={{ marginRight: '8px' }} onClick={() => refetch()} loading={isRefetching} type='button'
                variant='contained' color='primary' size='large' >
                Khôi phục
              </LoadingButton>
            }
            <LoadingButton loading={isLoadPost} type='submit' variant='contained' color='success' size='large' >
              {!params.id ? 'Tạo mới' : 'Lưu thay đổi'}
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

export default TrendForm