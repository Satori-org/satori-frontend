import { ITrans } from 'src/contract/types';
import * as actions from './actionTypes';
import {langType} from "../locales/i18n";

export type IState = {
    address: string
    trans: ITrans[],
    localTrans: ITrans[],
    completedHash: string,
    lang: string
    token: string
};
let initState: IState = {
    address: sessionStorage.getItem("wallet_address") || (window['ethereum'] && window['ethereum'].selectedAddress) || "",
    trans: [],
    localTrans: sessionStorage.getItem("trans") ? JSON.parse(sessionStorage.getItem("trans") || "{}") :  [],
    completedHash: "",
    lang: localStorage.getItem("lang") || langType.zh_CN,
    token: sessionStorage.getItem("token") || ""
};

export default function reducer(state = initState, action: any): IState  {
    switch (action.type) {
        case actions.SET_WALLET_ADDRESS:
            return {...state, address: action.data};
        case actions.SET_TRANS:
            return {...state, trans: action.data};
        case actions.SET_LOCAL_TRANS:
            return {...state, localTrans: action.data};
        case actions.SET_COMPLETED_HASH:
            return {...state, completedHash: action.data};
        case actions.SET_LANG:
            return {...state, lang: action.data};
        case actions.SET_TOKEN:
            return {...state, token: action.data};
        default:
            return state;
    }
}
