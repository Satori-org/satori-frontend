import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {AssetBox, BalanceBox, DepositModalStyle, RightBtn, StickyBox, Warn} from './DepositModal.style';
import Modal from "../modal/Modal";
import Input from "../form/Input";
import Form from "../form/Form";
import LoadButton from '../loadButton/LoadButton';
import ApproveBox from "../ApproveBox/ApproveBox";
import {colors} from "../../styles/style";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {useEffectState} from "../../hooks/useEffectState";
import {precision, project} from "../../contract/config";
import {getTokenBalance} from "../../contract/token";
import {awaitWrap, fixedNumber, regExpTemplate, showError} from "../../common/utilTools";
import {approve, checkHashStatus, extendTran, getInput, needApprove, NewWriteContract} from "../../contract/wallet";
import {mapDispatchToProps} from "../../store/connect";
import Toggle from "../toggle/Toggle";
import {NUMBER_REG} from "../../common/regExp";
import OpenWaitingModal from "../waitingModal/WaitingModal";
import OpenMessageBox from "../messageBox/MessageBox";
import Decimal from "decimal.js";

type IProps = {
    onClose(): void
}
export default function DepositModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const state = useEffectState({
        balance: 0,
        approveStatus: false,
        loading: false,
        amount: ""
    });

    const USDC = project.contracts.USDC;
    const Satori = project.contracts.Satori;
    const Proxy = project.contracts.Proxy;

    useEffect(() => {
        getBalance();
        checkApproveStatus();
    }, []);

    async function checkApproveStatus() {
        const a = {
            token: USDC.address,
            owner: storeData.address,
            spender: Proxy.address
        };
        state.approveStatus = await needApprove(a);
    }

    async function getBalance() {
        state.balance = await getTokenBalance(storeData.address, USDC.address);
    }

    const surAmount = useMemo(() => {
        if (!state.balance || !state.amount) {
            return 0;
        }
        let val = Decimal.sub(state.balance, state.amount).toFixed();
        return Number(val);
    }, [state.balance, state.amount]);

    async function submit() {
        const contract = NewWriteContract(Proxy.address, Satori.abi);
        state.loading = true;
        let [transInfo, error] = await awaitWrap(contract.deposit(getInput(state.amount,  USDC.decimals)));
        if (error) {
            showError(error);
        } else {
            await checkHashStatus(transInfo);
            let transData = extendTran(transInfo, {type: `Deposit`, symbol: ``, status: 0});
            dispatch.setLocalTrans(storeData.localTrans.concat(transData));
            dispatch.setTrans(storeData.trans.concat(transData));
            const tipText = regExpTemplate(t(`Your 300.00 USDT recharge will be available after 15 confirmations.`), {amount: state.amount});
            OpenWaitingModal({
                title: t(`Recharging...`),
                content: tipText,
                hash: transInfo.hash,
                callback(result: boolean): void {
                    OpenMessageBox({
                        title: t(`Deposit Successfully!!`),
                        content: tipText
                    });
                }
            });
            props.onClose()
        }
        state.loading = false;
    }

    return (
        <Modal title={t(`Deposit`)} close={props.onClose}>
            <Form onSubmit={submit}>
                <AssetBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Assets`)}</span>
                    <div className={"flex-row"}>
                        <img src={require("src/assets/images/USDT.png")} className={"icon"} alt="" />
                        <span>USDT</span>
                    </div>
                </AssetBox>
                <Input label={t(`Amount`)}
                       right={<div className={`flex-row`}>
                           <RightBtn onClick={() => state.amount = state.balance.toString()}>{t(`MAX`)}</RightBtn>
                       </div>
                       }
                       inputStyle={{width: "110px"}}
                       placeholder={"0.00"}
                       hideTips={true}
                       regex={[{regStr: NUMBER_REG, tips: ""}]}
                       onPaste={(event) => {
                           console.log(event.clipboardData)
                       }}
                       maxDecimal={3}
                       value={state.amount}
                       onChange={(value) =>  {
                           state.amount = value;
                       }}  />
                <BalanceBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Available USDT`)}</span>
                    <div className={"flex-row"} style={{color: colors.artContentColor}}>
                        <span>{fixedNumber(state.balance, precision)} </span>
                        <span style={{margin: "0 4px"}}>→</span>
                        <span className={`balance ${surAmount < 0 ? 'short' :''}`}>{surAmount}</span>
                    </div>
                </BalanceBox>
                <Toggle vIf={Number(state.amount) > state.balance}>
                    <Warn className={"flex-row"}>
                        <img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>
                        <div>{t(`Your recharge cannot exceed the available pledge.`)}</div>
                    </Warn>
                </Toggle>
                <Toggle vIf={!state.approveStatus}>
                    <ApproveBox onCallback={(approveStatus) => state.approveStatus = approveStatus}></ApproveBox>
                </Toggle>
                <StickyBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Equity`)}</span>
                    <span>$0.0056</span>
                </StickyBox>
                <LoadButton loading={!state.approveStatus || state.loading}>{t(`Confirm Deposit`)}</LoadButton>
            </Form>
        </Modal>
    )
}
