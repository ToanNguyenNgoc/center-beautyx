import { IBanner } from 'app/interface/banner';
import { IRoot } from 'app/redux/interface';
import { onSortTableBanners } from 'app/redux/setup-home';
import { arrayMoveImmutable } from 'array-move';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortableElementProps,
    SortableHandle
} from 'react-sortable-hoc';
import directRoute from 'app/routing/DirectRoute';
import style from './cpn-right.module.scss'
import { useNavigate } from 'react-router-dom';

export function RightBanner() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { banners } = useSelector((state: IRoot) => state.HOME_SETUP)
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        dispatch(onSortTableBanners(arrayMoveImmutable(banners, oldIndex, newIndex)))
    }
    return (
        <div className={style.container}>
            <span className={style.title}>
                Chỉnh sửa Banners
            </span>
            <table className={style.body}>
                <SortableList
                    lockAxis="y"
                    lockToContainerEdges={true}
                    useDragHandle
                    onSortEnd={onSortEnd}
                >
                    {
                        banners.map((item: IBanner, index: number) => (
                            <SortableItem
                                key={`item-${index}`}
                                index={index} className="item"
                            >
                                <td className={style.banner_item_cnt}>
                                    <div className={style.banner_item}>
                                        <DndTrigger>
                                            <div className={style.banner_item_trigger}>
                                                <img src={item.imageURL} className={style.banner_item_img} alt="" />
                                                <div className={style.banner_item_control}>
                                                    <div className="btn btn-icon btn-primary">
                                                        <i className="bi bi-arrow-bar-up"></i>
                                                    </div>
                                                    <button
                                                        onClick={() => navigate(directRoute.BANNERS_FORM_EDIT(item.id))}
                                                        className="btn btn-icon btn-primary"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-icon btn-danger">
                                                        <i className="bi bi-trash3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </DndTrigger>
                                    </div>
                                </td>
                            </SortableItem>
                        ))
                    }
                </SortableList>
                <button onClick={() => navigate(directRoute.BANNERS_FORM)} className={style.banner_add}>
                    <i className="bi bi-file-plus fs-2qx"></i>
                    <span>Thêm mới Banners</span>
                </button>
            </table>
        </div>
    );
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