import React, {useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import {
    ButtonGroup,
    ConnectModal,
    ContractDetailContent,
    ContractDetailStyle,
    FieldLabel,
    Title
} from './styles/ContractDetail.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import DepositModal from 'src/components/DepositModal/DepositModal';
import WithdrawModal from 'src/components/WithdrawModal/WithdrawModal';
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import useExchangeStore from "./ExchangeProvider";
import {formatAmount, formatAmountRise} from "../../common/utilTools";
import ConnectWalletModal from "../../components/connectWalletModal/ConnectWalletModal";

export default function ContractDetail() {
    const {t} = useTranslation();
    const [reducerState] = useExchangeStore();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        showDeposit: false,
        showWithdraw: false,
        showModal: false
    });

    const getRiseClassName = useCallback((amount: string) => {
        if (!amount || amount === "0") {
            return "";
        }
        return Number(amount) > 0 ? 'long' : 'short';
    }, []);

    return (
        <ContractDetailStyle>
            <Title>{t(`Account`)}</Title>
            <ContractDetailContent>
                <div>
                    <FieldLabel className={"flex-sb"}>
                        <span className={"label"}>{t(`Available`)}</span>
                        <span>{formatAmount(reducerState.accountInfo.availableAmount)} USDT</span>
                    </FieldLabel>
                    <FieldLabel className={"flex-sb"}>
                        <span className={"label border"}>{t(`Frozen Margin`)}</span>
                        <span>{formatAmount(reducerState.accountInfo.frozenMargin)} USDT</span>
                    </FieldLabel>
                    <FieldLabel className={"flex-sb"}>
                        <span className={"label border"}>{t(`Unrealized PNL`)}</span>
                        <div>
                            <span className={`${getRiseClassName(reducerState.accountInfo.unrealizedPnl)}`}>{formatAmountRise(reducerState.accountInfo.unrealizedPnl)}</span>
                            <span> USDT</span>
                        </div>
                    </FieldLabel>
                    <FieldLabel className={"flex-sb"}>
                        <span className={"label border"}>{t(`Realized PnL `)}</span>
                        <div>
                            <span className={`${getRiseClassName(reducerState.accountInfo.realizedPnl)}`}>{formatAmountRise(reducerState.accountInfo.realizedPnl)}</span>
                            <span> USDT</span>
                        </div>
                    </FieldLabel>
                    <FieldLabel className={"flex-sb"}>
                        <span className={"label"}>{t(`Total Assets`)}</span>
                        <span>{formatAmount(reducerState.accountInfo.totalAssets)} USDT</span>
                    </FieldLabel>
                </div>
                <ButtonGroup className={"grid-2"}>
                    <button className={"button borderRadius deposit"}
                            disabled={!storeData.address}
                            onClick={() => state.showDeposit = true}>{t(`Deposit`)}</button>
                    <button className={"button borderRadius"}
                            disabled={!storeData.address}
                            onClick={() => state.showWithdraw = !state.showWithdraw}>{t(`Withdraw`)}</button>
                </ButtonGroup>
            </ContractDetailContent>
            <Toggle vIf={state.showDeposit}>
                <DepositModal onClose={() => state.showDeposit = false} />
            </Toggle>
            <Toggle vIf={state.showWithdraw}>
                <WithdrawModal onClose={() => state.showWithdraw = false} />
            </Toggle>
            <Toggle vIf={!storeData.token}>
                <ConnectModal>
                    <p>{t(`Connect your wallet to start trading.`)}</p>
                    <button className={"button"} onClick={() => state.showModal = true}>{t(`Connect wallet`)}</button>
                </ConnectModal>
            </Toggle>
            <Toggle vIf={state.showModal}>
                <ConnectWalletModal
                    onClose={() => state.showModal = false}
                    onSuccess={() => state.showModal = false}></ConnectWalletModal>
            </Toggle>
        </ContractDetailStyle>
    )
}
