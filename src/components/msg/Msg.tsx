import React from 'react';
import { useTranslation } from 'react-i18next';
import { MsgStyle } from './Msg.style';

export default function Msg() {
    const {t} = useTranslation();

    return (
        <MsgStyle className={"flex-box"}>

        </MsgStyle>
    )
}
