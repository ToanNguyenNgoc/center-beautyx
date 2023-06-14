import {FormControl, MenuItem, Switch} from '@mui/material'
import {API_ROUTE} from 'app/api/api-route'
import {useGetParamUrl, useSwr} from 'app/hooks'
import {IProductSingle} from 'app/interface/product_single'
import {paramProduct} from 'app/query-params'
import {XPagination} from 'components'
import React, {useCallback, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import TitlePage from '../../../components/TitlePage'
import ProductItem from './components/ProductItem'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {debounce, identity, pickBy} from 'lodash'
import './style.scss'

export default function Products() {
  const location = useLocation()
  const navigate = useNavigate()
  let refSearch = useRef<any>()
  const queryStr: any = useGetParamUrl() ?? {}
  const [selector, setSelector] = useState('1')
  const [sortPro, setSortPro] = useState<string>(queryStr?.sort || '')
  const [filterMomo, setfilterMomo] = useState<boolean>(true)
  const [keyWord, setKeyWord] = useState<string>()

  const paramUrl = {
    page: queryStr?.page,
    sort: queryStr?.sort,
  }
  const PARAMS = {
    ...paramProduct,
    page: queryStr?.page ?? 1,
    'filter[keyword]': keyWord,
    sort: sortPro,
    'filter[is_momo_ecommerce_enable]': filterMomo,
  }
  const {responseArray, totalItem, totalPage} = useSwr(true, API_ROUTE.PRODUCTS, PARAMS)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounceSearch = useCallback(
    debounce((text) => setKeyWord(text), 600),
    []
  )
  const handleChangeSearch = () => {
    onDebounceSearch(refSearch?.current?.value)
  }
  const onChangePage = (page: number) => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}`,
    })
  }
  const handleSelector = (e: SelectChangeEvent) => {
    setSelector(e.target.value as string)
  }
  const switchHandler = () => {
    setfilterMomo(!filterMomo)
  }
  const handleSort = (sortProtring: string) => {
    setSortPro(sortProtring)
    const paramsPage = {
      ...paramUrl,
      page: '1',
      sort: sortProtring,
    }
    const url = `${new URLSearchParams(pickBy(paramsPage, identity)).toString()}`
    navigate({
      pathname: location.pathname,
      search: url,
    })
  }
  return (
    <>
      {/* title */}
      <TitlePage
        element={
          <div className='d-flex align-items-center position-relative  search-service'>
            <span className='svg-icon svg-icon-1 position-absolute ms-4'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  opacity='0.5'
                  x='17.0365'
                  y='15.1223'
                  width='8.15546'
                  height='2'
                  rx='1'
                  transform='rotate(45 17.0365 15.1223)'
                  fill='currentColor'
                ></rect>
                <path
                  d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                  fill='currentColor'
                ></path>
              </svg>
            </span>
            <input
              onChange={() => handleChangeSearch()}
              ref={refSearch}
              type='text'
              data-kt-ecommerce-product-filter='search'
              className='form-control form-control-solid w-200px ps-14'
              placeholder='Tìm kiếm sản phẩm'
            />
          </div>
        }
        title='Sản phẩm'
      />
      {/* close title */}

      {/* content */}
      <div className='card mb-5 mb-xl-8'>
        {/* head */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Danh sách sản phẩm</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>{totalItem} sản phẩm</span>
          </h3>
          <div className='flex-row align-items-center table-responsive category-service gap-4'>
            {/* checkbox */}
            <div className='flex-row align-items-center gap-2'>
              <span style={{whiteSpace: 'nowrap'}} className='text-gray-400 fw-bold fs-7 gs-0'>
                Bật/tắt TMĐT:
              </span>
              <Switch defaultChecked={true} color='success' onChange={switchHandler} />
            </div>
            {/* close checkbox */}

            {/* sort */}
            <div className='flex-row align-items-center'>
              <span style={{whiteSpace: 'nowrap'}} className='text-gray-400 fw-bold fs-7 gs-0'>
                Bộ lọc:
              </span>
              <FormControl>
                <Select value={selector} onChange={handleSelector}>
                  <MenuItem
                    onClick={() => {
                      //   setSortPro('')
                      const paramsPage = {
                        ...paramUrl,
                        page: queryStr?.page,
                        sort: '',
                      }
                      const url = `${new URLSearchParams(pickBy(paramsPage, identity)).toString()}`
                      navigate({
                        pathname: location.pathname,
                        search: url,
                      })
                    }}
                    value={1}
                  >
                    Tất cả
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('product_name')} value={2}>
                    A-Z
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('retail_price')} value={3}>
                    Giá thấp
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('bought_count')} value={4}>
                    Mua nhiều nhất
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('created_date')} value={5}>
                    Mới nhất
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* close sort */}
          </div>
        </div>
        {/* close head */}

        {/* body */}
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4 table-row-dashed '>
              <thead>
                {/*begin::Table row*/}
                <tr className='text-gray-400 fw-bold fs-7 gs-0'>
                  <th
                    className='min-w-200px sorting'
                    tabIndex={0}
                    aria-controls='kt_ecommerce_products_table'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '25%'}}
                  >
                    Dịch vụ
                  </th>
                  <th
                    className='min-w-50px sorting'
                    tabIndex={0}
                    aria-controls='kt_ecommerce_products_table'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '10%'}}
                  >
                    Giá gốc
                  </th>
                  <th
                    className='min-w-70px sorting'
                    tabIndex={0}
                    aria-controls='kt_ecommerce_products_table'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '10%'}}
                  >
                    Giá giảm
                  </th>
                  <th
                    className='min-w-150px sorting'
                    tabIndex={0}
                    aria-controls='kt_ecommerce_products_table'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '20%'}}
                  >
                    Doanh nghiệp
                  </th>
                  <th
                    className='min-w-50px sorting'
                    tabIndex={0}
                    aria-controls='kt_ecommerce_products_table'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '15%'}}
                  >
                    Trạng thái TMĐT
                  </th>
                  <th
                    className='min-w-100px text-end'
                    rowSpan={1}
                    colSpan={1}
                    style={{width: '10%'}}
                  >
                    Tùy chọn
                  </th>
                </tr>
                {/*end::Table row*/}
              </thead>
              <tbody>
                {responseArray?.map((item: IProductSingle, index: number) => (
                  <ProductItem key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* close body */}
      </div>
      {/* close content */}

      {/* pagination */}
      <XPagination
        totalPage={totalPage}
        onChangePage={onChangePage}
        defaultPage={queryStr?.page ?? 1}
      />
      {/* close pagination */}
    </>
  )
}
