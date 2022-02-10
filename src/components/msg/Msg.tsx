import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { MsgStyle } from './Msg.style';
import {NotificationModal} from "src/views/exchange/NotificationModal";
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from '../toggle/Toggle';

export default function Msg() {
    const {t} = useTranslation();
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
        <MsgStyle className={"flex-box"} onClick={(event) => {
            state.showModal = !state.showModal;
            event.stopPropagation();
        }}>
            <img src={require("src/assets/images/notice.png")} className={"icon"} alt=""/>
            {/*<span className={"tag"}></span>*/}
            {/*<Toggle vIf={state.showModal}>
                <NotificationModal />
            </Toggle>*/}
        </MsgStyle>
    )
}
