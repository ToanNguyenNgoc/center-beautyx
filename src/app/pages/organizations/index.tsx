import { useSwrInfinite, useVerifyRoute } from 'app/hooks';
import TitlePage from 'components/TitlePage';
import React from 'react';
import { API_ROUTE } from 'app/api/api-route';
import { paramOrgs } from 'app/query-params'
import { IOrganization } from 'app/interface';
import { Avatar } from 'components';
import { StatusOrgE } from 'app/util/fileType'
import { Link } from 'react-router-dom';
import directRoute from 'app/routing/DirectRoute';

function Organizations() {
    const { ROUTES, METHOD } = useVerifyRoute()
    const { resData, totalItem } = useSwrInfinite(
        METHOD?.includes("GET"),
        API_ROUTE.ORGANIZATIONS,
        paramOrgs
    )
    return (
        <>
            <TitlePage
                title="Danh sách doanh nghiệp"
            />
            <div className={`card mb-5 mb-xl-8`}>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Danh sách doanh nghiệp</span>
                        <span className='text-muted mt-1 fw-semobold fs-7'>{totalItem} doanh nghiệp</span>
                    </h3>
                </div>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        <table className='table align-middle gs-0 gy-4'>
                            <thead>
                                <tr className='fw-bold text-muted bg-light'>
                                    <th className='ps-4 min-w-300px rounded-start'>Thông tin</th>
                                    <th className='min-w-125px'>Liên lạc</th>
                                    <th className='min-w-125px'>Lượt thích</th>
                                    <th className='min-w-200px'>Trạng thái TMDT</th>
                                    <th className='min-w-100px'>Rating</th>
                                    <th className='min-w-150px text-end rounded-end'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    resData?.map((org: IOrganization, index: number) => (
                                        <tr key={index} >
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='symbol symbol-50px me-5'>
                                                        <Avatar src={org.image_url} />
                                                    </div>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                                            {org.name}
                                                        </span>
                                                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                            {org.full_address}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-7'>
                                                    {org.telephone?.join(', ')}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    {org.favorites_count}
                                                </span>
                                            </td>
                                            <td>
                                                <StatusOrgE status={org.is_momo_ecommerce_enable} />
                                            </td>
                                            <td>
                                                <div className='rating'>
                                                    <div className='rating-label me-2 checked'>
                                                        <i className='bi bi-star-fill fs-5'></i>
                                                    </div>
                                                    <div className='rating-label me-2 checked'>
                                                        <i className='bi bi-star-fill fs-5'></i>
                                                    </div>
                                                    <div className='rating-label me-2 checked'>
                                                        <i className='bi bi-star-fill fs-5'></i>
                                                    </div>
                                                    <div className='rating-label me-2 checked'>
                                                        <i className='bi bi-star-fill fs-5'></i>
                                                    </div>
                                                    <div className='rating-label me-2 checked'>
                                                        <i className='bi bi-star-fill fs-5'></i>
                                                    </div>
                                                </div>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                                                    Best Rated
                                                </span>
                                            </td>
                                            <td className='text-end'>
                                                {
                                                    METHOD?.includes("GET_BY_ID") &&
                                                    <Link
                                                        to={{ pathname: directRoute.ORGANIZATIONS_DETAIL(org.id) }}
                                                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                                                    >
                                                        <i className="bi bi-eye fs-4"></i>
                                                    </Link>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Organizations;