import React, {useEffect, useMemo, useReducer} from 'react';
import { ExchangeStyle } from './styles/Exchange.style';
import TokenInfo from "./TokenInfo";
import Book from "./Book";
import Record from "./Record";
import Trade from "./Trade";
import ContractDetail from "./ContractDetail";
import {exchangeActions, exchangeReducer, initExchangeState} from "./exchangeReducer";
import {ExchangeContext} from "./ExchangeProvider";
import Kline, {Idata, Itime} from "src/components/kline/Kline";
import {useCurrentPairInfo} from "src/hooks/useCurrentPairInfo";
import {useEffectState} from "src/hooks/useEffectState";
import {RESOLUTION_KEY, TRADINGVIEW_SETTING} from "./exchangeConfig";
import {useKlineControll} from "../../hooks/useKlineControll";

export default function Exchange() {
    const [reducerState, dispatch] = useReducer(exchangeReducer, initExchangeState);
    const state = useEffectState({
        KData: [] as Idata[],
        ticker: {} as Idata,
        depthData: {asks: [], bids: []},
    });
    /* 当前选择的交易对 */
    const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);

    const { KData, depthData, ticker, tradeData } = useKlineControll(pairInfo.id, reducerState.resolutionData.value);
    const klineData: Idata[] = useMemo(() => {
        return KData.map((item) => {
            return {
                time: item.time,
                open: item.open,
                high: item.hight,
                low: item.low,
                close: item.close,
                volume: item.quantity
            }
        })
    }, [KData]);


    function saveChartData(data:any) {
        //localStorage.setItem("tradingview-cfd-settings", JSON.stringify(data))
    }

    return (
        <ExchangeContext.Provider value={[reducerState, dispatch]}>
            <ExchangeStyle>
                <div className={"left"}>
                    <TokenInfo />
                    <div style={{height: "595px", gridColumnStart: "1", gridColumnEnd: "3"}}>
                        <Kline symbol={pairInfo && pairInfo.symbol || "BTC-USDT"}
                               kData={klineData}
                               ticker={ticker}
                               amountPrecision={"0"}
                               depthData={depthData}
                               resolution={reducerState.resolutionData.resolution}
                               resolutionData={reducerState.resolutionData}
                               saveChartData={saveChartData}
                               localResolutionKey={RESOLUTION_KEY}
                               localDataKey={TRADINGVIEW_SETTING}
                               changeResolution={(item:Itime) => {
                                   dispatch({
                                       type: exchangeActions.SET_RESOLUTION_DATA,
                                       data: item
                                   })
                               }}>
                        </Kline>
                    </div>
                    <Book depthData={depthData} tradeData={tradeData} />
                    <Record />
                </div>
                <div className={"right"}>
                    <Trade />
                    <ContractDetail />
                </div>
            </ExchangeStyle>
        </ExchangeContext.Provider>
    )
}
