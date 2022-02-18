import React from 'react';
import { RiseIconStyle } from './RiseIcon.style';

type IProps = {
    className: string
}
export default function RiseIcon(props: IProps) {

    return (
        <RiseIconStyle className={props.className}>

        </RiseIconStyle>
    )
}
