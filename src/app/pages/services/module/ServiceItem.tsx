import React from 'react'
import {IServiceSingle} from 'app/interface/service_single'
import {formatPrice, formatSalePriceService, onErrorImg, StatusElement} from 'app/util'
import {Link, useNavigate} from 'react-router-dom'

export default function ServiceItem({item}: {item: IServiceSingle}) {
  const navigate = useNavigate()
  const handleDetailSer = (item: IServiceSingle) => {
    navigate(`/pages/service-form/view_service/${item?.service_id}`)
  }
  const handleEditSer = (item: IServiceSingle) => {
    navigate(`/pages/service-form/${item?.service_id}`)
  }
  return (
    <tr className='text-gray-400 fw-bold fs-7 gs-0'>
      <td
        className=' sorting'
        tabIndex={0}
        aria-controls='kt_ecommerce_products_table'
        rowSpan={1}
        colSpan={1}
      >
        <div className='d-flex align-items-center'>
          <Link to={'#'} className='symbol symbol-50px'>
            <img
              onError={(e) => onErrorImg(e)}
              className='symbol-label'
              src={`${item?.org_image}`}
              alt=''
            />
          </Link>
          <div className='ms-5'>
            <a
              href='/metronic8/demo1/../demo1/apps/ecommerce/catalog/edit-product.html'
              className='text-dark fs-5 fw-bold text-hover-success'
            >
              {item?.service_name}
            </a>
          </div>
        </div>
      </td>
      <th className='sorting text-gray-600'>{formatPrice(item?.price)}</th>
      <th className='sorting text-gray-800'>
        {formatPrice(formatSalePriceService(item?.special_price, item?.special_price_momo))}
      </th>
      <th className='sorting text-gray-600'>{item?.org_name}</th>
      <th className=' sorting'>
        <StatusElement status={item?.is_momo_ecommerce_enable} />
      </th>
      <th className='text-end'>
        <button
          onClick={() => handleDetailSer(item)}
          style={{marginRight: '8px'}}
          className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
        >
          <i className='bi bi-eye-fill fs-6'></i>
        </button>
        <button
          onClick={() => handleEditSer(item)}
          className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
        >
          <i className='bi bi-pencil-fill fs-6'></i>
        </button>
      </th>
    </tr>
  )
}
