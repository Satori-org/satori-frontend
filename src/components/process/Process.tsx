import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProcessStyle } from './Process.style';

type IProps = {
    percent: number
}
export default function Process(props: IProps) {
    const {t} = useTranslation();

    return (
        <ProcessStyle>
            <div className={"val"} style={{width: `${props.percent}%`}}></div>
        </ProcessStyle>
    )
}
