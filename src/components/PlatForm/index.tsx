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
                return <li className='plat-form-item'>
                    {platForm}{element}
                </li>;
            case PLAT_FORM.BEAUTYX_MOBILE:
                return <li className='plat-form-item' style={{ backgroundColor: "var(--beautyx-mb)" }} >
                    {platForm}{element}
                </li>
            case PLAT_FORM.MOMO:
                return <li className='plat-form-item' style={{ backgroundColor: "var(--momo)" }}>
                    {platForm}{element}
                </li>
            case PLAT_FORM.MBBANK:
                return <li className='plat-form-item' style={{ backgroundColor: "var(--bs-green)" }}>
                    {platForm}{element}
                </li>
            case PLAT_FORM.TIKI:
                return <li className='plat-form-item' style={{ backgroundColor: "var(--tiki)" }}>
                    {platForm}{element}
                </li>
            case PLAT_FORM.SHOPEE:
                return <li className='plat-form-item' style={{ backgroundColor: "var(--orange)" }}>
                    SHOPEE
                </li>
            case PLAT_FORM.VNID:
                return <li className='plat-form-item' style={{ backgroundColor: "#DC2222" }}>
                    VINID
                </li>
            default:
                return <li className='plat-form-item'>
                    Tất cả{element}
                </li>;

        }
    }
    return (
        <>
            {onCheckPlatForm()}
        </>
    );
}

export default FlatFormOrder;