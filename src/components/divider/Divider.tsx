import React, {CSSProperties} from 'react';
import {Dividerstyle} from "./divider.style";

interface IProps {
    children: React.ReactNode,
    style?: CSSProperties,
    lineStyle?: CSSProperties,
    textStyle?: CSSProperties
}
export default function Divider(props:IProps) {
    return (
        <Dividerstyle className={"font10"} style={props.style}>
            <span className={"line"} style={props.lineStyle}></span>
            <span className={"text"} style={props.textStyle}>{props.children}</span>
            <span className={"line"} style={props.lineStyle}></span>
        </Dividerstyle>
    )
}
