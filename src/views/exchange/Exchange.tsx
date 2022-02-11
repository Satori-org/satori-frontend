import React, {useEffect, useMemo, useReducer} from 'react';
import { ExchangeStyle } from './styles/Exchange.style';
import TokenInfo from "./TokenInfo";
import Book from "./Book";
import Record from "./Record";
import Trade from "./Trade";
import ContractDetail from "./ContractDetail";
import {exchangeActions, exchangeReducer, initExchangeState, mapExchangeDispatch} from "./exchangeReducer";
import {ExchangeContext} from "./ExchangeProvider";
import Kline, {Idata, Itime} from "src/components/kline/Kline";
import {useEffectState} from "src/hooks/useEffectState";
import {RESOLUTION_KEY, TRADINGVIEW_SETTING} from "./exchangeConfig";
import {useKlineControll} from "../../hooks/useKlineControll";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {IPair} from "../../ajax/contract/contract";
import {$router} from "../../react-router-perfect/Index";
import Toggle from 'src/components/toggle/Toggle';

export default function Exchange() {
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState, dispatch] = useReducer(exchangeReducer, initExchangeState);
    const mapDispatch = mapExchangeDispatch(dispatch);
    const state = useEffectState({
        KData: [] as Idata[],
        ticker: {} as Idata,
        depthData: {asks: [], bids: []},
    });
    /* 当前选择的交易对 */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.currentPair]);*/

    useEffect(() => {
        if (!$router.query.pairId) {
            const cachePair = JSON.parse(localStorage.getItem("pair") || "{}") as IPair;
            mapDispatch.setCurrentPair(cachePair)
        }
    }, []);

    const { KData, depthData, ticker, tradeData, marketPrice, accountInfo, market24Data, quotation } = useKlineControll(reducerState.currentPair.id, reducerState.resolutionData.value, storeData.token);
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
    useEffect(() => {
        dispatch({
            type: exchangeActions.SET_ACCOUNTINFO,
            data: accountInfo
        })
    }, [accountInfo]);
    useEffect(() => {
        dispatch({
            type: exchangeActions.SET_MARKET24,
            data: market24Data
        })
    }, [market24Data]);
    useEffect(() => {
        dispatch({
            type: exchangeActions.SET_MARKET_PRICE,
            data: marketPrice
        })
    }, [marketPrice]);
    useEffect(() => {
        dispatch({
            type: exchangeActions.SET_TICKER,
            data: ticker
        })
    }, [ticker]);
    useEffect(() => {
        dispatch({
            type: exchangeActions.set_quotation,
            data: quotation
        })
    }, [quotation]);


    function saveChartData(data:any) {
        //localStorage.setItem("tradingview-cfd-settings", JSON.stringify(data))
    }

    return (
        <ExchangeContext.Provider value={[reducerState, dispatch]}>
            <ExchangeStyle>
                <TokenInfo />
                <div className={"trade-box"}>
                    <div style={{height: "100%"}}>
                        <Toggle vIf={!!reducerState.currentPair.symbol}>
                            <Kline symbol={reducerState.currentPair.symbol}
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
                        </Toggle>
                    </div>
                    <Book depthData={depthData} tradeData={tradeData} />
                    <Trade longPrice={depthData.bids[0] && depthData.bids[0].price}
                           shortPrice={depthData.asks[0] && depthData.asks[0].price} />
                </div>
                <div className={"bottom-box"}>
                    <Record />
                    <ContractDetail />
                </div>
            </ExchangeStyle>
        </ExchangeContext.Provider>
    )
}
