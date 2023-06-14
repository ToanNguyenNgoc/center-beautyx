import React, { useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IRoot } from '../../../../../redux/interface'
import { useSelector, useDispatch } from 'react-redux'
import { UserModel } from '../../../../../interface/account_models'
import { putUser, updateAsyncUser } from '../../../../../redux/account/accountSlice';
import { PAYLOAD_STATUS } from '../../../../../redux/status'
import mediaApi from '../../../../../api/mediaApi';
const profileDetailsSchema = Yup.object().shape({
  fullname: Yup.string().required('First name is required'),
  telephone: Yup.string().required('Contact phone is required')
})

const ProfileDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { USER } = useSelector((state: IRoot) => state.ACCOUNT)
  const initialValues = USER
  const [loading, setLoading] = useState(false)
  const onChangeAvatar = (e:any) => {
    const media = e.target.files[0];
    handlePostMedia(media);
  }
  const handlePostMedia = async (media: any) => {
    let formData = new FormData();
    formData.append("file", media);
    try {
        const res = await mediaApi.postMedia(formData);
        // console.log(res.data.context.original_url);
        dispatch(putUser({...USER,media:res.data.context.original_url}));
        const param = {
          media_id: res.data.context.model_id
        }
        dispatch(updateAsyncUser(param));
    } catch (error) {
        console.log(error);
    }
  }
  const formik = useFormik<UserModel>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const param = {
        fullname: values.fullname
      }
      const res = await dispatch(updateAsyncUser(param));
      if (res.meta.requestStatus === PAYLOAD_STATUS.SUCCESS) {
        setLoading(false)
      }
      // setTimeout(() => {
      //   values.communications.email = data.communications.email
      //   values.communications.phone = data.communications.phone
      //   values.allowMarketing = data.allowMarketing
      //   const updatedData = Object.assign(data, values)
      //   setData(updatedData)
      //   setLoading(false)
      // }, 1000)
    },
  })
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                {/*begin::Image input*/}
                <div className="image-input image-input-outline" data-kt-image-input="true" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}>
                  {/*begin::Preview existing avatar*/}
                  <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: `url(${USER?.avatar})` }}></div>
                  {/*end::Preview existing avatar*/}
                  {/*begin::Label*/}
                  <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" data-kt-initialized="1">
                    <i className="bi bi-pencil-fill fs-7"></i>
                    {/*begin::Inputs*/}
                    <input onChange={onChangeAvatar} type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                    {/*end::Inputs*/}
                  </label>
                  {/*end::Label*/}
                  {/*begin::Cancel*/}
                  {/* <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" data-kt-initialized="1">
                    <i className="bi bi-x fs-2"></i>
                  </span> */}
                  {/*end::Cancel*/}
                  {/*begin::Remove*/}
                  {/* <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" data-kt-initialized="1">
                    <i className="bi bi-x fs-2"></i>
                  </span> */}
                  {/*end::Remove*/}
                </div>
                {/*end::Image input*/}
                {/*begin::Hint*/}
                <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                {/*end::Hint*/}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('fullname')}
                    />
                    {formik.touched.fullname && formik.errors.fullname && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.fullname}</div>
                      </div>
                    )}
                  </div>

                  {/* <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                      {...formik.getFieldProps('lName')}
                    />
                    {formik.touched.lName && formik.errors.lName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lName}</div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className=''>Contact Phone</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Phone number'
                  disabled={true}
                  {...formik.getFieldProps('telephone')}
                />
                {formik.touched.telephone && formik.errors.telephone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.telephone}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className=''>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  disabled={true}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.telephone && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button className='btn btn-primary' disabled={loading} type='submit' >
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProfileDetails }
