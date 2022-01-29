import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettlementModalStyle } from './styles/SettlementModal.style';

export default function SettlementModal() {
    const {t} = useTranslation();

    return (
        <SettlementModalStyle className={"flex-box"}>
            <img src={require("src/assets/images/icon_settlement@2x.png")} className={"icon"} alt=""/>
            <div>{t(`资金费结算中`)}</div>
            <div>{t(`无法进行交易`)}...</div>
        </SettlementModalStyle>
    )
}
