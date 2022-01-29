import {useEffect} from "react";
import {useEffectState} from "./useEffectState";
import {useFetchPostArr} from "../ajax";
import {IKline, ITrade, selectKlinePillarList} from "../ajax/contract/contract";
import {IDepthData} from "../components/kline/depthChart/DepthChart";
import {Idata} from "../components/kline/Kline";

export function useKlineControll(contractPairId: number, period: string) {
    let cfdSocket: WebSocket;
    const state = useEffectState({
        kData: [] as IKline[],
        depthData: {asks: [], bids: []} as IDepthData,
        ticker: {} as Idata,
        tradeData: [] as ITrade[]
    });
    const { data } = useFetchPostArr<IKline>(
        selectKlinePillarList,
        { contractPairId: contractPairId, period: period, limit: 1000 } ,
        [contractPairId, period]
    );

    useEffect(() => {
        state.kData = data.reverse();
    }, [data]);


    useEffect(() => {
        if (contractPairId) {
            initWebSocket();
        }
        return () => {
            if (cfdSocket) {
                cfdSocket.onclose = null;
                cfdSocket.close();
            }
        }
    }, [contractPairId, period]);

    function initWebSocket() {
        let cfdSocket = new WebSocket("ws://13.212.74.68:8888/market/ws");

        cfdSocket.onopen = function () {
            cfdSocket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params": ["kline", contractPairId, period]
            }))
        };
        cfdSocket.onclose = function () {
            setTimeout((err) => {
                initWebSocket();
            }, 3*1000);
        };
        cfdSocket.onmessage = function (data) {
            let res = JSON.parse(data.data);
            if (res && res.params) {
                let resData = res.params[1];
                switch (res.params[0]) {
                    case "depth":
                        state.depthData = resData;
                        break;
                    case "trade":
                        state.tradeData = resData;
                        break;
                    case "kline":
                        if (state.kData.length > 0) {
                            let ticker: IKline = resData;
                            state.ticker = {
                                time: ticker.time,
                                open: ticker.open,
                                high: ticker.hight,
                                low: ticker.low,
                                close: ticker.close,
                                volume: ticker.quantity
                            };
                        }
                        break;
                }
            }
        };
    }

    return {
        KData: state.kData,
        depthData: state.depthData,
        ticker: state.ticker,
        tradeData: state.tradeData
    }
}
