import {useEffect, useReducer} from "react";
import {exchangeReducer, initExchangeState} from "../views/exchange/exchangeReducer";

export function useCurrentPairInfo() {
    const [reducerState] = useReducer(exchangeReducer, initExchangeState);
    return reducerState.pairs[reducerState.currentTokenIndex];
}
