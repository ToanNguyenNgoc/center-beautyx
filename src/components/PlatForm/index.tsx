import React from 'react';
import { PLAT_FORM } from '../../app/util/platForm';
import './style.scss'


interface IProps {
    platForm: string,
    element?: any
}

export const FlatFormOrder = (props: IProps) => {
    const { platForm, element } = props;
    const onCheckPlatForm = () => {
        switch (platForm) {
            case PLAT_FORM.BEAUTYX:
                return <span className='plat-form-item'>
                    {platForm}{element}
                </span>;
            case PLAT_FORM.BEAUTYX_MOBILE:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--beautyx-mb)" }} >
                    {platForm}{element}
                </span>
            case PLAT_FORM.MOMO:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--momo)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.MBBANK:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--bs-green)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.TIKI:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--tiki)" }}>
                    {platForm}{element}
                </span>
            case PLAT_FORM.SHOPEE:
                return <span className='plat-form-item' style={{ backgroundColor: "var(--orange)" }}>
                    SHOPEE
                </span>
            case PLAT_FORM.VINID:
                return <span className='plat-form-item' style={{ backgroundColor: "#DC2222" }}>
                    VINID
                </span>
            default:
                return <span className='plat-form-item'>
                    Tất cả{element}
                </span>;

        }
    }
    return (
        <>
            {onCheckPlatForm()}
        </>
    );
}

export default FlatFormOrder;