import React from 'react';
import { IItemView } from 'app/interface';
import { useFetch } from 'app/hooks';
import { API_3RD } from 'app/api/api-route';
import { Avatar } from 'components';
import { formatPrice } from 'app/util'

interface TopServicesProps {
    className: string
}

export function TopServices(props: TopServicesProps) {
    const { response } = useFetch(true, API_3RD.VIEW_COUNT)



    return (
        <div className={`card ${props.className}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>
                        TOP dịch vụ/sản phẩm được xem nhiều
                    </span>
                </h3>
                <div className='card-toolbar'>

                </div>
            </div>
            <div className='card-body py-3'>
                <div className='tab-content'>
                    <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
                        <div className='table-responsive'>
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                <thead>
                                    <tr className='border-0 fw-bold text-muted'>
                                        <th className='p-0 min-w-100px'>Dịch vụ/ Sản phẩm</th>
                                        <th className='p-0 min-w-80px text-start'>Giá bán</th>
                                        <th className='p-0 min-w-100px text-center'>Lượt xem</th>
                                        <th className='p-0 min-w-110px text-center'>Loại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        response?.data?.map((item: IItemView, index: number) => (
                                            <tr key={index} >
                                                <td>
                                                    <div className='d-flex align-items-center symbol symbol-45px me-2'>
                                                        <Avatar src={item.image_url} size={48} />
                                                        <div className='ms-3'>
                                                            <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                                {item._id}
                                                            </span>
                                                            <span className='text-muted fw-semobold d-block'>
                                                                {item.org_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-start d-flex flex-column align-items-start'>
                                                    <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                        {formatPrice(item.special_price)}đ
                                                    </span>
                                                    <span className='text-dark mb-1 fs-7 text-decoration-line-through'>
                                                        {formatPrice(item.price)}đ
                                                    </span>
                                                </td>
                                                <td className='text-center text-muted fw-semobold'>
                                                    {item.view_count}
                                                </td>
                                                <td className='text-center'>
                                                    {item.type}
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