import React from 'react';
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers';
import { paramContract } from 'app/query-params'
import { IContract } from 'app/interface';
import { useSwrInfinite } from 'app/hooks';
import { API_ROUTE } from 'app/api/api-route';
import { Avatar } from 'components';
import { ApproveStatusElement, ApproveTypeElement } from 'app/util/fileType'
import { Link } from 'react-router-dom';
import directRoute from 'app/routing/DirectRoute';
import dayjs from 'dayjs';

interface TopContractProps {
    className: string
}

export function TopContract(props: TopContractProps) {
    const params = {
        ...paramContract,
        limit: 15,
    }
    const contracts: IContract[] = useSwrInfinite(true, API_ROUTE.CONTRACTS, params).resData



    return (
        <div className={`card ${props.className}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Hợp đồng cần được duyệt</span>
                    {/* <span className='text-muted mt-1 fw-semobold fs-7'>More than 400 new products</span> */}
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
                    </ul>
                </div>
            </div>
            <div className='card-body py-3'>
                <div className='tab-content'>
                    <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
                        <div className='table-responsive'>
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                <thead>
                                    <tr className='border-0 fw-bold text-muted'>
                                        <th className='p-0 min-w-150px'>Doanh nghiệp</th>
                                        <th className='p-0 min-w-80px text-center'>Gói</th>
                                        <th className='p-0 min-w-140px text-center'>Type</th>
                                        <th className='p-0 min-w-110px text-center'>Trạng thái</th>
                                        <th className='p-0 min-w-110px text-center'>Ngày tạo</th>
                                        <th className='p-0 min-w-50px'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contracts
                                            ?.filter((item: IContract) =>
                                                item.approve?.status === "PENDING" || item.approve?.status === "REVIEW"
                                            )
                                            ?.map(item => (
                                                <tr key={item.id} >
                                                    {
                                                        item.organization &&
                                                        <td>
                                                            <div className='d-flex align-items-center symbol symbol-45px me-2'>
                                                                <Avatar
                                                                    src={item.organization.image_url}
                                                                />
                                                                <div className='ms-3'>
                                                                    <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                                        {item.organization.name}
                                                                    </span>
                                                                    <span className='text-muted fw-semobold d-block'>
                                                                        {item.organization.address}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    }
                                                    <td className='text-center'>
                                                        <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                            {item.package_name}
                                                        </span>
                                                    </td>
                                                    <td className='text-end text-muted fw-semobold'>
                                                        <ApproveTypeElement
                                                            type={item.approve?.type}
                                                        />
                                                    </td>
                                                    <td className='text-center'>
                                                        <ApproveStatusElement
                                                            status={item.approve?.status}
                                                        />
                                                    </td>
                                                    <td className='text-center'>
                                                       {dayjs(item.created_at).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td className='text-end'>
                                                        <Link
                                                            to={{ pathname: directRoute.CONTRACTS_DETAIL(item.id) }}
                                                            className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                                        >
                                                            <KTSVG
                                                                path='/media/icons/duotune/arrows/arr064.svg'
                                                                className='svg-icon-2'
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}