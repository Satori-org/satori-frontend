import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {BookContent, BookStyle, LabelBox, ListContainer, Row, RowContainer, Spread} from "./styles/Book.style";
import {IDepthData, IDepthItem} from "../../components/kline/depthChart/DepthChart";
import {fixedNumber, fixedNumberStr, formatNumber, formatUSDT} from "../../common/utilTools";
import Decimal from "decimal.js";
import useExchangeStore from "./ExchangeProvider";
import {USER_SELECT_PRICE} from "../../common/PubSubEvents";
import Toggle from "../../components/toggle/Toggle";
import {USDT_decimal_show} from "../../config";
//import { OrderBookStyle } from './styles/Book.style';

type IProps = {
    data: IDepthData
}
export default function OrderBook(props: IProps) {
    const {t} = useTranslation();
    const [reducerState] = useExchangeStore();
    const decimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;

    const asksMap = useMemo(() => {
        return buildArr(props.data.asks);
    }, [props.data.asks]);

    const bidsMap = useMemo(() => {
        return buildArr(props.data.bids);
    }, [props.data.bids]);

    /*const isRise = useMemo(() => {
        /!*if (!reducerState.tiker || !reducerState.tiker.close) {
            return "";
        }
        return reducerState.tiker.close > reducerState.tiker.open ? 'long' : 'short';*!/
        return reducerState.tiker.close >= reducerState.tiker.open;
    }, [reducerState.tiker]);*/

    const rise = useMemo(() => {
        let obj = {
            className: "",
            dotal: ""
        };
        if (reducerState.tiker.close > reducerState.tiker.open) {
            obj = {
                className: "long",
                dotal: "+"
            }
        } else if(reducerState.tiker.close < reducerState.tiker.open) {
            obj = {
                className: "short",
                dotal: ""
            }
        }
        return obj;
    }, [reducerState.market24Data]);


    function buildArr(list: IDepthItem[]) {
        let arr = list.concat();
        let sum = "0";
        let mapArr = arr.map((item) => {
            sum = Decimal.add(sum, item.quantity).toFixed();
            return {
                ...item,
                sum: sum
            };
        });
        return mapArr;
    }

    function publishSelectedPrice(price: string) {
        PubSub.publish(USER_SELECT_PRICE, price)
    }

    return (
        <ListContainer>
            <LabelBox className={"font10"}>
                <span className={"labelItem"}>{t(`PRICE`)}(USDT)</span>
                <span
                    className={"labelItem"}>{t(`SIZE`)}({reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol})</span>
                <span
                    className={"labelItem"}>{t(`SUM`)}({reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol})</span>
            </LabelBox>
            <BookContent>
                <RowContainer className={"reverse"} style={{flexShrink: 0, flex: 1}}>
                    {
                        asksMap.concat().reverse().map((item, index) => {
                            return <Row style={{cursor: "pointer"}} key={index}
                                        onClick={() => publishSelectedPrice(item.price)}>
                                <span className={"short"}>{formatUSDT(item.price)}</span>
                                <span>{item.quantity}</span>
                                <span>{fixedNumber(item.sum, decimal)}</span>
                            </Row>
                        })
                    }
                </RowContainer>
                <Spread className={"flex-row"}>
                    <span className={rise.className}>{formatUSDT(reducerState.tiker.close)}</span>
                    <Toggle vIf={!!rise.className}>
                        <img
                            src={rise.className === "long" ? require("src/assets/images/long_icon.png") : require("src/assets/images/short_icon.png")}
                            className={"arrow"} alt=""/>
                    </Toggle>
                    <span className={"marketPrice"}>{formatUSDT(reducerState.marketPrice)}</span>
                    {/*<span style={{color: colors.labelColor}}>0.1</span>
                    <span>0.01%</span>*/}
                </Spread>
                <RowContainer style={{flexShrink: 0, flex: 1}}>
                    {
                        bidsMap.map((item, index) => {
                            return <Row style={{cursor: "pointer"}} key={index}
                                        onClick={() => publishSelectedPrice(item.price)}>
                                <span className={"long"}>{formatUSDT(item.price)}</span>
                                <span>{item.quantity}</span>
                                <span>{fixedNumber(item.sum, decimal)}</span>
                            </Row>
                        })
                    }
                </RowContainer>
            </BookContent>
        </ListContainer>
    )
}
