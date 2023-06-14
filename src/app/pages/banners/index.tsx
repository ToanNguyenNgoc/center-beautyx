/* eslint-disable react-hooks/exhaustive-deps */
// import Draggable from 'react-draggable';
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRoot } from "../../redux/interface";
import './style.scss';
import { STATUS } from "../../redux/status";
import { fetchAsyncBanner, onResetFormBanner, onSortTableBanner } from "../../redux/banner/bannerSlice";
import { IBanner } from "../../interface/banner";
import dragCustom from "../../util/draggableImport";
import { Link } from "react-router-dom";
import TitlePage from "../../../components/TitlePage";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortableElementProps,
    SortableHandle
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { formatDate } from "../../util/format";
import { BannerTypeElement } from "../../util/fileType";
import { useVerifyRoute } from "app/hooks";

function BannerWidget(props: any) {
    const { banner, status } = useSelector((state: IRoot) => state.BANNER);
    const banners: IBanner[] = banner.data;
    const bannerItemRef = useRef<any>();
    const dispatch = useDispatch();
    async function handleInitData() {
        dispatch(fetchAsyncBanner());
    }
    const { METHOD } = useVerifyRoute()
    useEffect(() => {
        (banner.totalItem <= 0 && status !== STATUS.SUCCESS) && handleInitData()
        dragCustom();
        dispatch(onResetFormBanner())
    }, [])

    return (
        <>
            <TitlePage
                element={
                    // METHOD?.includes("POST") ?
                        <Link
                            to={{ pathname: "/pages/banners-form" }}
                            className="btn btn-sm btn-primary"
                        >
                            Tạo mới
                        </Link>
                        // :
                        // <></>
                }
                title="Danh sách banners"
            />
            <div className="row g-5 gx-xxl-8 table-banner">
                <div ref={bannerItemRef} className={`card mb-5 mb-xl-8`}>
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
                                        <th className='min-w-140px'>Loại</th>
                                        <th className='min-w-140px'>Ngày hết hạn</th>
                                        <th className='min-w-140px'>Nền tảng</th>
                                        <th className='min-w-100px text-end'>Actions</th>
                                    </tr>
                                </thead>
                                {/* end::Table head */}
                                {/* begin::Table body */}
                                <SortableComponent
                                    banners={banners}
                                />
                                {/* end::Table body */}
                            </table>
                            {/* end::Table */}
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
const SortableComponent = (props: any) => {
    const { banners } = props;
    const dispatch = useDispatch();

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        dispatch(onSortTableBanner(arrayMoveImmutable(banners, oldIndex, newIndex)))
    }
    // const { METHOD } = useVerifyRoute()
    return (
        <SortableList
            lockAxis="y"
            lockToContainerEdges={true}
            useDragHandle
            onSortEnd={onSortEnd}

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
                    <td>
                        <BannerTypeElement
                            TYPE={item.type}
                        />
                    </td>
                    <td>
                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {"Không thời hạn"}
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
                </SortableItem>
            ))}
        </SortableList>
    )
}

