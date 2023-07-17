/* eslint-disable react-hooks/exhaustive-deps */
// import Draggable from 'react-draggable';
import React, { FC, useState } from "react";
import './style.scss';
import { Link, useNavigate } from "react-router-dom";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
// import { useVerifyRoute } from "app/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QR_KEY } from "common";
import bannerApi from "app/api/bannerApi";
import { IBanner } from "app/interface";
import TitlePage from "components/TitlePage";
import { KTSVG, toAbsoluteUrl } from "_metronic/helpers";
import { BannerTypeElement, formatDate } from "app/util";
import moment from "moment";
import { Button, CircularProgress } from "@mui/material";
import { PageCircularProgress } from "components";

function BannerWidget(props: any) {
  const navigate = useNavigate()
  // const { METHOD } = useVerifyRoute()
  const [banners, setBanners] = useState<IBanner[]>([])
  useQuery({
    queryKey: [QR_KEY.BANNER],
    queryFn: () => bannerApi.banners(),
    onSuccess(data) {
      setBanners(data.data)
    },
  })
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setBanners(arrayMoveImmutable(banners, oldIndex, newIndex))
  }


  return (
    <>
      <TitlePage
        element={
          // METHOD?.includes("POST") &&
          <Button
            onClick={() => navigate('/pages/banners-form', {
              state: banners[0]?.priority
            })}
            variant="contained"
            size="large"
          >
            Tạo mới banner
          </Button>
        }
        title="Danh sách banners"
      />
      <div className="row g-5 gx-xxl-8 table-banner">
        <div className={`card mb-5 mb-xl-8`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Banners Campaigns</span>
              <span className='text-muted mt-1 fw-semobold fs-7'>{banners.length}</span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>

                      </div>
                    </th>
                    <th className='min-w-150px'>Banner</th>
                    {/* <th className='min-w-50px'>Độ ưu tiên</th> */}
                    <th className='min-w-140px'>Loại</th>
                    <th className='min-w-140px'>Ngày hết hạn</th>
                    <th className='min-w-140px'>Nền tảng</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <SortableComponent
                  onSortEnd={onSortEnd}
                  banners={banners}
                />
                {/* end::Table body */}
              </table>
              {/* end::Table */}
              <PageCircularProgress loading={banners.length === 0} />
            </div>
            {/* end::Table container */}
          </div>
        </div>
      </div>
      {/* <SortableComponent /> */}
    </>
  )
}
export default BannerWidget;

interface SortableComponentProps {
  banners: IBanner[]
  onSortEnd: (oldIndex: number, newIndex: number) => void
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode
  className?: string
}
interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode
  className?: string
}

const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <tr>{children}</tr>
  )
)
interface ISortableHandleElement {
  children: React.ReactNode
  className?: string
}

const SortableList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
  ({ children, className }: { children: React.ReactNode; className: string }) => {
    return <tbody>{children}</tbody>
  }
)
const DndTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className || ''}>{children}</div>
  )
)
const SortableComponent: FC<SortableComponentProps> = ({ banners, onSortEnd }) => {
  const handleSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
    onSortEnd(oldIndex, newIndex)
  }
  // const { METHOD } = useVerifyRoute()
  const qrClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: number) => bannerApi.deleteBanner(id),
    onSuccess: () => {
      qrClient.invalidateQueries({ queryKey: [QR_KEY.BANNER] })
    },
    onError: () => { }
  })
  return (
    <SortableList
      lockAxis="y"
      lockToContainerEdges={true}
      useDragHandle
      onSortEnd={handleSortEnd}

    >
      {banners.map((item: IBanner, index: number) => (
        <SortableItem
          key={`item-${index}`}
          index={index} className="item"
        >
          <td>
            {
              // METHOD?.includes("UPDATE") &&
              <DndTrigger className="itemTrigger">
                <img src={toAbsoluteUrl("/media/icons/duotune/abstract/abs015.svg")} alt="" />
              </DndTrigger>
            }
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='symbol symbol-45px me-5'>
                <img className="banner-item__img" src={item.imageURL} alt='' />
              </div>
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
          {/* <td>
                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                            {item.priority}
                        </span>
                    </td> */}
          <td>
            <BannerTypeElement
              TYPE={item.type}
            />
          </td>
          <td>
            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
              {item.expires_at ? moment(item.expires_at).format('DD/MM/YYYY') : 'Không thời hạn'}
            </span>
          </td>
          <td>
            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
              Tất cả
            </span>
          </td>
          <td>
            <div className='d-flex justify-content-end flex-shrink-0'>
              {
                // METHOD?.includes("UPDATE") &&
                <Link
                  to={{
                    pathname: `/pages/banners-form/${item.id}`,
                  }}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </Link>
              }
              <button
                onClick={() => mutate(item.id)} disabled={isLoading}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
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
        </SortableItem>
      ))}
    </SortableList>
  )
}

