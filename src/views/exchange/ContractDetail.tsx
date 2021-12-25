import React from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, ContractDetailStyle, FieldLabel, Title} from './styles/ContractDetail.style';

export default function ContractDetail() {
    const {t} = useTranslation();

    return (
        <ContractDetailStyle>
            <Title>{t(`Contract Details`)}</Title>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Available`)}</span>
                <span>1.9875 USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Frozen Margin`)}</span>
                <span>1.9875 USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Unrealized PNL`)}</span>
                <span>1.9875 USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Realized PnL`)}</span>
                <span>1.9875 USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Total Assets`)}</span>
                <span>1.9875 USDT</span>
            </FieldLabel>
            <ButtonGroup className={"grid-2"}>
                <button className={"button"}>{t(`Deposit`)}</button>
                <button className={"button Withdraw"}>{t(`Withdraw`)}</button>
            </ButtonGroup>
        </ContractDetailStyle>
    )
}
