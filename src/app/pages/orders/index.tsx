/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss'
import { Link } from 'react-router-dom';
import { IRoot } from 'app/redux/interface';
import { STATUS } from 'app/redux/status';
import { fetchAsyncOrders } from 'app/redux/orders/ordersSlice';
import TitlePage from 'components/TitlePage';
import { formatDate, formatPrice, formatTime, OrderStatusElement } from 'app/util';
import { KTSVG } from '_metronic/helpers';
import FlatFormOrder from 'components/PlatForm';
import {IOrderV2} from 'app/interface'
import {Avatar} from 'components'

function Orders() {
    const { orders, status } = useSelector((state: IRoot) => state.ORDERS.ORDERS)
    const dispatch = useDispatch();
    const callOrders = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrders({
                page: 1,
                sort: "-created_at"
            }))
        }
    }
    useEffect(() => {
        callOrders()
    }, [])

    return (
        <>
            <TitlePage
                title='Đơn hàng'
                element={<div className='search-input-wrap'>
                    <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Tên khách hàng/ Mã đơn hàng..."
                    />
                </div>}
            />
            <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Đơn hàng gần đây</span>
                        <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng : 1000 đơn</span>
                    </h3>
                    <div
                        className='card-toolbar'
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        data-bs-trigger='hover'
                        title='Click to add a user'
                    >
                        <button className="btn btn-sm btn-primary">
                        <i className="fa-solid fa-filter"></i>
                            Bộ lọc
                        </button>
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                    {/* begin::Table container */}
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='min-w-150px'>Mã/Ngày tạo</th>
                                    <th className='min-w-140px'>Tên khách hàng</th>
                                    <th className='min-w-140px'>Doanh nghiệp</th>
                                    <th className='min-w-120px'>Trạng thái</th>
                                    <th className='min-w-120px'>Nền tảng</th>
                                    {/* <th className='min-w-120px'>Lịch sử</th> */}
                                    <th className='min-w-120px'>Tổng thanh toán</th>
                                    <th className='min-w-100px text-end'>Actions</th>
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>
                                {
                                    orders.map((item: IOrderV2, index: number) => (
                                        <tr key={index} >
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        {
                                                            item.origin_id &&
                                                            <span className='fw-bold fs-6 text-success'>
                                                                Mã:#{item.origin_id}
                                                            </span>
                                                        }
                                                        <span className='text-dark fs-6'>
                                                            Trans:#{item.payment_gateway?.transaction_uuid}
                                                        </span>
                                                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                            {formatDate(item.created_at)} - {formatTime(item.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    item.user &&
                                                    <div className='d-flex align-items-center'>
                                                    <div className='symbol symbol-45px me-5'>
                                                        <Avatar
                                                            size={45}
                                                            src={item.user.avatar}
                                                        />
                                                    </div>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        <span className='text-dark fs-6'>
                                                            {item.user.fullname}
                                                        </span>
                                                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                            {item.user.telephone}
                                                        </span>
                                                    </div>
                                                </div>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    item.organization &&
                                                    <div className="flex-row-al">
                                                    <div className='symbol symbol-45px me-5'>
                                                       <Avatar size={45} src={item.organization.image_url} />
                                                    </div>
                                                    <span className='text-dark fw-bold d-block fs-6'>
                                                        {item.organization.name}
                                                    </span>
                                                </div>
                                                }
                                            </td>
                                            <td>
                                                <OrderStatusElement
                                                    status={item.status}
                                                />
                                            </td>
                                            <td className='text-end'>
                                                {
                                                    item.platform &&
                                                    <FlatFormOrder
                                                        platForm={item.platform}
                                                    />
                                                }
                                            </td>
                                            <td>
                                                <span className='fw-bold d-block fs-6'>
                                                    {formatPrice(item.payment_gateway?.amount)}đ
                                                </span>
                                                <span style={{ textDecoration: "line-through" }} className='text-muted fw-semobold text-muted d-block fs-7'>
                                                    {item.amount > item.payment_gateway?.amount && `${formatPrice(item.amount)}đ`}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                    <Link
                                                        to='#'
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <KTSVG
                                                            path='/media/icons/duotune/general/gen019.svg'
                                                            className='svg-icon-3'
                                                        />
                                                    </Link>
                                                    <Link
                                                        to='#'
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                                                    </Link>
                                                    <Link
                                                        to='#'
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                                    >
                                                        <KTSVG
                                                            path='/media/icons/duotune/general/gen027.svg'
                                                            className='svg-icon-3'
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* begin::Body */}
            </div>
        </>
    );
}

export default Orders;