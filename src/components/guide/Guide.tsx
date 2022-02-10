import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { GuideStyle } from './Guide.style';

type IProps = {
    className?: string
    iconClassName?: string
    style?: CSSProperties
    iconStyle?: CSSProperties
}
export default function Guide(props: IProps) {
    const {t} = useTranslation();

    return (
        <GuideStyle className={`flex-box ${props.className}`} style={props.style}>
            <img src={require("src/assets/images/video-circle.png")} className={`icon ${props.iconClassName}`} style={props.iconStyle} alt=""/>
            <span>{t(`Getting guide`)}</span>
        </GuideStyle>
    )
}
