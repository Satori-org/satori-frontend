import React, {CSSProperties} from 'react';
import { ThemeControlStyle } from './ThemeControl.style';

type IProps = {
    className?: string
    iconClassName?: string
    style?: CSSProperties
    iconStyle?: CSSProperties
}
export default function ThemeControl(props: IProps) {
    return (
        <ThemeControlStyle className={`flex-box ${props.className}`} style={props.style}>
            <img src={require("src/assets/images/Group 296.png")} className={`icon ${props.iconClassName}`} style={props.iconStyle} alt=""/>
        </ThemeControlStyle>
    )
}
