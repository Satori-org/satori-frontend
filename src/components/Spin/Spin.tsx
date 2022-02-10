import React, {CSSProperties} from 'react';
import {Circular, LdsRipple, LoadingMask, LoadingSpinner, Path} from './Spin.style';

interface IProps {
    inline?: boolean
    area?:boolean,
    color?:string,
    width?:string,
    style?: CSSProperties
}
export default function Spin(props:IProps) {
    return (
        <LdsRipple>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </LdsRipple>
    )
}
