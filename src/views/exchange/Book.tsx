import React, {useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {BookStyle, BookTab} from './styles/Book.style';
import OrderBook from "./OrderBook";
import Transaction from "./Transaction";
import {IDepthData} from "src/components/kline/depthChart/DepthChart";
import {ITrade} from "src/ajax/contract/contract";

type IProps = {
    depthData: IDepthData
    tradeData: ITrade[]
}
export default function Book(props: IProps) {
    const {t} = useTranslation();
    const [active, setActive] = useState(0);

    const OrderBookMemo = useMemo(() => {
        return <OrderBook data={props.depthData} />;
    }, [props.depthData]);

    const TransactionMemo = useMemo(() => {
        return <Transaction data={props.tradeData} />;
    }, [props.tradeData]);

    return (
        <BookStyle>
            <BookTab>
                <span className={`tabItem ${active === 0 ? 'active' : ''}`} onClick={() => setActive(0)}>{t(`OrderBook`)}</span>
                <span className={`tabItem ${active === 1 ? 'active' : ''}`} onClick={() => setActive(1)}>{t(`Transaction`)}</span>
            </BookTab>
            {
                active === 0 ?  OrderBookMemo : TransactionMemo
            }
        </BookStyle>
    )
}
