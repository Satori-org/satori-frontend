import React, {useEffect, useReducer} from 'react';
import { useTranslation } from 'react-i18next';
import Toggle from 'src/components/toggle/Toggle';
import {PanelStyle, TokenListStyle } from './styles/TokenList.style';
import {useEffectState} from "src/hooks/useEffectState";
import {getContractPairList} from "src/ajax/contract/contract";
import {exchangeActions} from "./exchangeReducer";
import useExchangeStore from "./ExchangeProvider";

export default function TokenList() {
    const {t} = useTranslation();
    const [ reducerState, dispath ] = useExchangeStore();

    const state = useEffectState({
        showPanel: false
    });

    useEffect(() => {
        getPairList();
    }, []);

    async function getPairList() {
        const pairs = await getContractPairList();
        console.log("=============")
        dispath({
            type: exchangeActions.SET_PAIR,
            data: pairs.data
        })
    }

    const list = [
        { symbol: "BTC/USDT", lastPrice: "48,409.09", "rise": "+19.08%" },
        { symbol: "ETH/USDT", lastPrice: "48,409.09", "rise": "+19.08%" },
        { symbol: "DOT/USDT", lastPrice: "48,409.09", "rise": "+19.08%" },
    ];

    return (
        <TokenListStyle className={"flex-box"}>
            <div className={"flex-row"} style={{cursor: "pointer", userSelect: "none"}} onClick={() => state.showPanel = !state.showPanel}>
                <span>BTC/USDT</span>
                <span className={`icon ${state.showPanel ? 'active' : ''}`}></span>
            </div>
            <Toggle vIf={state.showPanel}>
                <PanelStyle>
                    <table>
                        <thead>
                            <tr>
                                <th>{t(`Symbols`)}</th>
                                <th>{t(`Last Price`)}</th>
                                <th>{t(`24h%`)}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((item,index) => {
                                return <tr key={index}>
                                    <td>{item.symbol}</td>
                                    <td>
                                        <span className={"short"}>{item.lastPrice}</span>
                                    </td>
                                    <td>
                                        <span className={"long"}>{item.rise}</span>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </PanelStyle>
            </Toggle>
        </TokenListStyle>
    )
}
