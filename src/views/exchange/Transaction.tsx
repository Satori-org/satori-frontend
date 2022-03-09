import React from 'react';
import { useTranslation } from 'react-i18next';
import {BookContent, LabelBox, ListContainer, Row, RowContainer} from "./styles/Book.style";
import {ITrade} from "src/ajax/contract/contract";
import useExchangeStore from "./ExchangeProvider";
import {formatUSDT} from "../../common/utilTools";

type IProps = {
    data: ITrade[]
}
export default function Transaction(props: IProps) {
    const {t} = useTranslation();
    const [reducerState] = useExchangeStore();

    return (
        <ListContainer className={"scrollbar font10"}>
            <LabelBox>
                <span className={"labelItem"}>{t(`PRICE`)}(USDT)</span>
                <span className={"labelItem"}>{t(`AMOUNT`)}({reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol})</span>
                <span className={"labelItem"}>{t(`TIME`)}</span>
            </LabelBox>
            <BookContent>
                <RowContainer className={"scrollbar"} style={{height: "calc(100% - 36px)", overflowY: "initial"}}>
                    {
                        props.data.map((item, index) => {
                            return <Row key={index}>
                                <span className={`${item.isLong ? 'long' : 'short'}`}>{formatUSDT(item.price)}</span>
                                <span>{item.quantity}</span>
                                <span>{item.time}</span>
                            </Row>
                        })
                    }
                </RowContainer>
            </BookContent>
        </ListContainer>
    )
}
