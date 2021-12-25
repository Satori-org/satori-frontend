import React, {CSSProperties} from 'react';
import {LdsRipple} from './loading.style';

interface IProps {
    inline?: boolean
    area?:boolean,
    color?:string,
    width?:string,
    style?: CSSProperties
}
export default function Loading(props:IProps) {
    return (
        <LdsRipple num={12}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </LdsRipple>
    )
}
