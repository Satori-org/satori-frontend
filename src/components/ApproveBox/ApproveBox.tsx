import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import LoadButton from '../loadButton/LoadButton';
import { ApproveBoxStyle } from './ApproveBox.style';
import {useEffectState} from "../../hooks/useEffectState";
import {awaitWrap, showError} from "../../common/utilTools";
import {approve, checkHashStatus, extendTran} from "../../contract/wallet";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {mapDispatchToProps} from "../../store/connect";
import {project} from "../../contract/config";

type IProps = {
    onCallback(approveStatus: boolean): void
}
export default function ApproveBox(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const state = useEffectState({
        loading: false,
        approveStatus: false
    });

    const USDC = project.contracts.USDC;
    const Satori = project.contracts.Satori;
    const Proxy = project.contracts.Proxy;

    useEffect(() => {
        props.onCallback(state.approveStatus);
    }, [state.approveStatus]);

    async function approveToken() {
        const a = {
            token: USDC.address,
            owner: storeData.address,
            spender: Proxy.address
        };
        state.loading = true;
        const [transInfo, error] = await awaitWrap(approve(a));
        if (error) {
            showError(error);
        } else {
            let transData = extendTran(transInfo, {type: t(`授权`), symbol: "Proxy", status: 0});
            dispatch.setLocalTrans(storeData.localTrans.concat(transData));
            dispatch.setTrans(storeData.trans.concat(transData));
            await checkHashStatus(transInfo);
            state.approveStatus = true;
        }
        state.loading = false;
    }


    return (
        <ApproveBoxStyle>
            <h3 className={"title"}>{t(`Enable USDT in SATORI`)}</h3>
            <div>{t(`When you recharge on satori for the first time, you must enable USDT. You only need to do this once.`)}</div>
            <div style={{textAlign: "center"}}>
                <LoadButton style={{width: "144px", height: "38px", margin: "12px auto 0"}}
                            loading={state.loading}
                            onClick={approveToken}>{t(`Enable USDT`)}</LoadButton>
            </div>
        </ApproveBoxStyle>
    )
}
