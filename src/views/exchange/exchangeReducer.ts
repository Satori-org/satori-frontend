import {AnyAction, Dispatch} from "redux";
import {IAccount, IKline, IMarket24, IMarketData, IPair, IQuotation} from "src/ajax/contract/contract";
import {RESOLUTION_KEY} from "./exchangeConfig";
import {IAccountInfo, Idata} from "../../components/kline/Kline";
import {USDT_decimal} from "../../config";
import {DispatchWithoutAction, Reducer, ReducerAction} from "react";
import {$router} from "../../react-router-perfect/Index";

export const exchangeActions = {
    SET_PAIR: "SET_PAIR",
    SET_CURRENT_PAIR: "SET_CURRENT_PAIR",
    SET_CURRENT_PAIR_DECIMAL: "SET_CURRENT_PAIR_DECIMAL",
    CHANGE_TOKEN: "CHANGE_TOKEN",
    SET_RESOLUTION_DATA: "SET_RESOLUTION_DATA",
    SET_MARKET_PRICE: "SET_MARKET_PRICE",
    SET_TICKER: "SET_TICKER",
    SET_ACCOUNTINFO: "SET_ACCOUNTINFO",
    SET_MARKET24: "SET_MARKET24",
    set_HideDifferent: "set_HideDifferent",
    set_quotation: "set_quotation",
    set_leverage: "set_leverage"
};


export function mapExchangeDispatch(dispatch: any) {
    return {
        setCurrentPair(pairInfo: IPair) {
            dispatch({
                type: exchangeActions.SET_CURRENT_PAIR,
                data: pairInfo
            });
            if (pairInfo.settleCoin) {
                dispatch({
                    type: exchangeActions.SET_CURRENT_PAIR_DECIMAL,
                    data: pairInfo.settleCoin.settleDecimal
                })
            }
        },
        setLeverage(leverage: string) {
            localStorage.setItem("leverage", leverage);
            dispatch({
                type: exchangeActions.set_leverage,
                data: leverage
            })
        }
    }
}

export type IExchangeState = {
    pairs: IPair[]
    currentPair: IPair
    currentPairDecimal: number
    currentTokenIndex: number
    resolution: string,
    resolutionData: {value: string, resolution: string},
    marketPrice: number
    tiker: Idata,
    accountInfo: IAccountInfo,
    market24Data: IMarket24,
    hideDifferent: boolean
    quotation: IQuotation[]
    leverage: string
}

export const initExchangeState: IExchangeState = {
    pairs: [],
    currentPair: {} as IPair,
    currentPairDecimal: USDT_decimal,
    currentTokenIndex: 0,
    resolution: "15MIN",
    resolutionData: {value: '15MIN',resolution: '15'},
    marketPrice: 0,
    tiker: {} as Idata,
    accountInfo: {} as IAccountInfo,
    market24Data: {} as IMarket24,
    hideDifferent: false,
    quotation: [],
    leverage: localStorage.getItem("leverage") || "10"
};

export function exchangeReducer(state: IExchangeState, action: AnyAction): IExchangeState {
    switch (action.type) {
        case exchangeActions.SET_PAIR:
            return {...state, pairs: action.data};
        case exchangeActions.SET_CURRENT_PAIR:
            return {...state, currentPair: action.data};
        case exchangeActions.SET_CURRENT_PAIR_DECIMAL:
            return {...state, currentPairDecimal: action.data};
        case exchangeActions.CHANGE_TOKEN:
            return {...state, currentTokenIndex: action.data};
        case exchangeActions.SET_RESOLUTION_DATA:
            return {...state, resolutionData: action.data};
        case exchangeActions.SET_MARKET_PRICE:
            return {...state, marketPrice: action.data};
        case exchangeActions.SET_TICKER:
            return {...state, tiker: action.data};
        case exchangeActions.SET_ACCOUNTINFO:
            return {...state, accountInfo: action.data};
        case exchangeActions.SET_MARKET24:
            return {...state, market24Data: action.data};
        case exchangeActions.set_HideDifferent:
            return {...state, hideDifferent: action.data};
        case exchangeActions.set_quotation:
            return {...state, quotation: action.data};
        case exchangeActions.set_leverage:
            return {...state, leverage: action.data};
        default:
            return state;
    }
}
