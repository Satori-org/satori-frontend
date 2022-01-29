import React, {useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {HistoryStyle, RecordTab} from './History.style';
import {useEffectState} from "../../../hooks/useEffectState";
import TradesOrders from "./TradesOrders";
import Transfer from './Transfer';
import Funding from "./Funding";

export default function History() {
    const {t} = useTranslation();
    const state = useEffectState({
        active: 0
    });

    const tabs = useMemo(() => {
        return [
            {text: t(`Trades Orders`)},
            {text: t(`Transfer`)},
            {text: t(`Funding`)}
        ]
    }, [t]);

    const RecordComponent = useMemo(() => {
        switch (state.active) {
            case 1:
                return <Transfer></Transfer>;
            case 2:
                return <Funding></Funding>;
            default:
                return <TradesOrders></TradesOrders>
        }
    }, [state.active]);

    return (
        <HistoryStyle>
            <RecordTab className={"flex-row"}>
                {
                    tabs.map((item, index) => {
                        return <div key={index}
                                    className={`tabItem ${state.active === index ? 'active' : ''}`}
                                    onClick={() => state.active = index}>{item.text}</div>
                    })
                }
            </RecordTab>
            {RecordComponent}
        </HistoryStyle>
    )
}
