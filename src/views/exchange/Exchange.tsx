import React from 'react';
import { ExchangeStyle } from './styles/Exchange.style';
import TokenInfo from "./TokenInfo";
import Book from "./Book";
import Record from "./Record";
import Trade from "./Trade";
import ContractDetail from "./ContractDetail";

export default function Exchange() {

    return (
        <ExchangeStyle>
            <div className={"left"}>
                <TokenInfo />
                <div style={{height: "595px", gridColumnStart: "1", gridColumnEnd: "3", background: "gray"}}></div>
                <Book />
                <Record />
            </div>
            <div className={"right"}>
                <Trade />
                <ContractDetail />
            </div>
        </ExchangeStyle>
    )
}
