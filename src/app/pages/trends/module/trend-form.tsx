import { Avatar, SnackAlert, XButton } from 'components'
import TitlePage from 'components/TitlePage'
import { useFormik } from 'formik'
import React, { useCallback, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from './style.module.scss'
import { API_3RD } from 'app/api/api-route'
import { useFetchInfinite, useNoti, usePostMedia, useSwr } from 'app/hooks'
import { FileUploader } from 'react-drag-drop-files'
import { clst, postMedia } from 'app/util'
import { IMGS } from '_metronic/assets/imgs/imgs'
import { paramOrgs } from 'app/query-params'
import { Dialog } from '@mui/material'
import { debounce } from 'lodash'
import { IOrganization, IService } from 'app/interface'
import { paramService } from 'app/query-params'
import request3rdApi from 'app/api/api-3rd-client/request'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'


function TrendForm() {
  const params: any = useParams()
  const { id } = params
  const [token, setToken] = useState(localStorage.getItem('3rd-auth'))
  const { response, isValidating } = useSwr(id, API_3RD.TRENDS_DETAIL(id), {
    include: 'services',
  })
  let displayForm = false
  if (token && !id) displayForm = true
  if (token && id && response && !isValidating) displayForm = true
  return (
    <>
      <TitlePage title={id ? 'Thay đổi nội dung' : 'Thêm mới'} />
      <div className={style.container}>
        {!token && <LoginRequest setToken={setToken} />}
        {displayForm && <Form response={response} />}
      </div>
    </>
  )
}

export default TrendForm

const LoginRequest = ({ setToken }: { setToken: (tk: string) => void }) => {
  const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
  const handleLogin = async (values: any) => {
    firstLoad()
    try {
      const res: any = await axios.post(API_3RD.LOGIN, {
        email: values.email,
        password: values.password,
      })
      const token = await res?.context?.token
      setToken(token)
      localStorage.setItem('3rd-auth', token)
      resultLoad('Đăng nhập thành công')
    } catch (error) {
      console.log(error)
      resultLoad('Đăng nhập thất bại')
    }
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      handleLogin(values)
    },
  })
  return (
    <div className={style.login_cnt}>
      <SnackAlert onClose={onCloseNoti} open={noti.openAlert} title={noti.message} />
      <form onSubmit={formik.handleSubmit} autoComplete='off' className={style.login_form}>
        <div className={style.login_form_ip}>
          <div className={style.login_form_row}>
            <input
              type='text'
              className='form-control'
              placeholder='example@myspa.vn'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className={style.login_form_row}>
            <input
              type='password'
              className='form-control'
              placeholder='Mật khẩu'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className={style.login_form_btn}>
          <XButton loading={noti.load} type='submit' title='Đăng nhập' />
        </div>
      </form>
    </div>
  )
}

