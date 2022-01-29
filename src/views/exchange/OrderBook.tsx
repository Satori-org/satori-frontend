import React from 'react';
import { useTranslation } from 'react-i18next';
import {BookContent, BookStyle, LabelBox, ListContainer, Row, RowContainer, Spread} from "./styles/Book.style";
import {IDepthData} from "../../components/kline/depthChart/DepthChart";
import {fixedNumber} from "../../common/utilTools";
import Decimal from "decimal.js";
//import { OrderBookStyle } from './styles/Book.style';

type IProps = {
    data: IDepthData
}
export default function OrderBook(props: IProps) {
    const {t} = useTranslation();

    return (
        <ListContainer>
            <LabelBox>
                <span className={"labelItem"}>{t(`Price(USDT)`)}</span>
                <span className={"labelItem"}>{t(`Amount(BTC)`)}</span>
                <span className={"labelItem"}>{t(` Sum(BTC)`)}</span>
            </LabelBox>
            <BookContent>
                <RowContainer className={"reverse"}>
                    {
                        props.data.asks.concat().reverse().map((item, index) => {
                            return <Row key={index}>
                                <span className={"short"}>{item.price}</span>
                                <span>{item.quantity}</span>
                                <span>{fixedNumber(Decimal.mul(item.price, item.quantity).toFixed(), 4)}</span>
                            </Row>
                        })
                    }
                </RowContainer>
                <Spread>
                    <span>3565.145</span>
                    {/*<span style={{color: colors.labelColor}}>0.1</span>
                    <span>0.01%</span>*/}
                </Spread>
                <RowContainer>
                    {
                        props.data.bids.map((item, index) => {
                            return <Row key={index}>
                                <span className={"long"}>{item.price}</span>
                                <span>{item.quantity}</span>
                                <span>{fixedNumber(Decimal.mul(item.price, item.quantity).toFixed(), 4)}</span>
                            </Row>
                        })
                    }
                </RowContainer>
            </BookContent>
        </ListContainer>
    )
}
