/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {UserModel} from '../../../../interface/account_models';
import { IRoot } from '../../../../redux/interface';
import { useSelector } from 'react-redux';

export function Account() {

  //const [hasError, setHasError] = useState(false);
  const {USER,status} = useSelector((state : IRoot) => state.ACCOUNT)
  // const [data, setData] = useState<UserModel>(defaultAccount)
  const updateData = (fieldsToUpdate: Partial<UserModel>) => {
    // const updatedData = {...data, ...fieldsToUpdate}

    // setData(updatedData)
  }

  return (
    <div className='card'>
      {/* begin::Form */}
      <form className='form d-flex flex-center'>
        <div className='card-body mw-800px py-20'>
          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Username</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='text'
                  value={USER?.fullname}
                  onChange={(e) => updateData({fullname: e.target.value})}
                />
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Email Address</label>
            <div className='col-lg-9'>
              <div className='input-group input-group-lg input-group-solid'>
                <span className='input-group-text pe-0'>
                  <i className='la la-at fs-4'></i>
                </span>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  value={USER?.email}
                  onChange={(e) => updateData({email: e.target.value})}
                />
              </div>
              <div className='form-text'>
                Email will not be publicly displayed.{' '}
                <a href='#' className='fw-bold'>
                  Learn more
                </a>
                .
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Login verification</label>
            <div className='col-lg-9'>
              <button type='button' className='btn btn-light-primary fw-bold btn-sm'>
                Setup login verification
              </button>
              <div className='form-text'>
                After you log in, you will be asked for additional information to confirm your
                identity and protect your account from being compromised.
                <a href='#' className='fw-bold'>
                  Learn more
                </a>
                .
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row'>
            <label className='col-lg-3 col-form-label'></label>
            <div className='col-lg-9'>
              <button type='reset' className='btn btn-primary fw-bolder px-6 py-3 me-3'>
                Save Changes
              </button>
              <button
                type='reset'
                className='btn btn-color-gray-600 btn-active-light-primary fw-bolder px-6 py-3'
              >
                Cancel
              </button>
            </div>
          </div>
          {/* end::Form row */}
        </div>
      </form>
      {/* end::Form */}
    </div>
  )
}
