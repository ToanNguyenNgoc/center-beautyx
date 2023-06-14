import TitlePage from "components/TitlePage";
import { paramContract } from 'app/query-params';
import { useGetParamUrl, useSwr } from 'app/hooks'
import { IContract } from 'app/interface'
import { API_ROUTE } from "app/api/api-route";
import { KTSVG } from "_metronic/helpers";
import { Avatar } from 'components'
import { ApproveTypeElement, ApproveStatusElement } from 'app/util/fileType'
import dayjs from "dayjs";
import directRoute from "app/routing/DirectRoute";
import { useLocation, useNavigate } from "react-router-dom";
import { XPagination } from 'components'

function Contracts() {
    const navigate = useNavigate();
    const query = useGetParamUrl();
    const location = useLocation();
    const { responseArray, totalItem, totalPage } = useSwr(true, API_ROUTE.CONTRACTS, {
        ...paramContract,
        "page": query?.page ?? 1
    })
    const contracts: IContract[] = responseArray ?? []

    return (
        <>
            <TitlePage
                title="Danh sách hợp đồng"
            />
            <div className={`card mb-5 mb-xl-8`}>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Hợp đồng</span>
                        <span className='text-muted mt-1 fw-semobold fs-7'>{totalItem}</span>
                    </h3>
                </div>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='min-w-120px'>Doanh nghiệp</th>
                                    <th className='min-w-140px'>Gói</th>
                                    <th className='min-w-120px'>Tên công ty</th>
                                    <th className='min-w-100px'>Type</th>
                                    <th className='min-w-100px'>Trạng thái</th>
                                    <th className='min-w-100px'>Ngày tạo</th>
                                    <th className='min-w-100px'>Thay đổi</th>
                                    <th className='min-w-100px text-end'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contracts.map((item: IContract, index: number) => (
                                        <tr key={index} >
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
                                                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                                                    {item.package_name}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                                                    {item.company_name}
                                                </span>
                                            </td>
                                            <td>
                                                <ApproveTypeElement
                                                    type={item.approve?.type}
                                                />
                                            </td>
                                            <td className='text-dark fw-bold text-hover-primary fs-6'>
                                                <ApproveStatusElement
                                                    status={item.approve?.status}
                                                />
                                            </td>
                                            <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                                                    {dayjs(item.created_at).format("HH:mm-DD/MM/YYYY")}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7 mt-1'>
                                                    {dayjs(item.updated_at).format("HH:mm-DD/MM/YYYY")}
                                                </span>
                                            </td>
                                            <td className='text-end'>
                                                <button
                                                    onClick={() => navigate(directRoute.CONTRACTS_DETAIL(item.id))}
                                                    style={{ marginRight: "4px" }}
                                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button
                                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                >
                                                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <XPagination
                defaultPage={query?.page ?? 1}
                onChangePage={(page: number) => navigate({
                    pathname: location.pathname,
                    search: `page=${page}`
                })}
                totalPage={totalPage}
            />
        </>
    );
}

export default Contracts;