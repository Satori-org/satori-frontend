import React from 'react';
import { useTranslation } from 'react-i18next';
import { MsgStyle } from './Msg.style';
import OpenNotificationModal from "../../views/exchange/NotificationModal";

export default function Msg() {
    const {t} = useTranslation();

    function open() {
        OpenNotificationModal();
    }

    return (
        <MsgStyle className={"flex-box"} onClick={open}>
            <img src={require("src/assets/images/notice.png")} className={"icon"} alt=""/>
            <span className={"tag"}></span>
        </MsgStyle>
    )
}
