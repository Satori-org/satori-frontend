import {useCallback, useEffect, useState} from "react";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {project} from "src/contract/config";
import {usePubSubEvents} from "./usePubSubEvents";
import {RELOAD_ACCOUNT_INFO} from "../common/PubSubEvents";
import {usePluginModel} from "./usePluginModel";

export function useAccountInfo(settleCoinId?: number) {
    const store = useStore<IState>();
    const storeData = store.getState();
    const [walletBalance, setWalletBalance] = useState(0);
    const {getTokenBalance} = usePluginModel();

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
