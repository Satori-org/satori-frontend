import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { NotConnectStyle } from './NotConnect.style';
import {useEffectState} from "../../hooks/useEffectState";
import ConnectWalletModal from "../connectWalletModal/ConnectWalletModal";
import Toggle from "../toggle/Toggle";

type IProps = {
    style?: CSSProperties
}
export default function NotConnect(props: IProps) {
    const {t} = useTranslation();
    const state = useEffectState({
        showModal: false
    });

    return (
        <NotConnectStyle style={props.style}>
            <img src={require("src/assets/images/wallet.png")} className={"walletIcon"} alt=""/>
            <div className={"label"}>{t(`Wallet isn't connected`)}</div>
            <button className={"connectBtn"} onClick={() => state.showModal = true}>{t(`Connect wallet`)}</button>
            <Toggle vIf={state.showModal}>
                <ConnectWalletModal
                    onClose={() => state.showModal = false}
                    onSuccess={() => state.showModal = false}></ConnectWalletModal>
            </Toggle>
        </NotConnectStyle>
    )
}
