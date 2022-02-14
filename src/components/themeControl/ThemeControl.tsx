import React, {CSSProperties} from 'react';
import { ThemeControlStyle } from './ThemeControl.style';
import {useThemeManager} from "../../hooks/useThemeManager";

type IProps = {
    className?: string
    iconClassName?: string
    style?: CSSProperties
    iconStyle?: CSSProperties
}
export default function ThemeControl(props: IProps) {
    const {toggleTheme, isDark} = useThemeManager();

    return (
        <ThemeControlStyle className={`flex-box borderRadius ${props.className}`} style={props.style} onClick={toggleTheme}>
            <img src={isDark?require("src/assets/images/light.png"):require("src/assets/images/dark.png")} className={`icon ${props.iconClassName}`} style={props.iconStyle} alt=""/>
        </ThemeControlStyle>
    )
}
