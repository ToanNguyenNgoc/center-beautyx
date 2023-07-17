import { CircularProgress } from "@mui/material";
import { KTSVG } from "_metronic/helpers";
import { promotionApi } from "app/api";
import { Promotion } from "app/interface";
import { formatDate } from "app/util";
import { QR_KEY } from "common";
import { PageCircularProgress, XSwitch } from "components";
import TitlePage from "components/TitlePage";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

function Promotions() {
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.PROMOTION],
    queryFn: () => promotionApi.getAll({
      limit: 15,
      page: 1
    })
  })
  return (
    <>
      <TitlePage
        element={
          // METHOD?.includes("POST") ?
          <Link
            to={{ pathname: "/pages/promotions/form" }}
            className="btn btn-sm btn-primary"
          >
            Tạo mới
          </Link>
          // :
          // <></>
        }
        title="Danh sách Promotion"
      />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Promotion</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng : {data?.total ?? 1}</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-100px'>Image</th>
                  <th className='min-w-150px'>Tên promotion</th>
                  <th className='min-w-150px'>Mô tả</th>
                  <th className='min-w-50px'>Popup</th>
                  <th className='min-w-150px'>Deal</th>
                  <th className='min-w-150px'>Dịch vụ</th>
                  <th className='min-w-100px'>Từ ngày</th>
                  <th className='min-w-100px'>Đến ngày</th>
                  <th className='min-w-80px'></th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.data?.map((item: Promotion, index: number) => <PromotionItem key={index} item={item} />)
                }
              </tbody>
            </table>
            <PageCircularProgress loading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

const PromotionItem: FC<{ item: Promotion }> = ({ item }) => {
  const qrClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: number | string) => promotionApi.delete(id),
    onSuccess: () => qrClient.invalidateQueries({ queryKey: QR_KEY.PROMOTION })
  })
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-100px me-5'>
            <img style={{ objectFit: 'contain' }} src={item.imageURL} alt='' />
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex align-items-center'>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bold text-hover-primary fs-6'>
              {item.name}
            </span>
            <span className='text-muted fw-semobold text-muted d-block fs-7'>
              {formatDate(item.created_at)}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark text-start fw-bold d-block mb-1 fs-7'>
          {item.content}
        </span>
      </td>
      <td>
        <XSwitch value={item.is_popup === 1 ? true : false} label="" />
      </td>
      <td>
        <span className='text-dark text-start fw-bold d-block mb-1 fs-7'>
          {item.content}
        </span>
      </td>
      <td>
        <span className='text-dark text-start fw-bold d-block mb-1 fs-7'>
          {item.content}
        </span>
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
        <div className='d-flex justify-content-end flex-shrink-0 tb-control'>
          {
            // METHOD?.includes("UPDATE") &&
            <Link
              to={{
                pathname: `/pages/promotions/form/${item.id}`
              }}
              aria-label='Xem chi tiết'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </Link>
          }
          <button onClick={() => mutate(item.id)} disabled={isLoading}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            {
              isLoading ?
                <CircularProgress size={12} />
                :
                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            }
          </button>
        </div>
      </td>
    </tr>
  )
}


export default Promotions;