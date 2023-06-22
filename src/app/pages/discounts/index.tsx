import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useVerifyRoute } from 'app/hooks';
import TitlePage from 'components/TitlePage';
import { formatDate } from 'app/util/format';
import { DISCOUNTS_TYPE, DiscountsTypeElement } from 'app/util/fileType';
import FlatFormOrder from 'components/PlatForm';
import { KTSVG } from '_metronic/helpers';
import { IDiscountPar } from 'app/interface';
import { XPagination } from 'components';
import { useQuery } from 'react-query';
import { QR_KEY } from 'common';
import { discountsApi } from 'app/api';
import queryString from 'query-string';
import { ReqDiscount } from '@types';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PLAT_FORM_ARR } from 'app/util';
import './style.scss'
import  { identity, pickBy } from 'lodash';

function Discounts() {
    const location = useLocation()
    const navigate = useNavigate()
    const query = queryString.parse(location.search) as ReqDiscount

    const { METHOD } = useVerifyRoute()
    const { data } = useQuery({
        queryKey: [QR_KEY.DISCOUNT_PAGE, query],
        queryFn: () => discountsApi.getAll({
            page: query?.page ?? 1,
            limit: 10,
            'filter[platform]': query['filter[platform]'],
            'filter[discount_type]': query['filter[discount_type]'],
            'sort': query.sort ?? '-created_at'
        })
    })
    const discounts: IDiscountPar[] = data?.data ?? []
    const onChangePage = (p: number) => {
        const newQuery = {
            ...query,
            page: p
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(newQuery)
        })
    }
    return (
        <>
            <TitlePage
                element={
                    // METHOD?.includes("POST") ?
                    <Link
                        to={{ pathname: "/pages/discounts-form" }}
                        className="btn btn-sm btn-primary"
                    >
                        Tạo mới
                    </Link>
                    // :
                    // <></>
                }
                title="Danh sách Mã giảm giá"
            />
            <div className={`card mb-5 mb-xl-8`}>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Mã giảm giá</span>
                        <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng : {data?.total ?? 1}</span>
                    </h3>
                </div>
                <Filter query={query} />
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    {/* <th className='min-w-120px'>Mã</th> */}
                                    <th className='min-w-150px'>Tiêu đề</th>
                                    <th className='min-w-80px'>Ưu tiên</th>
                                    {/* <th className='min-w-150px'>Mô tả</th> */}
                                    <th className='min-w-150px'>Hình thức giảm</th>
                                    {/* <th className='min-w-150px'>Loại giảm giá</th> */}
                                    <th className='min-w-100px'>Từ ngày</th>
                                    <th className='min-w-100px'>Đến ngày</th>
                                    <th className='min-w-100px text-end'>Nền tảng</th>
                                    <th className='min-w-100px text-end'>Số lượng mã</th>
                                    <th className='min-w-150px text-end'>Sử dụng/1 khách</th>
                                    <th className='min-w-100px text-end'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    discounts.map((item: IDiscountPar, index: number) => (
                                        <tr key={index} >
                                            {/* <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                        {item.coupon_code}
                                                    </span>
                                                </div>
                                            </td> */}
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='symbol symbol-45px me-5'>
                                                        <img src={item.items[0]?.productable?.image_url} alt='' />
                                                    </div>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                                                            {/* <a href='https://beautyx.vn' target='_blank' rel="noreferrer" >
                                                                {item.title}
                                                            </a> */}
                                                            {item.title}
                                                        </span>
                                                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                            {formatDate(item.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='text-dark text-center fw-bold d-block mb-1 fs-7'>
                                                    {item.priority}
                                                </span>
                                            </td>
                                            {/* <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                    {item.description}
                                                </span>
                                            </td> */}
                                            <td>
                                                <div className='d-flex flex-column w-100 me-2'>
                                                    <DiscountsTypeElement
                                                        TYPE={item.discount_type}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                    {formatDate(item.valid_from)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                    {formatDate(item.valid_util)}
                                                </span>
                                            </td>
                                            <td>
                                                <FlatFormOrder
                                                    platForm={item.platform}
                                                />
                                            </td>
                                            <td>
                                                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                                    {item.total ?? 'Không giới hạn'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-muted text-end fw-semobold text-muted d-block fs-7'>
                                                    {item.limit ?? 'Không giới hạn'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                    {
                                                        METHOD?.includes("GET_BY_ID") &&
                                                        <Link
                                                            to={{
                                                                pathname: `/pages/discounts/${item.id}`
                                                            }}
                                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                        >
                                                            <KTSVG
                                                                path='/media/icons/duotune/general/gen019.svg'
                                                                className='svg-icon-3'
                                                            />
                                                        </Link>
                                                    }
                                                    {
                                                        // METHOD?.includes("UPDATE") &&
                                                        <Link
                                                            to={{
                                                                pathname: `/pages/discounts-form/${item.uuid}`
                                                            }}
                                                            aria-label='Xem chi tiết'
                                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                        >
                                                            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                                                        </Link>
                                                    }
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
                        </table>
                        <XPagination
                            totalPage={data?.last_page ?? 1}
                            onChangePage={onChangePage}
                            defaultPage={query?.page ?? 1}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
const Filter = ({ query }: { query: ReqDiscount }) => {
    const sorts = [
        {sort:'-created_at', title:'Ngày tạo'},
        {sort:'-total', title:'Số lượng mã'},
        {sort:'-priority', title:'Độ ưu tiên'},
    ]
    const navigate = useNavigate()
    const location = useLocation()
    const handleChange = (event: SelectChangeEvent) => {
        const newQuery = {
            ...query,
            'page': 1,
            'filter[platform]': event.target.value !== "" ? event.target.value:""
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(pickBy(newQuery, identity))
        })
    };
    const onChangeType = (e: SelectChangeEvent) => {
        const newQuery: ReqDiscount = {
            ...query,
            'page': 1,
            'filter[discount_type]': e.target.value !== "" ? e.target.value:""
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(pickBy(newQuery, identity))
        })
    }
    const onChangeSort = (e:SelectChangeEvent)=>{
        const newQuery:ReqDiscount = {
            ...query,
            'sort':e.target.value
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(newQuery)
        })
    }
    return (
        <div className="filter-cnt">
            <div className="filter-row">
                <div className="filter-row_platform">
                    <label className="filter-row_label">Hình thức giảm giá</label>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={query['filter[discount_type]'] ?? ''}
                            onChange={onChangeType}
                        >
                            <MenuItem value="">
                                <em>Tất cả</em>
                            </MenuItem>
                            {
                                DISCOUNTS_TYPE.map(item => (
                                    <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="filter-row_platform">
                    <label className="filter-row_label">Nền tảng</label>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={query['filter[platform]'] ?? ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Tất cả</em>
                            </MenuItem>
                            {
                                PLAT_FORM_ARR.map(item => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="filter-row_platform">
                    <label className="filter-row_label">Sắp xếp theo</label>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={query.sort ?? sorts[0].sort}
                            onChange={onChangeSort}
                        >
                            {
                                sorts.map(item => (
                                    <MenuItem key={item.sort} value={item.sort}>{item.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default Discounts;