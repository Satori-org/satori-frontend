import React, {CSSProperties} from 'react';
import {LoadingMask, LoadingSpinner} from './loading.style';

interface IProps {
    inline?: boolean
    area?:boolean,
    color?:string,
    width?:string,
    style?: CSSProperties
}
export default function Loading(props:IProps) {
    return (
        <LoadingMask className={`${props.inline?'inline':''}`} style={props.style}>
            <LoadingSpinner className={`${props.inline?'inline':''}`}>
                <svg viewBox="25 25 50 50" className={'circular'}>
                    <circle cx="50" cy="50" r={props.width || "20"} fill="none" className={'path'} style={{stroke: props.color}}></circle>
                </svg>
            </LoadingSpinner>
        </LoadingMask>
    )
}
