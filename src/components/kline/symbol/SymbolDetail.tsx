import React from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, Content, Explain, SymbolDetailStyle, Title} from './SymbolDetail.style';

export default function SymbolDetail() {
    const {t} = useTranslation();

    return (
        <SymbolDetailStyle className={"flex-box"}>
            <div style={{width: "464px"}}>
                <Title>
                    <img src={require("src/assets/images/symbol/BTC.png")} className={"icon"} alt=""/>
                    <span>Bitcoin</span>
                </Title>
                <Content>{t(`Bitcoin is a decentralized digital currency. without a central bank or single administrator that can be sent from user to user on a peer-to-peer bitcoin network without the need for intermediaries.`)}</Content>
                <Explain>{t(`Transactions are verified by network nodes throughcryptography and recorded in a public distributed ledger called a blockchain. Bitcoins are created as a reward for the processknow as mining. They can be exchanged for other currencies, products and services.`)}</Explain>
                <ButtonGroup className={"flex-row"}>
                    <a href="" className={"btnItem flex-row"}>
                        <span>{t(`Whitepaper`)}</span>
                        <img src={require("src/assets/images/arrow-right-bottom.png")} className={"icon"} alt=""/>
                    </a>
                    <a href="" className={"btnItem flex-row"}>
                        <span>{t(`Website`)}</span>
                        <img src={require("src/assets/images/arrow-right-bottom.png")} className={"icon"} alt=""/>
                    </a>
                </ButtonGroup>
            </div>
        </SymbolDetailStyle>
    )
}
