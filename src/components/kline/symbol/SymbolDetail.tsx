import React, {useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, Content, Explain, SymbolDetailStyle, Title} from './SymbolDetail.style';
import useExchangeStore from "../../../views/exchange/ExchangeProvider";
import {useThemeManager} from "../../../hooks/useThemeManager";

export default function SymbolDetail() {
    const {t} = useTranslation();
    const [ reducerState ] = useExchangeStore();
    const {isDark} = useThemeManager();
    const tradeCoin = reducerState.currentPair.tradeCoin || {};

    return (
        <SymbolDetailStyle className={"flex-box"}>
            <div style={{width: "464px"}}>
                <Title className={"flex-row"}>
                    <img src={tradeCoin.icon} className={"icon"} alt=""/>
                    <span>{tradeCoin.name}</span>
                </Title>
                <Content>{tradeCoin.coinInfo}</Content>
                {/*<Content>{t(`Bitcoin is a decentralized digital currency. without a central bank or single administrator that can be sent from user to user on a peer-to-peer bitcoin network without the need for intermediaries.`)}</Content>*/}
                {/*<Explain>{t(`Transactions are verified by network nodes throughcryptography and recorded in a public distributed ledger called a blockchain. Bitcoins are created as a reward for the processknow as mining. They can be exchanged for other currencies, products and services.`)}</Explain>*/}
                <ButtonGroup className={"flex-row"}>
                    <a href={tradeCoin.whitePaperUrl} className={`btnItem flex-row ${isDark?'':'light'}`} target={"_blank"}>
                        <span>{t(`Whitepaper`)}</span>
                        <img src={require("src/assets/images/arrow-right-bottom.png")} className={"icon"} alt=""/>
                    </a>
                    <a href={tradeCoin.websiteUrl} className={`btnItem flex-row ${isDark?'':'light'}`} target={"_blank"}>
                        <span>{t(`Website`)}</span>
                        <img src={require("src/assets/images/arrow-right-bottom.png")} className={"icon"} alt=""/>
                    </a>
                </ButtonGroup>
            </div>
        </SymbolDetailStyle>
    )
}
