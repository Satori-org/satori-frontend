import React, {CSSProperties, ReactNode, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {BtnGroup, MessageBoxStyle } from './MessageBox.style';
import ReactDOM from "react-dom";
import {TradeStatus} from "../../common/enum";
import Toggle from '../toggle/Toggle';
import LoadButton from "../loadButton/LoadButton";
import {CSSTransition} from "react-transition-group";
import {useEffectState} from "../../hooks/useEffectState";

const success_icon = require("src/assets/images/success.png");
const fail_icon = require("src/assets/images/fail.png");
const warn_icon = require("src/assets/images/warn.png");
const icons = [success_icon, fail_icon, warn_icon];

interface IParams {
    title: string
    content?: ReactNode
    type?: TradeStatus
    displayBtn?: boolean
    confirmText?: string
    cancelText?: string
    callback?(): void
    onConfirm?(): void
    titleStyle?: CSSProperties
}

interface IMessageBox extends IParams {
    className?: string,
    style?: CSSProperties,
    destoryComponent():void
}
function MessageBox(props: IMessageBox) {
    const {t} = useTranslation();
    const state = useEffectState({
        active: false
    });

    useEffect(() => {
        state.active = true;
    }, []);

    useEffect(() => {
        setTimeout(() => {
            state.active = false;
        }, 3 * 1000);
    }, []);

    return (
        <CSSTransition in={state.active} timeout={200} classNames={"my-slider-right"} unmountOnExit onExited={() => {
            props.destoryComponent();
        }}>
            <MessageBoxStyle>
                <h3 className={"flex-row title"} style={props.titleStyle}>
                    <img src={props.type ? icons[props.type] : icons[TradeStatus.success]} className={"icon"} alt="" />
                    <div>{props.title}</div>
                </h3>
                <div className={"content"}>
                    {props.content}
                </div>
                <Toggle vIf={!!props.displayBtn}>
                    <BtnGroup className={"grid-2"}>
                        <LoadButton loading={false} className={"btn"} onClick={props.onConfirm}>{props.confirmText || t(`confirm`)}</LoadButton>
                        <LoadButton loading={false} className={"btn cancel"} onClick={props.destoryComponent}>{props.cancelText || t(`cancel`)}</LoadButton>
                    </BtnGroup>
                </Toggle>
            </MessageBoxStyle>
        </CSSTransition>
    )
}

export default function OpenMessageBox(params: IParams) {
    let className = "message-box";
    let messageBox = document.createElement("div");
    messageBox.className = className;
    //document.body.appendChild(messageBox);
    document.getElementById("messageContainer")!.appendChild(messageBox);
    const destoryComponent = () => {
        if (messageBox) {
            ReactDOM.unmountComponentAtNode(messageBox);
        }
    };
    ReactDOM.render(<MessageBox destoryComponent={destoryComponent} {...params}></MessageBox>, messageBox);
}
