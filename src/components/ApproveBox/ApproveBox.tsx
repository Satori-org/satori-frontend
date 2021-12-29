import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadButton from '../loadButton/LoadButton';
import { ApproveBoxStyle } from './ApproveBox.style';

export default function ApproveBox() {
    const {t} = useTranslation();

    return (
        <ApproveBoxStyle>
            <h3 className={"title"}>{t(`Enable USDT in SATORI`)}</h3>
            <div>{t(`When you recharge on satori for the first time, you must enable USDT. You only need to do this once.`)}</div>
            <div style={{textAlign: "center"}}>
                <LoadButton loading={false} style={{width: "144px", height: "38px", margin: "12px auto 0"}}>{t(`Enable USDT`)}</LoadButton>
            </div>
        </ApproveBoxStyle>
    )
}
