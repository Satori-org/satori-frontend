import {useTranslation} from "react-i18next";
import {useEffectState} from "../../hooks/useEffectState";
import {useCallback, useMemo, useState} from "react";
import useExchangeStore from "./ExchangeProvider";
import {fixedNumber, formatAmount, formatUSDT} from "../../common/utilTools";

export type ICustomerToken = {
    text: string
    value: string
    show: boolean
}

export function useCustomerTokenInfo(symbol: string) {
    const {t} = useTranslation();
    const [ reducerState ] = useExchangeStore();
    const [switchs, setSwitchs] = useState([true, true, true, true]);
    /*const state: {tokenInfo: ICustomerToken[]} = useEffectState({
        tokenInfo: [
            {text: t(`24h High`), value: "$63590.22", show: true},
            {text: t(`24h Low`), value: "$63590.22", show: true},
            {text: `${t(`24h Volume`)}(${symbol})`, value: "3590.22", show: true},
            {text: t(`24h Volume(USDT)`), value: "$6590", show: false},
        ]
    });*/
    const tokenInfo = useMemo(() => {
        return [
            {text: t(`24H HIGH`), value: `${formatUSDT(reducerState.market24Data.hight)}`, show: switchs[0]},
            {text: t(`24H LOW`), value: `${formatUSDT(reducerState.market24Data.low)}`, show: switchs[1]},
            {text: `${t(`24H VOLUME`)}(${symbol})`, value: `${reducerState.market24Data.quantity || "-"}`, show: switchs[2]},
            {text: t(`24H VOLUME(USDT)`), value: `${formatUSDT(reducerState.market24Data.amount)}`, show: switchs[3]},
        ]
    }, [symbol, t, switchs, reducerState.market24Data]);
    const toggleTokenInfo = useCallback((index: number, show: boolean) => {
        let item = switchs.concat();
        item[index] = show;
        setSwitchs(item);
    }, [switchs]);

    return {customerTokenInfo: tokenInfo, toggleTokenInfo};
}
