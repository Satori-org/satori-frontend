import {useEffect} from "react";
import {useEffectState} from "./useEffectState";
import {useFetchPostArr} from "../ajax";
import {
    IKline,
    IMarket24,
    IMarketData,
    IQuotation,
    ISocketRes,
    ITrade,
    selectKlinePillarList
} from "../ajax/contract/contract";
import {IDepthData} from "../components/kline/depthChart/DepthChart";
import {IAccountInfo, Idata} from "../components/kline/Kline";
import {useWebsocket} from "./useWebsocket";
import {isEmptyObject} from "../common/utilTools";
import {socketURL} from "../config";

export function useKlineControll(contractPairId: number, period: string, token: string) {
    const state = useEffectState({
        kData: [] as IKline[],
        depthData: {asks: [], bids: []} as IDepthData,
        ticker: {} as Idata,
        tradeData: [] as ITrade[],
        marketPrice: undefined,
        token: token,
        accountInfo: {} as IAccountInfo,
        market24Data: {} as IMarket24,
        quotation: [] as IQuotation[]
    });
    const { data } = useFetchPostArr<IKline>(
        selectKlinePillarList,
        { contractPairId: contractPairId, period: period, limit: 1000 } ,
        [contractPairId, period]
    );
    const socketData = useWebsocket<ISocketRes>({url: socketURL, event: "kline", params: {contractPairId, period}, token: token}, [contractPairId, period]);
    //const socketData2 = useWebsocket<ISocketRes<IMarketData>>({url: "ws://13.212.74.68:8888/market/ws", params: ["market-kline", contractPairId, "1MIN"]}, [contractPairId, period]);
    /*useEffect(() => {
        if (token && socket) {
            socket.send(JSON.stringify({
                "method": "UNSUBSCRIBE",
                "event": "contract_account",
                "token": state.token
            }))
            socket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "event": "contract_account",
                "token": token
            }));
            state.token = token
        }
    }, [token, socket, state.token]);*/
    useEffect(() => {
       // state.ticker = {} as Idata;
    }, [contractPairId, period]);
    useEffect(() => {
        if (!token && !isEmptyObject(state.accountInfo)) {
            state.accountInfo = {} as IAccountInfo;
        }
    }, [token, state.accountInfo]);
    useEffect(() => {
        state.kData = data.concat().reverse();
        if (state.kData.length > 0) {
            state.ticker = tickerMap(data[0]);
        }
    }, [data, contractPairId]);

    function tickerMap(klineItem: IKline) {
        return {
            time: klineItem.time,
            open: klineItem.open,
            high: klineItem.hight,
            low: klineItem.low,
            close: klineItem.close,
            volume: klineItem.quantity
        }
    }


    useEffect(() => {
        if (socketData && socketData.success) {
            let resData = socketData.data;

            switch (socketData.event) {
                case "depth":
                    state.depthData = resData;
                    break;
                case "trade":
                    state.tradeData = resData;
                    break;
                case "kline":
                    if (state.kData.length > 0) {
                        let ticker: IKline = resData;
                        console.log("resData", resData)
                        state.ticker = tickerMap(ticker);
                    }
                    break;
                case "market-latest-price":
                    state.marketPrice = resData;
                    break;
                case "contract_account":
                    state.accountInfo = resData;
                    break;
                case "market_24hour":
                    state.market24Data = resData;
                    break;
                case "contract_pair_quote":
                    state.quotation = resData;
                    break;
            }
        }
    }, [socketData, state.kData]);
    /* market Price */
    /*useEffect(() => {
        if (socketData2 && socketData2.params) {
            let resData = socketData2.params[1];
            if (socketData2.params[0] === "market-kline") {
                state.marketData = resData;
            }
        }
    }, [socketData2]);*/

    return {
        KData: state.kData,
        depthData: state.depthData,
        ticker: state.ticker,
        tradeData: state.tradeData,
        marketPrice: state.marketPrice,
        accountInfo: state.accountInfo,
        market24Data: state.market24Data,
        quotation: state.quotation
    }
}
