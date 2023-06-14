import React from 'react';
import style from './style.module.scss'

interface TextAreaProps {
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder?: string
}

export function TextArea(props: TextAreaProps) {
    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange && props.onChange(e)
    return (
        <textarea
            className={style.container}
            onChange={onTextChange}
            placeholder={props.placeholder ?? ""}
        />
    );
}