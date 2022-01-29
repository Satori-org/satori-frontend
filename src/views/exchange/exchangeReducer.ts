import {AnyAction} from "redux";
import {IPair} from "src/ajax/contract/contract";
import {RESOLUTION_KEY} from "./exchangeConfig";

export const exchangeActions = {
    SET_PAIR: "SET_PAIR",
    CHANGE_TOKEN: "CHANGE_TOKEN",
    SET_RESOLUTION_DATA: "SET_RESOLUTION_DATA"
};

export type IExchangeState = {
    pairs: IPair[]
    currentTokenIndex: number
    resolution: string,
    resolutionData: {value: string, resolution: string}
}
export const initExchangeState: IExchangeState = {
    pairs: [],
    currentTokenIndex: 0,
    resolution: "15MIN",
    resolutionData: {value: '15MIN',resolution: '15'},
};

export function exchangeReducer(state: IExchangeState, action: AnyAction): IExchangeState {
    switch (action.type) {
        case exchangeActions.SET_PAIR:
            return {...state, pairs: action.data};
        case exchangeActions.CHANGE_TOKEN:
            return {...state, currentTokenIndex: action.data};
        case exchangeActions.SET_RESOLUTION_DATA:
            return {...state, resolutionData: action.data};
        default:
            return state;
    }
}
