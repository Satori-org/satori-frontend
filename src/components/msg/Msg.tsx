import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { MsgStyle } from './Msg.style';
import {NotificationModal} from "src/views/exchange/NotificationModal";
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from '../toggle/Toggle';
import {useThemeManager} from "../../hooks/useThemeManager";

export default function Msg() {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        showModal: false
    });

    useEffect(() => {
        document.addEventListener("click", domClick);

        return () => {
            document.removeEventListener("click", domClick);
        }
    }, []);

    function domClick() {
        state.showModal = false;
    }


    return (
        <MsgStyle className={"flex-box borderRadius"} onClick={(event) => {
            state.showModal = !state.showModal;
            event.stopPropagation();
        }}>
            <img src={isDark?require("src/assets/images/dark/notice.png"):require("src/assets/images/light/notice.png")} className={"icon"} alt=""/>
            {/*<span className={"tag"}></span>*/}
            {/*<Toggle vIf={state.showModal}>
                <NotificationModal />
            </Toggle>*/}
        </MsgStyle>
    )
}
