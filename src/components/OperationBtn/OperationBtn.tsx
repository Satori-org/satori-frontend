import React, {CSSProperties, ReactNode} from 'react';
import { useTranslation } from 'react-i18next';
import { OperationBtnStyle } from './OperationBtn.style';

type IProp = {
    style?: CSSProperties
    children?: ReactNode
}
export default function OperationBtn(props: IProp) {
    const {t} = useTranslation();

    return (
        <OperationBtnStyle style={props.style}>{props.children}</OperationBtnStyle>
    )
}
