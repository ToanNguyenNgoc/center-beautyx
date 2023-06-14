import TitlePage from 'components/TitlePage';
import React from 'react';
import { useSwr, useVerifyRoute } from 'app/hooks'
import { IAUTHOR } from 'app/interface'
import { API_ROUTE } from 'app/api/api-route';
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers';
import { XButton } from 'components'
import directRoute from 'app/routing/DirectRoute';
import { useNavigate } from 'react-router-dom';

function Roles() {
    const navigate = useNavigate()
    const { METHOD } = useVerifyRoute()
    const { response, totalItem } = useSwr(true, API_ROUTE.ROLES)
    const roles: IAUTHOR[] = response ?? []
    return (
        <>
            <TitlePage
                title='Phân quyền'
            />
            <div className={`card mb-5 mb-xl-8`}>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        <table className='table align-middle gs-0 gy-4'>
                            <thead>
                                <tr className='fw-bold text-muted bg-light'>
                                    <th className='ps-4 min-w-300px rounded-start'>#</th>
                                    <th className='min-w-125px'>Tên quyền</th>
                                    <th className='min-w-250px'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map((item: IAUTHOR) => (
                                        <tr key={item.id}>
                                            <td>
                                                <span className='text-dark fw-bold mb-1 fs-6'>
                                                    {item.id}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                                    {item.name}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ width: "100px" }}>
                                                    <XButton
                                                        title='Cấp quyền'
                                                        color="success"
                                                        onClick={() => navigate(directRoute.ROLES_ID_PERMISSIONS(item.id))}
                                                    />
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
            </div>
        </>
    );
}

export default Roles;