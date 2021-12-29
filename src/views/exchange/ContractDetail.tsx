import React from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, ContractDetailStyle, FieldLabel, Title} from './styles/ContractDetail.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import DepositModal from 'src/components/DepositModal/DepositModal';
import OpenWaitingModal from "../../components/waitingModal/WaitingModal";
import OpenMessageBox from "../../components/messageBox/MessageBox";
import WithdrawModal from 'src/components/WithdrawModal/WithdrawModal';
import OpenLeverageModal from "../../components/LeverageModal/LeverageModal";

export default function ContractDetail() {
    const {t} = useTranslation();
    const state = useEffectState({
       showDeposit: false,
       showWithdraw: false
    });

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
                <button className={"button"} onClick={() => {
                    /*OpenWaitingModal({
                        title: t(`Recharging...`),
                        content: t(`Your 300.00 USDT recharge will be available after 15 confirmations.`),
                        callback(): void {
                            console.log("success")
                        }
                    })*/
                    /*OpenMessageBox({
                        title: t(`Deposit Successfully!`),
                        content: t(`Your 300.00 USDT recharge will be available after 15 confirmations.`),
                        displayBtn: true,
                        confirmText: "Trade"
                    })*/
                    OpenLeverageModal()
                }}>{t(`Deposit`)}</button>
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
