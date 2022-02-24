import { ITrans } from 'src/contract/types';
import * as actions from './actionTypes';
import {langType} from "../locales/i18n";
import {THEME} from "../common/enum";
import {CHAINS, IChain, IWallet, WALLETS} from 'src/contract/config';

export type IState = {
    address: string
    trans: ITrans[],
    localTrans: ITrans[],
    completedHash: string,
    lang: string
    token: string
    theme: string
    leverage: string
    network: IChain,
    wallet_info: IWallet | null
};
let initState: IState = {
    //address: sessionStorage.getItem("wallet_address") || (getWalletProvider() && getWalletProvider().selectedAddress) || "",
    address: sessionStorage.getItem("wallet_address") || "",
    trans: [],
    localTrans: sessionStorage.getItem("trans") ? JSON.parse(sessionStorage.getItem("trans") || "{}") :  [],
    completedHash: "",
    lang: localStorage.getItem("lang") || langType.en_US,
    token: sessionStorage.getItem("token") || "",
    theme: localStorage.getItem("theme") || THEME.dark,
    leverage: localStorage.getItem("leverage") || "10",
    network: localStorage.getItem("network") ? JSON.parse(localStorage.getItem("network") || "{}") :  CHAINS.Clover,
    wallet_info: sessionStorage.getItem("wallet_info") ? JSON.parse(sessionStorage.getItem("wallet_info") || "{}") :  null,
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
        case actions.TOGGLE_THEME:
            return {...state, theme: action.data};
        case actions.SET_LEVERAGE:
            return {...state, leverage: action.data};
        case actions.SET_NETWORK:
            return {...state, network: action.data};
        case actions.SET_WALLET_INFO:
            return {...state, wallet_info: action.data};
        default:
            return state;
    }
}
