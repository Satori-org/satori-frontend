import {useCallback, useEffect, useState} from "react";
import {useFetchPost} from "src/ajax";
import {IAccount} from "src/ajax/contract/contract";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {project} from "src/contract/config";
import {getTokenBalance} from "src/contract/token";
import {usePubSubEvents} from "./usePubSubEvents";
import {RELOAD_ACCOUNT_INFO, RELOAD_RECORD} from "../common/PubSubEvents";

export function useAccountInfo(settleCoinId?: number) {
    const store = useStore<IState>();
    const storeData = store.getState();
    const [walletBalance, setWalletBalance] = useState(0);

    //let { data: accountInfo, reload } = useFetchPost<IAccount>(`/contract-provider/contract-account/account/${settleCoinId}`, undefined, [settleCoinId, storeData.token]);

    useEffect(() => {
        getWalletBalance();
    }, [storeData.address]);

    usePubSubEvents(RELOAD_ACCOUNT_INFO, () => {
        //reload();
        getWalletBalance();
    });

    const reloadData = useCallback(() => {
       // reload();
        getWalletBalance();
    }, []);

    async function getWalletBalance() {
        if (storeData.address) {
            let amount = await getTokenBalance(storeData.address, project.contracts.USDC.address);
            setWalletBalance(amount);
        }
    }

    return {walletBalance, reloadData}
}
