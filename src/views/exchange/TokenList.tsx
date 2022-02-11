import React, {CSSProperties, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import Toggle from 'src/components/toggle/Toggle';
import {PanelStyle, TokenListStyle } from './styles/TokenList.style';
import {useEffectState} from "src/hooks/useEffectState";
import {getContractPairList, IPair, IQuotation} from "src/ajax/contract/contract";
import {exchangeActions, mapExchangeDispatch} from "./exchangeReducer";
import useExchangeStore from "./ExchangeProvider";
import {$router} from "../../react-router-perfect/Index";
import {fixedNumber, formatAmount, formatAmountRise} from "../../common/utilTools";
import {Price} from "./styles/TokenInfo.style";
import {useThemeManager} from "../../hooks/useThemeManager";


type IPairRow = {
    data: IPair,
    onChange(): void
}
function PairRow(props: IPairRow) {
    const [ reducerState, dispath ] = useExchangeStore();

    const pairQuotation = useMemo(() => {
        let obj = reducerState.quotation.find((item) => {
            return item.contractPairId === props.data.id;
        });

        return obj || {} as IQuotation;
    }, [reducerState.quotation, props.data.id]);

    const rowClassName = useMemo(() => {
        let rate = Number(pairQuotation.marketChangeRate);
        if (!pairQuotation.marketChangeRate || rate === 0) {
            return "";
        }
        return rate > 0 ? 'long' : 'short';
    }, [pairQuotation]);

    const tdStyle: CSSProperties = {
        verticalAlign: "top",
        lineHeight: "24px",
        fontSize: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
    };

    return <tr key={props.data.id} onClick={() => props.onChange()}>
        <td style={tdStyle}>{props.data.symbol}</td>
        <td style={tdStyle}>
            <p>{pairQuotation.marketPrice}</p>
            <span className={rowClassName} style={{fontSize: "16px"}}>{formatAmount(pairQuotation.marketChangeRate || "", true)}</span>
        </td>
        <td style={tdStyle}>
            <span>{fixedNumber(pairQuotation.last24hVol, reducerState.currentPairDecimal)}</span>
        </td>
    </tr>
}

export default function TokenList() {
    const {t} = useTranslation();
    const [ reducerState, dispath ] = useExchangeStore();
    const mapDispatch = mapExchangeDispatch(dispath);
    const {isDark} = useThemeManager();
    const state = useEffectState({
        showPanel: false,
        pairInfo: {} as IPair
    });

    useEffect(() => {
        state.pairInfo = reducerState.currentPair;
    }, [reducerState.currentPair])

    useEffect(() => {
        getPairList();
        /*document.addEventListener("click", docOnClick);

        return () => {
            document.removeEventListener("click", docOnClick);
        }*/
    }, []);

    const isRise = useMemo(() => {
        return reducerState.tiker.close >= reducerState.tiker.open;
    }, [reducerState.tiker]);

    function docOnClick() {
        state.showPanel = false;
    }

    async function getPairList() {
        const pairs = await getContractPairList();
        if ($router.query.pairId) {
            let selectPair;
            pairs.data.some((item) => {
                if (item.id == $router.query.pairId) {
                    selectPair = item;
                    return true;
                }
                return false;
            });
            changePair(selectPair || pairs.data[0]);
        } else if(!state.pairInfo.settleCoinId) {
            changePair(pairs.data[0]);
        }

        dispath({
            type: exchangeActions.SET_PAIR,
            data: pairs.data
        })
    }

    function changePair(pair: IPair) {
        localStorage.setItem("pair", JSON.stringify(pair));
        mapDispatch.setCurrentPair(pair);
        /*dispath({
            type: exchangeActions.SET_CURRENT_PAIR,
            data: pair
        });*/
        state.showPanel = false;
    }

    return (
        <TokenListStyle className={"flex-box"}
                        onMouseOver={() => state.showPanel = true}
                        onMouseLeave={() => state.showPanel = false}>
            <div className={"flex-row font20"} style={{cursor: "pointer", userSelect: "none", whiteSpace: "nowrap"}}>
                <span>{reducerState.currentPair.symbol}</span>
                <Price className={`${isRise ? 'long' : 'short'}`}>{reducerState.tiker.close || "0"}</Price>
                <img src={isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")}
                     className={`icon ${state.showPanel ? 'active' : ''}`}
                     alt="" />
                {/*<span className={`icon ${state.showPanel ? 'active' : ''}`}></span>*/}
            </div>
            <Toggle vIf={state.showPanel}>
                <PanelStyle onClick={(event) => event.stopPropagation()}>
                    <table>
                        <thead>
                            <tr>
                                <th  style={{fontSize: "16px"}}>{t(`Pairs`)}</th>
                                <th  style={{fontSize: "16px"}}>{t(`Oracle Price`)}</th>
                                <th  style={{fontSize: "16px"}}>{t(`24h Vol`)}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            reducerState.pairs.map((item) => {
                                return <PairRow data={item} key={item.id} onChange={() => changePair(item)}></PairRow>
                            })
                        }
                        </tbody>
                    </table>
                </PanelStyle>
            </Toggle>
        </TokenListStyle>
    )
}
