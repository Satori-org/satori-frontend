import React, {CSSProperties, ReactNode, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {ProgressBar, WaitingModalStyle} from './WaitingModal.style';
import ReactDOM from "react-dom";
import {useEffectState} from "../../hooks/useEffectState";
import {ethers} from "ethers";
import {PROVIDER} from "../../config";
import PubSub from "pubsub-js";

interface IParams {
    title: string
    content?: ReactNode
    hash: string
    callback?(result: boolean): void
}

interface INotification extends IParams{
    className?: string,
    style?: CSSProperties,
    destoryComponent():void
}
function WaitingModal(props: INotification) {
    const {t} = useTranslation();
    const state = useEffectState({
        count: 0
    });

    useEffect(() => {
        checkConfirm();
    }, []);

    async function checkConfirm() {
        let instance = new ethers.providers.Web3Provider(PROVIDER);
        //const instance = new web3(chainNode);
        //instance.eth.getTransactionReceipt(currentHash).then((res) => {
        instance.getTransactionReceipt(props.hash).then((res) => {
            console.log("confirmations",res.confirmations);
            console.log(res);
            console.log(res.status);
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
            <h3 className={"flex-box title"}>
                <img src={require("src/assets/images/wait.png")} className={"icon"} alt="" />
                <div>{props.title}</div>
            </h3>
            <div className={"content"}>
                {props.content}
            </div>
            <div className={"label"}>{state.count}/15 {t(`confirmations`)}</div>
            <ProgressBar>
                <div className={"progress"} style={{width: `${state.count/15*100}%`, maxWidth: "100%"}}></div>
            </ProgressBar>
        </WaitingModalStyle>
    )
}

export default function OpenWaitingModal(params: IParams) {
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
}
