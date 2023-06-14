import React from 'react';
import { LoadingButton } from '@mui/lab'
import style from './x-button.module.scss'

interface XButtonProps {
    className?: string,
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    onClick?: () => void,
    title?: string,
    type?: 'button' | 'submit',
    loading?: boolean,
    icon?: any,
    variant?: 'text' | 'outlined' | 'contained',
    disable?:boolean
}

export function XButton(props: XButtonProps) {
    const { className, color, onClick, title, type, loading, icon, variant, disable } = props
    const onClickBtn = () => onClick && onClick()
    let ICON = <></>
    if (typeof icon === 'string') ICON = <img src={icon} alt="" />
    if (typeof icon !== 'string') ICON = icon
    return (
        <div className={className ? `${style.container} ${className}` : `${style.container}`}>
            <LoadingButton
                onClick={onClickBtn}
                variant={variant ?? "contained"}
                loading={loading ?? false}
                disabled={loading || disable}
                type={type ?? "button"}
                color={color ?? "primary"}
                startIcon={
                    loading ? <></> : ICON
                }
                size="medium"
            >
                {title}
            </LoadingButton>
        </div>
    );
}