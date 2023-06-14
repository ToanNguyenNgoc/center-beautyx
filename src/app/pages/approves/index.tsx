import React, { useState } from 'react';
import TitlePage from 'components/TitlePage';
import { useGetParamUrl, useSwr } from 'app/hooks';
import { paramApproves } from 'app/query-params';
import { API_ROUTE } from 'app/api/api-route';
import { KTSVG } from '_metronic/helpers';
import { IApprove } from 'app/interface';
// import { useVerifyRoute } from 'app/hooks';
import { ApproveStatusElement, ApproveTypeElement } from 'app/util'
import dayjs from 'dayjs'
import ApproveDetail from './module/approve-detail';
import { Avatar, XPagination } from 'components';
import { useLocation, useNavigate } from 'react-router-dom';

function Approve() {
    const location = useLocation()
    const navigate = useNavigate()
    const query: any = useGetParamUrl()
    const { responseArray, totalItem, totalPage } = useSwr(true, API_ROUTE.APPROVES, {
        ...paramApproves,
        "page": query?.page ?? 1
    })
    const onChangePage = (page: number) => {
        navigate({
            pathname: location.pathname,
            search: `page=${page}`
        })
    }
    return (
        <>
            <TitlePage title='Kiểm duyệt' />
            <div className={`card mb-5 mb-xl-8`}>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Danh sách kiểm duyệt</span>
                        <span className='text-muted mt-1 fw-semobold fs-7'>
                            {totalItem} kiểm duyệt
                        </span>
                    </h3>
                    <div className='card-toolbar'>
                        <button
                            type='button'
                            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            data-kt-menu-flip='top-end'
                        >
                            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                        </button>
                    </div>
                </div>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        <table className='table align-middle gs-0 gy-4'>
                            <thead>
                                <tr className='fw-bold text-muted bg-light'>
                                    <th className='ps-4 min-w-250px rounded-start'>Doanh nghiệp</th>
                                    <th className='min-w-110px'>Duyệt cho</th>
                                    <th className='min-w-110px'> Trạng thái </th>
                                    <th className='min-w-150px'>Ghi chú</th>
                                    <th className='min-w-140px'>Ngày tạo</th>
                                    <th className='min-w-140px'>Cập nhật lúc</th>
                                    <th className='min-w-100px text-end rounded-end'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    responseArray?.map((item: IApprove, index: number) => (
                                        <ApproveItem key={index} item={item} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <XPagination
                totalPage={totalPage}
                onChangePage={onChangePage}
                defaultPage={query?.page ?? 1}
            />
        </>
    );
}

export default Approve;

const ApproveItem = ({ item }: { item: IApprove }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ApproveDetail
                open={open} setOpen={setOpen}
                approve={item}
            />
            <tr>
                {
                    item.organization &&
                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='symbol symbol-50px me-5'>
                                <Avatar
                                    src={item.organization.image_url}
                                />
                            </div>
                            <div className='d-flex justify-content-start flex-column'>
                                <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                    {item.organization.name}
                                </span>
                                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                    {item.organization.address}
                                </span>
                            </div>
                        </div>
                    </td>
                }
                <td>
                    <ApproveTypeElement type={item.type} />
                </td>
                <td>
                    <ApproveStatusElement status={item.status} />
                </td>
                <td>
                    {
                        item.logs.length > 0 &&
                        <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                            {item.logs[0]?.note}
                        </span>
                    }
                </td>
                <td>
                    <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                        {dayjs(item.created_at).format("HH:mm - DD/MM/YYYY")}
                    </span>
                </td>
                <td>
                    <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                        {dayjs(item.updated_at).format("HH:mm - DD/MM/YYYY")}
                    </span>
                </td>
                <td className='text-end'>
                    <button
                        onClick={() => setOpen(true)}
                        // to={{ pathname: "/" }}
                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                    >
                        <i className="bi bi-pencil-fill fs-6"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}