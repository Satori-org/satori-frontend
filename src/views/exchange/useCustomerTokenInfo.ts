import {useTranslation} from "react-i18next";
import {useEffectState} from "../../hooks/useEffectState";
import {useCallback} from "react";

export type ICustomerToken = {
    text: string
    value: string
    show: boolean
}
export function useCustomerTokenInfo() {
    const {t} = useTranslation();
    const state: {tokenInfo: ICustomerToken[]} = useEffectState({
        tokenInfo: [
            {text: t(`24h High`), value: "$63590.22", show: true},
            {text: t(`24h Low`), value: "$63590.22", show: true},
            {text: t(`24h Volume(BTC)`), value: "3590.22", show: true},
            {text: t(`24h Volume(USDT)`), value: "$6590", show: false},
        ]
    });

    const toggleTokenInfo = useCallback((index: number, show: boolean) => {
        let item = state.tokenInfo.concat();
        item[index].show = show;
        state.tokenInfo = item;
    }, [state.tokenInfo]);

    return {customerTokenInfo: state.tokenInfo, toggleTokenInfo};
}
