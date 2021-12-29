import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettlementModalStyle } from './styles/SettlementModal.style';

export default function SettlementModal() {
    const {t} = useTranslation();

    return (
        <SettlementModalStyle className={"flex-box"}>
            <img src={require("src/assets/images/icon_settlement@2x.png")} className={"icon"} alt=""/>
            <div>{t(`Capital fee settlement is in progress`)}</div>
            <div>{t(`Unable to transact`)}...</div>
        </SettlementModalStyle>
    )
}
