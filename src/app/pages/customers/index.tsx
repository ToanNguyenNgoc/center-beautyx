/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { KTSVG } from "_metronic/helpers";
import { statisticApi } from "app/api";
import { PLAT_FORM_ARR, formatDate, getRangeOfDates } from "app/util";
import { QR_CACHE, QR_KEY } from "common";
import { AppSnack, FlatFormOrder, PageCircularProgress, XDateRangePicker, XPagination } from "components";
import TitlePage from "components/TitlePage";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"
import { QrCustomer, ResponseList } from "@types";
import { FC, useEffect, useState } from "react";
import "./style.scss"
import { identity, pickBy } from "lodash";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { Customer } from "app/interface";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"
import { useMessage } from "app/hooks";

function Customers() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search) as QrCustomer
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.CUSTOMER, query],
    queryFn: () => statisticApi.customers({
      'page': query['page'],
      'limit': 15,
      'platform': query['platform'],
      'sort': query['sort'] || '-created_at',
      'from_date': query['from_date'],
      'to_date': query['to_date']
    }),
    staleTime: QR_CACHE
  })
  const customers = data?.data || []
  const onChangePage = (page: number) => {
    const newQuery = {
      ...query,
      page: page
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  return (
    <>
      <TitlePage title="Danh sách khách hàng" />
      <div className={`card`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Customer Statistics</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng:{data?.total} members</span>
          </h3>
        </div>
        <Filter query={query} />
        <div className="d-flex justify-content-end px-12">
          {data && <ExportFile data={data} qr={query} />}
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Thông tin khách hàng</th>
                  <th className='min-w-140px'>Số điện thoại</th>
                  <th className='min-w-140px'>Nền tảng</th>
                  <th className='min-w-120px'>Ngày đăng ký</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  customers.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <Avatar src={item.avatar || item.fullname} alt={item.fullname} />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold fs-6'>
                              {item.fullname}
                            </span>
                            <span className='fw-semobold text-muted d-block fs-7'>
                              {item.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href={`tel:${item.telephone}`} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.telephone}
                        </a>
                      </td>
                      <td>
                        <FlatFormOrder platForm={item.platform} />
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {formatDate(item.created_at)}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <Link
                            to={'#'}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
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
            <PageCircularProgress loading={isLoading} />
            <XPagination
              totalPage={data?.last_page ?? 1}
              onChangePage={onChangePage}
              defaultPage={query['page'] ?? 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;

const Filter: FC<{ query: QrCustomer }> = ({ query }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const sorts = [
    { sort: '-created_at', title: 'Ngày đăng ký mới' },
    { sort: 'created_at', title: 'Ngày đăng ký cũ' }
  ]
  const [rangeDate, setRangeDate] = useState({ form: query['from_date'], to: query['to_date'] })
  const onChangePlatform = (e: SelectChangeEvent) => {
    const newQuery = {
      ...query,
      'page': 1,
      'platform': e.target.value !== "" ? e.target.value : ""
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const onChangeSort = (e: SelectChangeEvent) => {
    const newQuery: QrCustomer = {
      ...query,
      'sort': e.target.value,
      'page': 1
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  const onApplyRangeDate = () => {
    const newQuery: QrCustomer = {
      ...query,
      'page': 1,
      'from_date': rangeDate.form,
      'to_date': rangeDate.to
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  const onCancelRangeDate = () => {
    const newQuery: QrCustomer = {
      ...query,
      'page': 1,
      'from_date': undefined,
      'to_date': undefined
    }
    setRangeDate({ form: undefined, to: undefined })
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  return (
    <div className="d-flex justify-content-between filter-cnt">
      <div>
        <label className="filter-row_label">Tìm kiếm</label>
        <input
          // type="text" onChange={onInputChange}
          className="form-control form-control-solid py-2 px-6"
          placeholder="Tìm kiếm"
        />
      </div>
      <div className="filter-right">
        <div className="filter-row">
          <div className="filter-row_platform">
            <label className="filter-row_label">Nền tảng</label>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={query['platform'] ?? ''}
                onChange={onChangePlatform}
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
        <div className="filter-row_picker">
          <XDateRangePicker
            showBot
            init={(!rangeDate.form || !rangeDate.to)}
            startDate={rangeDate.form ? new Date(rangeDate.form) : new Date()}
            endDate={rangeDate.to ? new Date(rangeDate.to) : new Date()}
            label="Thời gian đăng ký"
            onChange={(e) => setRangeDate({
              form: moment(e.selection.startDate).format('YYYY-MM-DD HH:mm:ss'),
              to: moment(e.selection.endDate).format('YYYY-MM-DD HH:mm:ss')
            })}
            onApply={onApplyRangeDate}
            onCancel={onCancelRangeDate}
          />
        </div>
      </div>
    </div>
  )
}

interface ExportFileProps {
  data: ResponseList<Customer[]>;
  qr: QrCustomer;
}

const ExportFile: FC<ExportFileProps> = ({ data, qr }) => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const [isExport, setIsExport] = useState(false)
  const { mutate, isLoading } = useMutation({
    mutationFn: (page: number) => statisticApi.customers({
      ...qr, 'page': page, 'limit': 15
    }),
    onSuccess: (res) => setCustomers(prev => [...prev, ...res.data])
  })
  const onExport = () => {
    if(data.data.length === 0) return
    if (!qr['from_date'] || !qr['to_date'])
      return resultLoad({ message: 'Vui lòng chọn khoảng thời gian', color: 'warning' })
    const dateRange = getRangeOfDates(
      qr['from_date'] ? new Date(qr['from_date']) : new Date(),
      qr['to_date'] ? new Date(qr['to_date']) : new Date()
    )
    if (dateRange.length > 31)
      return resultLoad({ message: 'Xuất danh sách tối đa trong 30 ngày', color: 'warning' })
    setIsExport(true)
    for (var i = 1; i <= data?.last_page; i++) {
      mutate(i)
    }
  }
  useEffect(() => {
    if (isExport && customers.length > 0 && customers.length === data?.total) {
      onExportFile(customers).then(() => {
        resultLoad({ message: 'Xuất File thành công', color: 'success' })
        setCustomers([])
        setIsExport(false)
      })
    }
    if (customers.length === data?.total) setCustomers([])
  }, [customers, data?.total])
  return (
    <>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <LoadingButton
        color="success"
        size="medium"
        variant="contained"
        onClick={onExport}
        type="button"
        loading={isLoading}
      >
        <i style={{ marginRight: '4px', color: 'var(--kt-white)' }} className="bi bi-download"></i>
        Xuất danh sách
      </LoadingButton>
    </>
  )
}
const onExportFile = (customers: Customer[]) => {
  return new Promise((resolve, reject) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const titleRow = ['#', 'ID', 'Họ và tên', 'Email', 'Số điện thoại', 'Nền tảng', 'Ngày đăng ký']; // Replace with your actual titles
    const dataWithTitles = [
      titleRow,
      ...customers.map((item, i) => [i + 1, item.id, item.fullname, item.email, item.telephone, item.platform, item.created_at])
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataWithTitles);
    const columnWidths = [
      { wch: 5 },
      { wch: 10 },
      { wch: 35 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    ws['!cols'] = columnWidths;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `ds_khach_hang_${moment().format('DDHHmmss')}` + fileExtension);
    resolve(true)
  })
}