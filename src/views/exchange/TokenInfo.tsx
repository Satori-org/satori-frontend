import React, {useEffect, useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {TokenData, TokenInfoStyle} from './styles/TokenInfo.style';
import Setting from "./Setting";
import {ICustomerToken} from "./useCustomerTokenInfo";
import TokenList from "./TokenList";
import useExchangeStore from "./ExchangeProvider";
import {fixedNumberStr, formatDuring} from "src/common/utilTools";
import {useEffectState} from "src/hooks/useEffectState";
import SplitNumber from "../../components/splitNumber/SplitNumber";
import {USDT_decimal_show} from "../../config";
import RiseIcon from "../../components/riseIcon/RiseIcon";

export default function TokenInfo() {
    const {t} = useTranslation();
    const [customerToken, setCustomerToken] = useState<ICustomerToken[]>([]);
    const [ reducerState ] = useExchangeStore();
    const decimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;
    const state = useEffectState({
        subTime: 0
    });

    let timer:NodeJS.Timeout;
    useEffect(() => {
        clearTimeout(timer);
        let duringTime = getDuringTime();
        computedTime(duringTime);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    function getDuringTime() {
        let currentTime = new Date().getTime();
        let originDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
        let a = originDate.setHours(8);
        let b = originDate.setHours(16);
        let c = originDate.setHours(24);

        if (a >= currentTime) {
            return a - currentTime;
        } else if(b >= currentTime) {
            return b - currentTime;
        } else {
            return c - currentTime;
        }
    }

    function computedTime(duringTime: number) {
        //let result = duringTime - new Date().getTime();
        if (duringTime >= 1000) {
            state.subTime = duringTime - 1000;
            timer = setTimeout(() => {
                computedTime(state.subTime);
            }, 1000);
            //console.log(new Date(props.endTime).toLocaleString())
        } else {
            state.subTime = 0;
        }
    }

    const isRise = useMemo(() => {
        return reducerState.tiker.close >= reducerState.tiker.open;
    }, [reducerState.tiker]);
    const rise = useMemo(() => {
        let obj = {
            className: "",
            dotal: ""
        };
        if (reducerState.market24Data.changeRate > 0) {
            obj = {
                className: "long",
                dotal: "+"
            }
        } else if(reducerState.market24Data.changeRate < 0) {
            obj = {
                className: "short",
                dotal: ""
            }
        }
        return obj;
    }, [reducerState.market24Data]);


    return (
        <TokenInfoStyle className={"flex-row"}>
            <TokenList />
            {/*<Hr />*/}
            <TokenData className={"flex-row font14 scrollbar"}>
                {/*<Price>{ fixedNumber(reducerState.marketPrice, decimal)}</Price>*/}
                {/*<Price className={`${isRise ? 'long' : 'short'}`}>{reducerState.tiker.close || "0"}</Price>*/}
                <div className={"dataGroup"}>
                    <p className={"label font10"}>{t(`24H CHANGE`)}</p>
                    <p className={`flex-row ${rise.className}`}>
                       {/* {rise.dotal}*/}
                        <RiseIcon className={`${rise.className}`} />
                        <span>{reducerState.market24Data.changePrice || "-"}({reducerState.market24Data.changeRate || "-"}%)</span>
                    </p>
                </div>
                <div className={"dataGroup"}>
                    <span className={"label border"}>{t(`MARK PRICE`)}</span>
                    {/*<p>{reducerState.marketPrice || "0"}</p>*/}
                    <SplitNumber value={fixedNumberStr(reducerState.marketPrice, USDT_decimal_show)} />
                </div>
                <div className={"dataGroup"}>
                    <span className={"label border"}>{t(`ORACLE PRICE`)}</span>
                    {/*<p>{reducerState.market24Data.indexPrice || "0"}</p>*/}
                    <SplitNumber value={fixedNumberStr(reducerState.market24Data.indexPrice, USDT_decimal_show)} />
                </div>
                <div className={"dataGroup"} style={{minWidth: "1.4rem"}}>
                    <p className={"label"}>{t(`NEXT FUNDING`)}</p>
                    <p>{reducerState.market24Data.tariffRate || "0"}% {formatDuring(state.subTime)}</p>
                </div>
                {
                    customerToken.filter((item) => item.show).map((item, index) => {
                        return <div className={"dataGroup"} key={index}>
                            <p className={"label"}>{item.text}</p>
                            {/*<p>{item.value}</p>*/}
                            <SplitNumber value={item.value} />
                        </div>
                    })
                }
            </TokenData>
            <Setting symbol={reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol}
                     onChange={(customerTokens) => setCustomerToken(customerTokens)} />
        </TokenInfoStyle>
    )
}
