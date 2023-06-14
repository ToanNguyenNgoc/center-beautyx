import React, { useState } from "react"
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { loginAsync } from '../../../redux/loginSlice';
import { fetchAsyncUser } from '../../../redux/account/accountSlice';
import clsx from "clsx"
import { useAuth } from '../core/Auth'
import { verifyUser } from "middleware";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        // .matches(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(myspa|clinic)\.vn$/,
        // 'Please using mail with @myspa to sign in')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    // email: 'nguyenthihoai@gmail.com',
    // password: 'Admin123456',
    // email: 'toan@myspa.vn',
    // password: '06011998',
    email: '',
    password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
export function Login() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { saveAuth, setCurrentUser } = useAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            try {
                const res = await dispatch(loginAsync({ email: values.email, password: values.password }))
                if (res.meta.requestStatus === "fulfilled" && res.payload) {
                    // const user_check = await verifyUser(res.payload)
                    // if (user_check) {
                    //     saveAuth(res.payload)
                    //     setCurrentUser(user_check)
                    //     dispatch(fetchAsyncUser(user_check.ROLE));
                    // } else {
                    //     setStatus('The account is unauthorized !')
                    //     setSubmitting(false)
                    //     setLoading(false)
                    // }
                    saveAuth(res.payload)
                    setCurrentUser(res.payload)
                    dispatch(fetchAsyncUser(res.payload));
                }
                else {
                    console.error(res)
                    saveAuth(undefined)
                    setStatus('The login detail is incorrect')
                    setSubmitting(false)
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
                saveAuth(undefined)
                setStatus('The login detail is incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    return (
        <>
            <form
                className='form w-100'
                onSubmit={formik.handleSubmit}
                noValidate
                id='kt_login_signin_form'
            >
                {/* begin::Heading */}
                <div className='text-center mb-10'>
                    <h1 className='text-dark mb-3'>Sign In to BeautyX Console</h1>
                </div>
                {/* begin::Heading */}

                {formik.status ? (
                    <div className='mb-lg-15 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                    </div>
                ) : (
                    <div className='mb-10 bg-light-info p-8 rounded'>
                        <div className='text-info'>
                            {/* Use account <strong>{initialValues.email}</strong> and password <strong>{initialValues.password}</strong> to
                        continue. */}
                        </div>
                    </div>
                )}

                {/* begin::Form group */}
                <div className='fv-row mb-10'>
                    <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                    <input
                        placeholder='example@myspa.vn'
                        {...formik.getFieldProps('email')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
                            { 'is-invalid': formik.touched.email && formik.errors.email },
                            {
                                'is-valid': formik.touched.email && !formik.errors.email,
                            }
                        )}
                        type='email'
                        name='email'
                        autoComplete='off'
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className='fv-plugins-message-container'>
                            <span role='alert'>{formik.errors.email}</span>
                        </div>
                    )}
                </div>
                {/* end::Form group */}

                {/* begin::Form group */}
                <div className='fv-row mb-10'>
                    <div className='d-flex justify-content-between mt-n5'>
                        <div className='d-flex flex-stack mb-2'>
                            {/* begin::Label */}
                            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                            {/* end::Label */}
                            {/* begin::Link */}
                            <Link
                                to='/auth/forgot-password'
                                className='link-primary fs-6 fw-bolder'
                                style={{ marginLeft: '5px' }}
                            >
                                Forgot Password ?
                            </Link>
                            {/* end::Link */}
                        </div>
                    </div>
                    <input
                        type='password'
                        autoComplete='off'
                        {...formik.getFieldProps('password')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                                'is-invalid': formik.touched.password && formik.errors.password,
                            },
                            {
                                'is-valid': formik.touched.password && !formik.errors.password,
                            }
                        )}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.password}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* end::Form group */}

                {/* begin::Action */}
                <div className='text-center'>
                    <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {!loading && <span className='indicator-label'>Continue</span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Please wait...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
                {/* end::Action */}
            </form>
        </>
    )
}