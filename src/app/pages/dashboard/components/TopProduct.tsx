/* eslint-disable jsx-a11y/anchor-is-valid */
import { AsyncThunk } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { IPRODUCT_GET_ALL } from '../../../api/product_models';
import { IHIT_PRODUCT } from '../../../interface/product_models';
import { IRoot } from '../../../redux/interface';
import { fetchAsyncProducts } from '../../../redux/product/productSlice';
import { STATUS } from '../../../redux/status';

type Props = {
    className: string
}

export const TopProductWidget: React.FC<Props> = ({ className }) => {
    const { PRODUCTS } = useSelector((state: IRoot) => state.TOP_PRODUCT)
    const dispatch = useDispatch();
    const handleInitData = async () => {
        const param: IPRODUCT_GET_ALL = {
            page: 1,
            limit: 6,
            sort: 'bought_count',
            is_momo_ecommerce_enable: true
        }
        dispatch(fetchAsyncProducts(param));
    }
    useEffect(() => {
        if (PRODUCTS.status_pr !== STATUS.SUCCESS && PRODUCTS.products.length == 0) {
            handleInitData()
        }
    }, [])
    return (
        <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Latest Products</span>
                    <span className='text-muted mt-1 fw-semobold fs-7'>More than 400 new products</span>
                </h3>
                <div className='card-toolbar'>
                    <ul className='nav'>
                        <li className='nav-item'>
                            <a
                                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1'
                                data-bs-toggle='tab'
                                href='#kt_table_widget_5_tab_1'
                            >
                                Month
              </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1'
                                data-bs-toggle='tab'
                                href='#kt_table_widget_5_tab_2'
                            >
                                Week
              </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4'
                                data-bs-toggle='tab'
                                href='#kt_table_widget_5_tab_3'
                            >
                                Day
              </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
                <div className='tab-content'>
                    {/* begin::Tap pane */}
                    <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
                        {/* begin::Table container */}
                        <div className='table-responsive'>
                            {/* begin::Table */}
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                {/* begin::Table head */}
                                <thead>
                                    <tr className='border-0 fw-bold text-muted'>
                                        <th className='p-0 w-50px'></th>
                                        <th className='p-0 min-w-150px'></th>
                                        <th className='p-0 min-w-140px text-end'>bought count</th>
                                        <th className='p-0 min-w-110px'></th>
                                        <th className='p-0 min-w-50px'></th>
                                    </tr>
                                </thead>
                                {/* end::Table head */}
                                {/* begin::Table body */}
                                <tbody>
                                    {
                                        PRODUCTS.products.map((item: IHIT_PRODUCT, index: number) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='symbol symbol-45px me-2'>
                                                        <span className='symbol-label'>
                                                            <img
                                                                src={item.org_image}
                                                                className='h-100 align-self-center'
                                                                alt=''
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                        {item.product_name}
                                                    </a>
                                                    {/* <span className='text-muted fw-semobold d-block'>{item.bought_count}</span> */}
                                                </td>
                                                <td className='text-end text-muted fw-semobold'>{item.bought_count}</td>
                                                <td className='text-end'>
                                                    <span className='badge badge-light-success'>Approved</span>
                                                </td>
                                                <td className='text-end'>
                                                    <a
                                                        href='#'
                                                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                                    >
                                                        <KTSVG
                                                            path='/media/icons/duotune/arrows/arr064.svg'
                                                            className='svg-icon-2'
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {/* end::Table body */}
                            </table>
                        </div>
                        {/* end::Table */}
                    </div>
                    {/* end::Tap pane */}
                    {/* begin::Tap pane */}
                    <div className='tab-pane fade' id='kt_table_widget_5_tab_2'>
                        {/* begin::Table container */}
                        <div className='table-responsive'>
                            {/* begin::Table */}
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                {/* begin::Table head */}
                                <thead>
                                    <tr className='border-0'>
                                        <th className='p-0 w-50px'></th>
                                        <th className='p-0 min-w-150px'></th>
                                        <th className='p-0 min-w-140px'></th>
                                        <th className='p-0 min-w-110px'></th>
                                        <th className='p-0 min-w-50px'></th>
                                    </tr>
                                </thead>
                                {/* end::Table head */}
                                {/* begin::Table body */}
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Brad Simmons
                      </a>
                                            <span className='text-muted fw-semobold d-block'>Movie Creator</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>React, HTML</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-success'>Approved</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/telegram.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Popular Authors
                      </a>
                                            <span className='text-muted fw-semobold d-block'>Most Successful</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>Python, MySQL</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-warning'>In Progress</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/bebo.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Active Customers
                      </a>
                                            <span className='text-muted fw-semobold d-block'>Movie Creator</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>AngularJS, C#</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-danger'>Rejected</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                {/* end::Table body */}
                            </table>
                        </div>
                        {/* end::Table */}
                    </div>
                    {/* end::Tap pane */}
                    {/* begin::Tap pane */}
                    <div className='tab-pane fade' id='kt_table_widget_5_tab_3'>
                        {/* begin::Table container */}
                        <div className='table-responsive'>
                            {/* begin::Table */}
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                {/* begin::Table head */}
                                <thead>
                                    <tr className='border-0'>
                                        <th className='p-0 w-50px'></th>
                                        <th className='p-0 min-w-150px'></th>
                                        <th className='p-0 min-w-140px'></th>
                                        <th className='p-0 min-w-110px'></th>
                                        <th className='p-0 min-w-50px'></th>
                                    </tr>
                                </thead>
                                {/* end::Table head */}
                                {/* begin::Table body */}
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/kickstarter.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Bestseller Theme
                                            </a>
                                            <span className='text-muted fw-semobold d-block'>Best Customers</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>ReactJS, Ruby</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-warning'>In Progress</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/bebo.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Active Customers
                                                </a>
                                            <span className='text-muted fw-semobold d-block'>Movie Creator</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>AngularJS, C#</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-danger'>Rejected</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/vimeo.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                New Users
                                            </a>
                                            <span className='text-muted fw-semobold d-block'>Awesome Users</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>Laravel,Metronic</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-primary'>Success</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                    <img
                                                        src={toAbsoluteUrl('/media/svg/brand-logos/telegram.svg')}
                                                        className='h-50 align-self-center'
                                                        alt=''
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                Popular Authors
                                            </a>
                                            <span className='text-muted fw-semobold d-block'>Most Successful</span>
                                        </td>
                                        <td className='text-end text-muted fw-semobold'>Python, MySQL</td>
                                        <td className='text-end'>
                                            <span className='badge badge-light-warning'>In Progress</span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href='#'
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                    className='svg-icon-2'
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                {/* end::Table body */}
                            </table>
                        </div>
                        {/* end::Table */}
                    </div>
                    {/* end::Tap pane */}
                </div>
            </div>
            {/* end::Body */}
        </div>
    )
}
