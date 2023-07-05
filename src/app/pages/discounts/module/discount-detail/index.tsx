/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IDiscountPar } from 'app/interface/discounts';
import TitlePage from 'components/TitlePage';
import FlatFormOrder from 'components/PlatForm';
import { useQuery } from 'react-query';
import { QR_KEY } from 'common';
import { discountsApi } from 'app/api';
import moment from 'moment';
import { PageCircularProgress, XPagination } from 'components';
import { ExportCode } from 'app/pages/discounts/module/discount-form';
import queryString from 'query-string'
import "./style.scss";

function DiscountDetail() {
    // const { METHOD } = useVerifyRoute()
    const navigate = useNavigate()
    const params: any = useParams()
    const location = useLocation()
    const query: any = queryString.parse(location.search)
    const state = location.state as IDiscountPar | null
    const { data } = useQuery({
        queryKey: [QR_KEY.DISCOUNT, params.id],
        queryFn: () => discountsApi.getDiscountDetail({ id: params.id }),
        enabled: !state ? true : false,
        onError: () => navigate("/error/404")
    })
    const discount = state ?? data?.context
    const { data: dataCode } = useQuery({
        queryKey: [QR_KEY.DISCOUNT_CODE, params.id, query],
        queryFn: () => discountsApi.getCodeIsCampaign({
            uuid: params.id,
            limit: 50,
            page: query?.page ?? 1
        }),
        enabled: params?.id ? true : false
    })
    const onChangePage = (page: number) => {
        const newQuery = { page: page }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(newQuery),
        })
    }

    return (
        discount ?
            <>
                <TitlePage
                    title={discount?.title ?? ''}
                    element={
                        // METHOD?.includes("UPDATE") ?
                        <Link
                            to={{
                                pathname: `/pages/discounts-form/${discount?.uuid}`
                            }}
                            className="btn btn-sm btn-success">Thay đổi thông tin
                        </Link>
                        // :
                        // <></>
                    }
                />
                <div className="container">
                    <div className="detail">
                        <div className="d-flex justify-content-between align-items-start">
                            <p className="fw-semobold d-block fs-4">Danh sách mã giảm giá ({discount.total} mã)</p>
                            <div>
                                <div className="d-flex align-items-center">
                                    <label style={{ marginRight: '8px' }}>Nền tảng</label>
                                    <FlatFormOrder
                                        platForm={discount?.platform ?? ''}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <label style={{ marginRight: '8px' }}>Áp dụng từ</label>
                                    {
                                        (discount?.valid_from && discount?.valid_util) &&
                                        <div className='d-flex align-items-center'>
                                            <span className="fw-semobold d-block fs-6">{moment(discount.valid_from).format('DD/MM/YYYY')}</span>
                                            -
                                            <span className="fw-semobold d-block fs-6">{moment(discount.valid_util).format('DD/MM/YYYY')}</span>
                                        </div>
                                    }
                                </div>
                                <div className='d-flex justify-content-end mt-2 mb-2'>
                                    <ExportCode
                                        discount={discount}
                                    />
                                </div>
                            </div>
                        </div>
                        <table className="table table-rounded table-row-bordered border gy-7 gs-7">
                            <thead>
                                <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                    <th>STT</th>
                                    <th>Mã giảm giá</th>
                                    <th>Trạng thái sử dụng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataCode?.data?.map((item, index) => (
                                        <tr key={index} className={item.status === "1" ? "" : "table-active"}>
                                            <td>{index + 1}</td>
                                            <td>{item.coupon_code}</td>
                                            <td>
                                                {item.status === '1' ? 'Chưa sử dụng' : 'Đã sử dụng'}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <XPagination
                            totalPage={dataCode?.total ? Math.ceil(dataCode.total / 50) : 1}
                            defaultPage={query?.page ?? 1}
                            onChangePage={onChangePage}
                        />
                    </div>
                </div>
            </>
            :
            <PageCircularProgress loading={true} />
    );
}

export default DiscountDetail;