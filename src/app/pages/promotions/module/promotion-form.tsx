import TitlePage from "components/TitlePage";
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { FILE_IMG_TYPE } from "app/util";
import { IMGS } from "_metronic/assets/imgs/imgs";
import { AppSnack, SelectionDiscounts, SelectionProductable, XDateRangePicker, XSwitch } from "components";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { useMessage, usePostMedia } from "app/hooks";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { QR_KEY } from "common";
import { promotionApi } from "app/api";
import { ReqPromotionBody } from "@types";
import { IDiscountPar, Productable } from "app/interface";
import { AxiosError } from "axios";
import * as Yup from "yup"
import '../style.scss'
import { identity, pickBy } from "lodash";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function PromotionForm() {
  const params: any = useParams()
  const { handlePostMedia, isLoading } = usePostMedia()
  const { handlePostMedia: handlePostThumbnail, isLoading: isLoadingThumbnail } = usePostMedia()
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const { mutateAsync, isLoading: isLoadingMutate } = useMutation({
    mutationFn: (body: ReqPromotionBody) => params.id ? promotionApi.put(params.id, body) : promotionApi.post(body),
    onSuccess: () => resultLoad({
      message: params.id ? 'Cập nhật promotion thành công' : 'Tạo mới promotion thành công',
      color: 'success'
    }),
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
      name: '',
      content: '',
      media_url: '',
      main_media_id: undefined,
      thumbnail_url: '',
      thumbnail_media_id: undefined,
      is_popup: false,
      valid_from: moment().format('YYYY-MM-DD HH:mm:ss'),
      valid_util: moment().format('YYYY-MM-DD HH:mm:ss'),
      discounts: [],
      productables: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nhập tên của promotion'),
      media_url: Yup.string().required('Upload hình của promotion')
    }),
    onSubmit: async (values) => {
      const body = pickBy({
        ...values,
        productables: values.productables.map((i: Productable) => i.id),
        discounts: values.discounts.map((i: IDiscountPar) => i.id),
      }, identity)
      const res = await mutateAsync({ ...body, is_popup: values.is_popup ? 1 : 0, })
      if (res) {
        formik.setFieldValue('main_media_id', undefined)
        formik.setFieldValue('thumbnail_media_id', undefined)
      }
    }
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.PROMOTION, params.id],
    queryFn: () => promotionApi.getDetail(params.id),
    enabled: params.id ? true : false,
    onSuccess: (data) => {
      formik.setFieldValue('is_popup', data.context.is_popup === 1 ? true : false)
      formik.setFieldValue('name', data.context.name)
      formik.setFieldValue('content', data.context.content)
      formik.setFieldValue('media_url', data.context.media_url)
      formik.setFieldValue('thumbnail_url', data.context.thumbnail_url)
      formik.setFieldValue('valid_from', data.context.valid_from)
      formik.setFieldValue('valid_util', data.context.valid_util)
      formik.setFieldValue('productables', data.context.productables)
      formik.setFieldValue('discounts', data.context.discounts)
    }
  })
  const handleChangeMedia = (file: File) => {
    formik.setFieldValue('media_url', '')
    const eF: any = {
      target: {
        files: [file]
      }
    }
    handlePostMedia({
      e: eF,
      callBack(data) {
        formik.setFieldValue('media_url', data[0]?.original_url ?? '')
        formik.setFieldValue('main_media_id', data[0]?.model_id)
      },
      version: 'myspa'
    })
  }
  const handleChangeThumbnail = (file: File) => {
    formik.setFieldValue('', '')
    const eF: any = {
      target: {
        files: [file]
      }
    }
    handlePostThumbnail({
      e: eF,
      callBack(data) {
        formik.setFieldValue('thumbnail_url', data[0]?.original_url ?? '')
        formik.setFieldValue('thumbnail_media_id', data[0]?.model_id)
      },
      version: 'myspa'
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
      <TitlePage title={params.id ? 'Cập nhật promotion' : 'Tạo mới promotion'} />
      <div className='post d-flex flex-column-fluid' id="kt_post">
        <div className="promotion-form">
          <form autoComplete="off" onSubmit={formik.handleSubmit} className="form">
            <div className="flex-row-sp align-items-center input-wrap">
              <div className="wrap-item">
                <XSwitch
                  value={formik.values.is_popup}
                  onChange={(e) => formik.setFieldValue('is_popup', e.target.checked)}
                  label='Is Popup'
                />
              </div>
            </div>
            <div className="column">
              <div className="required form-label">Hình ảnh</div>
              <div className="drag-banner">
                <FileUploader
                  className="form-input-file"
                  style={{ width: '100%' }}
                  multiple={false}
                  handleChange={handleChangeMedia}
                  name="file"
                  types={FILE_IMG_TYPE}
                  children={
                    <div className='banner-form__img'>
                      <img src={formik.values.media_url !== "" ? formik.values.media_url : IMGS.imgPlaceHolder} alt="" className="image-value" />
                      {
                        isLoading &&
                        <div className="placeholder">
                          <span>Đang tải</span>
                          <CircularProgress />
                        </div>
                      }
                      {
                        formik.values.media_url === "" &&
                        <div className="placeholder">
                          <span>Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh</span>
                        </div>
                      }
                    </div>
                  }
                />
              </div>
              <input
                value={formik.values.media_url || ''}
                // onChange={formik.handleChange}
                readOnly
                type="text"
                name="image_url"
                className="form-control form-control-solid mt-4 mb-2"
                placeholder="Hoặc link hình ảnh...."
              />
              {
                formik.errors.media_url && formik.touched.media_url &&
                <span className="text-danger">{formik.errors.media_url}</span>
              }
            </div>
            <div className="required form-label">Thumbnail</div>
            <div className="drag-banner">
              <FileUploader
                className="form-input-file"
                style={{ width: '100%' }}
                multiple={false}
                handleChange={handleChangeThumbnail}
                name="thumbnail"
                types={FILE_IMG_TYPE}
                children={
                  <div className='banner-form__img'>
                    <img src={formik.values.thumbnail_url !== "" ? formik.values.thumbnail_url : IMGS.imgPlaceHolder} alt="" className="image-value" />
                    {
                      formik.values.thumbnail_url === "" &&
                      <div className="placeholder">
                        <span>
                          {isLoadingThumbnail ? 'Đang tải' : 'Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh'}
                        </span>
                        {isLoadingThumbnail && <LinearProgress />}
                      </div>
                    }
                  </div>
                }
              />
            </div>
            <input
              value={formik.values.thumbnail_url || ''}
              onChange={formik.handleChange}
              readOnly
              type="text"
              name="thumbnail_url"
              className="form-control form-control-solid mt-4 mb-2"
              placeholder="Hoặc link hình ảnh...."
            />
            <div className="column">
              <div className="required form-label">Tên promotion</div>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                name="name"
                className="form-control form-control-solid mt-4 mb-2"
                placeholder="Tên promotion...."
              />
              {
                formik.errors.name && formik.touched.name &&
                <span className='text-danger'>
                  {formik.errors.name}
                </span>
              }
            </div>
            <div className="column">
              <div className="form-label">Mô tả</div>
              <ReactQuill theme="snow" value={formik.values.content} onChange={(e) => formik.setFieldValue('content', e)} />
            </div>
            <div className="column">
              <XDateRangePicker
                required
                minDate={new Date()}
                startDate={new Date(formik.values.valid_from)}
                endDate={new Date(formik.values.valid_util)}
                onChange={(e) => {
                  formik.setFieldValue('valid_from', moment(e.selection.startDate).format('YYYY-MM-DD HH:mm:ss'))
                  formik.setFieldValue('valid_util', moment(e.selection.endDate).format('YYYY-MM-DD HH:mm:ss'))
                }}
              />
            </div>
            <div className="column mt-6">
              <SelectionProductable
                productable={formik.values.productables}
                onChangeProductable={(e) => formik.setFieldValue('productables', e)}
              />
            </div>
            <div className="column mt-6">
              <SelectionDiscounts
                filterAll={false}
                discounts={formik.values.discounts}
                onChangeDiscounts={(e) => formik.setFieldValue('discounts', e)}
              />
            </div>
            <div className="d-flex justify-content-end mt-8">
              {
                params.id &&
                <LoadingButton style={{ marginRight: '8px' }} loading={isFetching}
                  type="submit" size="large" color="inherit" variant="contained" onClick={() => refetch()}
                >
                  Khôi phục
                </LoadingButton>
              }
              <LoadingButton loading={isLoadingMutate} type="submit" size="large" color="success" variant="contained" >
                {params.id ? 'Cập nhật Promo' : 'Tạo mới Promo'}
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PromotionForm;