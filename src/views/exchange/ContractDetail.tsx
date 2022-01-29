import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, ContractDetailStyle, FieldLabel, Title} from './styles/ContractDetail.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import DepositModal from 'src/components/DepositModal/DepositModal';
import WithdrawModal from 'src/components/WithdrawModal/WithdrawModal';
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";

export default function ContractDetail() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        showDeposit: false,
        showWithdraw: false,
    });


    return (
        <ContractDetailStyle>
            <Title>{t(`Contract Details`)}</Title>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Available`)}</span>
                <span>-- USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Frozen Margin`)}</span>
                <span>-- USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Unrealized PNL`)}</span>
                <span>-- USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Realized PnL `)}</span>
                <span>-- USDT</span>
            </FieldLabel>
            <FieldLabel className={"flex-sb"}>
                <span className={"label"}>{t(`Total Assets`)}</span>
                <span>-- USDT</span>
            </FieldLabel>
            <ButtonGroup className={"grid-2"}>
                <button className={"button"} onClick={() => state.showDeposit = true}>{t(`Deposit`)}</button>
                <button className={"button Withdraw"} onClick={() => state.showWithdraw = !state.showWithdraw}>{t(`Withdraw`)}</button>
            </ButtonGroup>
            <Toggle vIf={state.showDeposit}>
                <DepositModal onClose={() => state.showDeposit = false} />
            </Toggle>
            <Toggle vIf={state.showWithdraw}>
                <WithdrawModal onClose={() => state.showWithdraw = false} />
            </Toggle>
        </ContractDetailStyle>
    )
}
