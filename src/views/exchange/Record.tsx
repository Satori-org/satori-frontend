import React, {useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {RecordStyle, RecordTab} from './styles/Record.style';
import {useEffectState} from "../../hooks/useEffectState";
import Position from "./record/Position";
import OpenOrder from "./record/OpenOrder";
import Fills from "./record/Fills";
import TransactionHistory from "./record/TransactionHistory";

export default function Record() {
    const {t} = useTranslation();
    const state = useEffectState({
       active: 0
    });

    const tabs = useMemo(() => {
        return [
            {text: t(`Positions`)},
            {text: t(`Open Orders`)},
            {text: t(`Fills`)},
            {text: t(`Transaction History`)},
        ]
    }, [t]);

    const RecordComponent = useMemo(() => {
        switch (state.active) {
            case 1:
                return <OpenOrder></OpenOrder>;
            case 2:
                return <Fills></Fills>;
            case 3:
                return <TransactionHistory></TransactionHistory>;
            default:
                return <Position></Position>
        }
    }, [state.active]);

    return (
        <RecordStyle>
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
        </RecordStyle>
    )
}
