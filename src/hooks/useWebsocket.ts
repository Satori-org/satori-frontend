import {useEffect, useRef, useState} from "react";
import {IKline} from "../ajax/contract/contract";
import {useEffectState} from "./useEffectState";
import {useUpdateEffect} from "ahooks";

type IParams = {
    url: string
    method?: string
    event: string
    params: object,
    token: string
}
export function useWebsocket<T = any>(config: IParams, require: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    //const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(config.token);
    // const [cfdSocket, setCfdSocket] = useState<WebSocket | null>(null);
    const method = config.method || "SUBSCRIBE";
    //const params = config.params || [];
    // const dd = useRef();
    // dd.current
    const state = useEffectState({
        cfdSocket: null as WebSocket | null,
        params: config.params
    });

    //let cfdSocket: WebSocket | null = null;
    useEffect(() => {
        /*if (require.every((item) => !!item)) {
        }*/
        initWebSocket();
        return () => {
            if (state.cfdSocket) {
                state.cfdSocket.onclose = null;
                state.cfdSocket.close();
            }
        }
    }, []);

    useUpdateEffect(() => {
        /*unsubscribe(config.event);*/
        if (state.cfdSocket) {
            subscribe(config.event, config.params);
        }
    }, [...require, state.cfdSocket]);

    useEffect(() => {
        if (config.token && state.cfdSocket) {
            getTokenData(config.token);
        }
        setToken(config.token);
    }, [config.token, token, state.cfdSocket]);

    function getTokenData(currentToken: string) {
        /*unsubscribe("contract_account");*/
        subscribe("contract_account", {"token": currentToken});

        /*state.cfdSocket!.send(JSON.stringify({
            "method": "UNSUBSCRIBE",
            "event": "contract_account",
            "token": token
        }))
        state.cfdSocket!.send(JSON.stringify({
            "method": method,
            "event": "contract_account",
            "token": currentToken
        }))*/
    }

    async function initWebSocket() {
        let Socket = new WebSocket(config.url);

        Socket.onopen = function () {
            state.cfdSocket = Socket;
            //console.log("socket status:", cfdSocket!.OPEN)
            /*Socket!.send(JSON.stringify({
                "method": method,
                "event": config.event,
                ...config.params
            }))*/
            //subscribe(config.event, config.params);
            //getTokenData(token);

        };
        Socket.onclose = function () {
            setTimeout((err) => {
                initWebSocket();
            }, 3*1000);
        };
        Socket.onmessage = function (data) {
            let res = JSON.parse(data.data);
            setData(res);
        };
    }

    function unsubscribe(event: string) {
        if (state.cfdSocket) {
            state.cfdSocket.send(JSON.stringify({
                "method": "UNSUBSCRIBE",
                "event": event
            }))
        }
    }

    function subscribe(event: string, params: any) {
        if (state.cfdSocket) {
            state.cfdSocket.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "event": event,
                ...params
            }))
        }
    }

    return data;
}
