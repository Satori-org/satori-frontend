import React, {ReactNode, useEffect} from 'react';
import {ProgressBar, WaitingModalStyle} from './WaitingModal.style';
import {useEffectState} from "../../hooks/useEffectState";
//import {getProvider} from "../../contract/wallet";
import {IOpenModal} from "../openModal";
import {useTranslation} from "react-i18next";
import {usePluginModel} from "../../hooks/usePluginModel";

export interface IWaitParams {
    title: string
    content?: ReactNode
    hash: string
    callback?(result: boolean): void
}

export function WaitingModal(props: IWaitParams & IOpenModal) {
    const {t} = useTranslation();
    const {getProvider} = usePluginModel();
    const state = useEffectState({
        count: 0
    });

    useEffect(() => {
        checkConfirm();
    }, []);

    async function checkConfirm() {
        // let instance = new ethers.providers.Web3Provider(getWalletProvider());
        //const instance = new web3(chainNode);
        //instance.eth.getTransactionReceipt(currentHash).then((res) => {
        getProvider().getTransactionReceipt(props.hash).then((res) => {
            state.count = res.confirmations;
            if (res && res.status && res.confirmations >= 15) {
                props.callback && props.callback(true);
                props.destoryComponent();
            } else if(res && !res.status) {
                props.callback && props.callback(false);
            } else {
                setTimeout(() => {
                    checkConfirm();
                }, 3 * 1000);
            }
        })
    }

    return (
        <WaitingModalStyle>
            <h3 className={"flex-row title"}>
                <img src={require("src/assets/images/wait.png")} className={"icon"} alt="" />
                <div>{props.title}</div>
            </h3>
            <div className={"content"}>
                {props.content}
            </div>
            <ProgressBar>
                <div className={"progress"} style={{width: `${state.count/15*100}%`, maxWidth: "100%"}}></div>
            </ProgressBar>
            <div style={{paddingLeft: "0.34rem", marginTop: "0.12rem"}}>{state.count}/15 {t(`confirmations`)}</div>
        </WaitingModalStyle>
    )
}

/*export default function OpenWaitingModal(params: IWaitParams) {
    let id = "Waitin-box";
    let waitBox = document.getElementById(id);
    if (!waitBox) {
        waitBox = document.createElement("div");
        waitBox.id = id;
        document.body.appendChild(waitBox);
    }
    const destoryComponent = () => {
        if (waitBox) {
            ReactDOM.unmountComponentAtNode(waitBox);
        }
    };
    ReactDOM.render(<WaitingModal destoryComponent={destoryComponent} {...params}></WaitingModal>, waitBox);
}*/
