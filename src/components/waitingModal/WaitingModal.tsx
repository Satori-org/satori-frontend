import React, {CSSProperties, ReactNode} from 'react';
import { useTranslation } from 'react-i18next';
import {ProgressBar, WaitingModalStyle} from './WaitingModal.style';
import ReactDOM from "react-dom";

interface INotification {
    className?: string,
    style?: CSSProperties,
    destoryComponent():void,
    title: string
    content?: ReactNode
    callback?(): void
}
function WaitingModal(props: INotification) {
    const {t} = useTranslation();

    return (
        <WaitingModalStyle>
            <h3 className={"flex-box title"}>
                <img src={require("src/assets/images/wait.png")} className={"icon"} alt="" />
                <div>{props.title}</div>
            </h3>
            <div className={"content"}>
                {props.content}
            </div>
            <div className={"label"}>{t(`1/15 confirmations`)}</div>
            <ProgressBar>
                <div className={"progress"} style={{width: "60%"}}></div>
            </ProgressBar>
        </WaitingModalStyle>
    )
}


type IParams = {
    title: string
    content?: ReactNode
    callback?(): void
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
