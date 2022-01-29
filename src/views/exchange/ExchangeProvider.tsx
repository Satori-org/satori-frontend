import {createContext, useContext} from 'react';
import {initExchangeState, IExchangeState} from "./exchangeReducer";

type Idefalut = [IExchangeState, any];
export const ExchangeContext = createContext<Idefalut>([initExchangeState, {}]);

export default function useExchangeStore() {
    return useContext(ExchangeContext)
}
