import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnchorStyle } from './styles/Anchor.style';

export default function Anchor() {
    const {t} = useTranslation();

    return (
        <AnchorStyle>
            <a className={"item active"}>合约介绍</a>
            <a className={"item"}>合约规则</a>
            <a className={"item"}>清算说明</a>
            <a className={"item"}>价格说明</a>
            <a className={"item"}>合同损失机制</a>
        </AnchorStyle>
    )
}