const Form = (props: any) => {
  const { response } = props
  const { resultLoad, firstLoad, noti, onCloseNoti } = useNoti()
  const { handlePostMedia } = usePostMedia()
  const navigate = useNavigate()
  const res = response?.data?.data?.context
  const trend_item = {
    media_url_item: res?.media_url,
    image_thumb: res?.image_thumb,
    content: res?.content,
    title: res?.title,
    organization_id: res?.organization_id,
    organization_name: res?.organization_name,
    organization_image: res?.organization_image,
    services: res?.services,
    trend_url: res?.trend_url,
    media_url: res?.media_url
  }
  const [media, setMedia] = useState({
    media_url: trend_item.media_url_item ? trend_item.media_url_item : '',
    image_thumb: trend_item.image_thumb !== '' ? trend_item.image_thumb : '',
    load_media: false,
  })
  const handleChange = async (file: any) => {
    setMedia({ ...media, load_media: true })
    try {
      const { original_url } = await postMedia(file)
      setMedia({ ...media, media_url: original_url, load_media: false })
    } catch (error) {
      setMedia({ ...media, load_media: false })
    }
  }
  const onChangeImage = (e: any) => {
    const eF: any = {
      target: {
        files: e
      }
    }
    handlePostMedia({
      e: eF,
      callBack(data) {
        formik.setFieldValue('image_thumb', data[0]?.original_url ?? [])
      },
    })
  }
  const formik = useFormik({
    initialValues: {
      title: trend_item.title ? trend_item.title : '',
      content: trend_item.content ? trend_item.content : '',
      organization_id: trend_item.organization_id ? trend_item.organization_id : '',
      organization_name: trend_item.organization_name ? trend_item.organization_name : '',
      organization_image: trend_item.organization_image ? trend_item.organization_image : '',
      services: trend_item.services ? trend_item.services : [],
      trend_url: trend_item.trend_url ?? '',
      media_url: trend_item.media_url ?? '',
      image_thumb: trend_item.image_thumb ?? ''
    },
    onSubmit: (values) => {
      // console.log(values)
      postTrend()
    },
  })
  console.log(trend_item)

  const PARAMS = {
    title: formik.values.title,
    content: formik.values.content,
    organization_id: formik.values.organization_id,
    cate_id: '6368691b49e2711b04bda0f4',
    media_url: media.media_url,
    image_thumb: formik.values.image_thumb,
    trend_url: formik.values.trend_url,
    services: formik.values.services?.map((i: any) => i.id),
  }
  const postTrend = async () => {
    firstLoad()
    try {
      const res = await request3rdApi.postTrend(PARAMS)
      if (res) resultLoad('Đăng thành công!')
      // navigate(-1)
    } catch (error) {
      console.log(error)
      resultLoad('Có lỗi xảy ra !')
    }
  }

  const handleRemoveSer = (item: IService) => {
    const removeSer = formik.values.services.filter((el: IService) => el?.id !== item?.id)
    formik.setFieldValue('services', removeSer)
  }
  console.log(formik.values.image_thumb)

  return (
    <div className={style.form_cnt}>
      <SnackAlert
        open={noti.openAlert} onClose={onCloseNoti} title={noti.message}
      />
      <div className={style.form_media}>
        <div className={style.form_media_left}>
          <label className='form-label'>
            <span className='required'>Video</span>
          </label>
          <FileUploader
            multiple={false}
            handleChange={handleChange}
            name='file'
            className={style.media_cnt}
            // types={FILE_IMG_TYPE}
            children={
              <div className={style.media_form_input}>
                {media.media_url !== '' ? (
                  <video controls={true} className={style.video_review}>
                    <source src={media.media_url} />
                  </video>
                ) : (
                  <div className={style.media_form_input_place}>
                    <img src={IMGS.imgPlaceHolder} alt='' />
                    <div>
                      {media.load_media
                        ? 'Đang tải video...'
                        : 'Kéo thả video vào đây hoặc Click để chọn video'}
                    </div>
                  </div>
                )}
              </div>
            }
          />
        </div>
        <div className={style.form_media_right}>
          <label className='form-label'>
            <span className='required'>Image thumbnail</span>
          </label>
          <div className={style.form_media_image}>
            <FileUploader
              multiple={true}
              handleChange={onChangeImage}
              name='file'
              className={style.media_cnt}
              children={
                <div className={style.media_form_input}>
                  {formik.values.image_thumb ? (
                    <img className={style.video_review} src={formik.values.image_thumb} alt="" />
                  ) : (
                    <div className={style.media_form_input_place}>
                      <img src={IMGS.imgPlaceHolder} alt='' />
                      <div>
                        Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className={style.form_content}>
        <div className={style.form_row_cnt}>
          <label className='form-label'>
            <span>or Video url</span>
          </label>
          <input
            value={formik.values.media_url}
            onChange={(e) => {
              formik.handleChange(e)
              setMedia({ ...media, media_url: e.target.value })
            }}
            className='form-control'
            name='media_url'
            type='text'
            placeholder='Video url'
          />
        </div>
        <div className={style.form_row_cnt}>
          <label className='form-label'>
            <span className='required'>Tiêu đề</span>
          </label>
          <input
            value={formik.values.title}
            onChange={formik.handleChange}
            className='form-control'
            name='title'
            type='text'
            placeholder='Tiêu đề'
          />
        </div>
        <div className={style.form_row_cnt}>
          <label className='form-label'>
            <span className='required'>Nội dung</span>
          </label>
          {/* <ReactQuill
            placeholder='Nội dung'
            value={formik.values.content}
            onChange={onChangeContent}
          /> */}
          <input
            value={formik.values.content}
            onChange={formik.handleChange}
            className='form-control'
            name='content'
            type='text'
            placeholder='Nội dung'
          />
        </div>
        <div className={style.form_row_cnt}>
          <label className='form-label'>
            <span className='required'>Link tiktok</span>
          </label>
          <input
            value={formik.values.trend_url}
            onChange={formik.handleChange}
            className='form-control'
            name='trend_url'
            type='text'
            placeholder='Link...'
          />
        </div>
        <div className={clst([style.form_row_cnt, style.form_row_org])}>
          <div className={style.row_org}>
            <label className='form-label'>
              <span className='required'>Gán doanh nghiệp</span>
            </label>
            <InputOrg formik={formik} />
          </div>
          <div className={style.row_service}>
            <label className='form-label'>
              <span className='required'>Gán dịch vụ</span>
            </label>
            <div className={style.row_service_list}>
              {formik.values.services?.map((item: IService, index: number) => (
                <div key={index} className={style.service_item}>
                  <div className={style.org_init_avatar}>
                    <img src={item?.image_url} alt='' />
                  </div>
                  <div className={style.org_init_name}>{item?.service_name}</div>
                  <div onClick={() => handleRemoveSer(item)} className={style.btnX}>
                    <i className='bi bi-x-circle-fill'></i>
                  </div>
                </div>
              ))}
              {formik.values.organization_id && <InputServiceOrg formik={formik} />}
            </div>
          </div>
        </div>
        <div className={style.wrap_btn}>
          <XButton type='submit' color='success' title={'Lưu'} />
        </div>
      </form>
    </div>
  )
}

const InputOrg = ({ formik }: { formik: any }) => {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSetDebounceKeyword = useCallback(
    debounce((text) => setKeyword(text), 600),
    []
  )
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetDebounceKeyword(e.target.value)
  }
  const params = {
    ...paramOrgs,
    limit: 10,
    'filter[keyword]': keyword,
  }
  const { resData } = useFetchInfinite(keyword !== '', API_3RD.ORGANIZATIONS, params)
  const onChooseOrg = (org: IOrganization) => {
    formik.setFieldValue('organization_id', org.id)
    formik.setFieldValue('organization_name', org.name)
    formik.setFieldValue('organization_image', org.image_url)
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className={style.org_input}>
        {formik.values.organization_id !== '' ? (
          <div className={style.org_init}>
            <div className={style.org_init_avatar}>
              <img src={formik.values.organization_image} alt='' />
            </div>
            <div className={style.org_init_name}>{formik.values.organization_name}</div>
          </div>
        ) : (
          <div className={style.org_input_place}>
            <i className='bi bi-plus-square fs-3x'></i>
          </div>
        )}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className={style.filter_org_cnt}>
          <input
            onChange={onChange}
            type='text'
            className='form-control form-control-solid'
            placeholder='Nhập tên doanh nghiệp'
          />
          <div className={style.org_list}>
            <ul className={style.list}>
              {resData.map((org: IOrganization) => (
                <li
                  onClick={() => {
                    onChooseOrg(org)
                    setOpen(false)
                  }}
                  key={org.id}
                  className={style.org_item_cnt}
                >
                  <Avatar src={org.image_url} />
                  <span className={style.org_item_cnt_name}>{org.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  )
}

const InputServiceOrg = (props: any) => {
  const { formik } = props
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('a')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSetDebounceKeyword = useCallback(
    debounce((text) => setKeyword(text), 600),
    []
  )
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetDebounceKeyword(e.target.value)
  }
  const org_id = formik.values?.organization_id
  const params = {
    ...paramService,
    limit: 10,
    'filter[keyword]': keyword,
  }
  let refInputSearch = useRef<any>()
  const services = formik.values.services ?? []
  const onChooseSer = (serItem: IService) => {
    const newServices = [...services, serItem]
    formik.setFieldValue('services', newServices)
    // refInputSearch.current.classList.add(`${style.actSelect}`)
  }
  const { resData } = useFetchInfinite(keyword !== '' && org_id, API_3RD.ORG_SERVICES(org_id), params)
  return (
    <>
      <div onClick={() => setOpen(true)} className={style.service_input}>
        <i className='bi bi-plus-square fs-3x'></i>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className={style.filter_org_cnt}>
          <input
            onChange={onChange}
            type='text'
            className='form-control form-control-solid'
            placeholder='Nhập tên dịch vụ'
          />
          <div className={style.org_list}>
            <ul className={style.list}>
              {resData.map((serItem: IService) => (
                <li
                  onClick={() => {
                    onChooseSer(serItem)
                    setOpen(false)
                  }}
                  key={serItem?.id}
                  className={style.org_item_cnt}
                  ref={refInputSearch}
                >
                  <Avatar src={serItem?.image_url} />
                  <span className={style.org_item_cnt_name}>{serItem.service_name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  )
}
