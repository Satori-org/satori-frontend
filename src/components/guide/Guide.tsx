import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { GuideStyle } from './Guide.style';
import {useThemeManager} from "../../hooks/useThemeManager";

type IProps = {
    className?: string
    iconClassName?: string
    style?: CSSProperties
    iconStyle?: CSSProperties
}
export default function Guide(props: IProps) {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();

    return (
        <GuideStyle className={`flex-box ${props.className}`} style={props.style}>
            <img src={isDark?require("src/assets/images/dark/video-circle.png"):require("src/assets/images/light/video-circle.png")} className={`icon ${props.iconClassName}`} style={props.iconStyle} alt=""/>
            <span>{t(`Getting started guide`)}</span>
        </GuideStyle>
    )
}
