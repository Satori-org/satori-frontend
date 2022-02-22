import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {DisplayCtroll, RecordHeader, RecordStyle, RecordTab} from './styles/Record.style';
import {useEffectState} from "../../hooks/useEffectState";
import Position from "./record/Position";
import OpenOrder from "./record/OpenOrder";
import Fills from "./record/Fills";
import TransactionHistory from "./record/TransactionHistory";
import Toggle from "../../components/toggle/Toggle";
import useExchangeStore from "./ExchangeProvider";
import {exchangeActions} from "./exchangeReducer";
import {useThemeManager} from "../../hooks/useThemeManager";

export default function Record() {
    const {t} = useTranslation();
    const [ reducerState, dispath ] = useExchangeStore();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        active: 0,
        HideDifferent: reducerState.hideDifferent,
        positionsTotal: 0,
        CommissionTotal: 0,
    });

    const tabs = useMemo(() => {
        return [
            {text: t(`Positions`), count: state.positionsTotal},
            {text: t(`Commissioning`), count: state.CommissionTotal},
            {text: t(`Fills`), count: 0},
            {text: t(`Funding`), count: 0},
        ]
    }, [t, state.positionsTotal, state.CommissionTotal]);

    const RecordComponent = useMemo(() => {
        switch (state.active) {
            case 1:
                return <OpenOrder onChange={(count) => state.CommissionTotal = count}></OpenOrder>;
            case 2:
                return <Fills></Fills>;
            case 3:
                return <TransactionHistory></TransactionHistory>;
            default:
                return <Position onChange={(count) => state.positionsTotal = count}></Position>
        }
    }, [state.active]);

    useEffect(() => {
        dispath({
            type: exchangeActions.set_HideDifferent,
            data: state.HideDifferent
        })
    }, [state.HideDifferent, dispath]);

    return (
        <RecordStyle>
            <RecordHeader className={"flex-sb"}>
                <RecordTab className={"flex-row"}>
                    {
                        tabs.map((item, index) => {
                            return <div key={index}
                                        className={`tabItem flex-box ${state.active === index ? 'active' : ''}`}
                                        onClick={() => state.active = index}>
                                <span>{item.text}</span>
                                <Toggle vIf={!!item.count}>
                                    <span style={{marginLeft: "4px"}}>({item.count})</span>
                                </Toggle>
                            </div>
                        })
                    }
                </RecordTab>
                <DisplayCtroll className={"flex-row"} onClick={() => state.HideDifferent = !state.HideDifferent}>
                    <div className={"flex-box checkbox"}>
                        <Toggle vIf={state.HideDifferent}>
                            <img src={isDark ? require("src/assets/images/dark/icon_checked.png"):require("src/assets/images/light/icon_checked.png")} className={"checkIcon"} alt=""/>
                        </Toggle>
                    </div>
                    <span>{t(`Hide different pares`)}</span>
                </DisplayCtroll>
            </RecordHeader>
            {RecordComponent}
        </RecordStyle>
    )
}
