import TitlePage from 'components/TitlePage';
import { IOrganization } from 'app/interface';
import { AppSnack, Avatar, XPagination } from 'components';
import { StatusOrgE } from 'app/util/fileType'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import directRoute from 'app/routing/DirectRoute';
import { FC, useEffect, useState } from 'react';
import queryString from 'query-string'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from 'react-query';
import { orgApi } from 'app/api';
import { ResponseList } from '@types';
import { identity, pickBy } from 'lodash';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"
import "./organization.scss"
import moment from 'moment';
import { useMessage } from 'app/hooks';

function Organizations() {
  const location = useLocation()
  const navigate = useNavigate()
  const qrPath = queryString.parse(location.search)
  const { data } = useQuery({
    queryKey: ['ORG', qrPath],
    queryFn: () => orgApi.getAll({
      page: qrPath.page || 1,
      limit: 30,
      is_ecommerce: qrPath.is_ecommerce || '',
      sort: '-created_at'
    }).then<ResponseList<IOrganization[]>>(res => res.data.context)
  })
  const onChangePage = (p: number) => {
    const newQuery = {
      ...qrPath,
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
        title="Danh sách doanh nghiệp"
      />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Danh sách doanh nghiệp</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>{data?.total} doanh nghiệp</span>
          </h3>
        </div>
        <Filter data={data} />
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
                  data?.data?.map((org: IOrganization, index: number) => (
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
                          // METHOD?.includes("GET_BY_ID") &&
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
            <XPagination
              totalPage={data?.last_page ?? 1}
              onChangePage={onChangePage}
              defaultPage={qrPath?.page ?? 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
const Filter: FC<{ data?: ResponseList<IOrganization[]> }> = ({ data }) => {
  const query = queryString.parse(useLocation().search) as any
  const navigate = useNavigate()
  const location = useLocation()
  const onChangeOnBtx = (e: SelectChangeEvent) => {
    const newQuery = {
      ...query,
      page: '',
      is_ecommerce: e.target.value
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  return (
    <div className="card-body filter-cnt">
      <div className="search">
        <input type="text" className="form-control form-control-solid" placeholder='Tìm kiếm MC' />
      </div>
      <div className="filter">
        <div className="filter-item">
          <FormControl style={{ width: '100%' }} size="small">
            <InputLabel id="demo-select-small-label">Trạng thái TMDT</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Trạng thái TMDT"
              value={query.is_ecommerce || ''}
              onChange={onChangeOnBtx}
            >
              <MenuItem value={''}>Tất cả</MenuItem>
              <MenuItem value={'true'}>Đang mở</MenuItem>
              <MenuItem value={'false'}>Đang đóng</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter-item">
          {data && <Export query={query} data={data} />}
        </div>
      </div>
    </div>
  )
}
const Export: FC<{ query: any, data: ResponseList<IOrganization[]> }> = ({ query, data }) => {
  const [orgs, setOrgs] = useState<IOrganization[]>([])
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const [isExport, setIsExport] = useState(false)
  const { mutate, isLoading } = useMutation({
    mutationFn: (page: number) => orgApi.getAll({
      page,
      is_ecommerce: query.is_ecommerce || '',
      sort: '-created_at',
      limit: 30,
    }).then<ResponseList<IOrganization[]>>(res => res.data.context),
    onSuccess: (res) => setOrgs(prev => [...prev, ...res.data])
  })
  const onExport = () => {
    setIsExport(true)
    for (var i = 1; i <= data?.last_page; i++) {
      mutate(i)
    }
  }
  useEffect(() => {
    if (isExport && orgs.length > 0 && orgs.length === data?.total) {
      onExportFile(orgs).then(() => {
        resultLoad({ message: 'Xuất File thành công', color: 'success' })
        setOrgs([])
        setIsExport(false)
      })
    }
    if (orgs.length === data?.total) setOrgs([])
  }, [orgs, data?.total])

  return (
    <>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <LoadingButton onClick={onExport} loading={isLoading} color="success" variant="contained" size="medium" >
        Xuất DS
      </LoadingButton>
    </>
  )
}
const onExportFile = (customers: IOrganization[]) => {
  return new Promise((resolve, reject) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const titleRow = ['#', 'ID', 'Tên MC', 'Link gian hàng', 'Subdomain', 'Trạng thái', 'Ngày tạo'];
    const dataWithTitles = [
      titleRow,
      ...customers.map((item, i) => [
        i + 1, item.id, item.name, `https://beautyx.vn/cua-hang/${item.subdomain}`, item.subdomain,
        item.is_momo_ecommerce_enable ? 'Đang mở' : 'Đang tắt', moment(item.created_at).format('DD/MM/YYYY')
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataWithTitles);
    const columnWidths = [
      { wch: 5 },
      { wch: 10 },
      { wch: 75 },
      { wch: 45 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    ws['!cols'] = columnWidths;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `ds_mc_${moment().format('DDHHmmss')}` + fileExtension);
    resolve(true)
  })
}
export default Organizations;