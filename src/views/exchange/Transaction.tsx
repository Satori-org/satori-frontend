import React from 'react';
import { useTranslation } from 'react-i18next';
import {BookContent, LabelBox, ListContainer, Row, RowContainer} from "./styles/Book.style";
import {ITrade} from "src/ajax/contract/contract";
import useExchangeStore from "./ExchangeProvider";

type IProps = {
    data: ITrade[]
}
export default function Transaction(props: IProps) {
    const {t} = useTranslation();
    const [reducerState] = useExchangeStore();

    return (
        <ListContainer className={"scrollbar"}>
            <LabelBox>
                <span className={"labelItem"}>{t(`Price`)}(USDT)</span>
                <span className={"labelItem"}>{t(`Amount`)}({reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol})</span>
                <span className={"labelItem"}>{t(`Time`)}</span>
            </LabelBox>
            <BookContent>
                <RowContainer className={"scrollbar"} style={{height: "calc(100% - 36px)", overflowY: "initial"}}>
                    {
                        props.data.map((item, index) => {
                            return <Row key={index}>
                                <span className={`${item.isLong ? 'long' : 'short'}`}>{item.price}</span>
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
