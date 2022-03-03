import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Explain, Label, RightBtn, Group} from './DepositModal.style';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {useEffectState} from "src/hooks/useEffectState";
import {
    awaitWrap, fixedNumber,
    isInputNumber,
    isNumber,
    regExpTemplate,
    showError,
    showMessage
} from "src/common/utilTools";
import {extendTran, getInput} from "src/contract/wallet";
import {mapDispatchToProps} from "src/store/connect";
import {NUMBER_REG} from "src/common/regExp";
import {IWaitParams, WaitingModal} from "../waitingModal/WaitingModal";
import OpenMessageBox from "../messageBox/MessageBox";
import ModalFooter from "../modal/ModalFooter";
import {useAccountInfo} from "../../hooks/useAccountInfo";
import useExchangeStore from "../../views/exchange/ExchangeProvider";
import useTheme from "../../hooks/useTheme";
import {RELOAD_ACCOUNT_INFO} from "../../common/PubSubEvents";
import {USDT_decimal} from "../../config";
import InputNumber from "../inputNumber/InputNumber";
import openModal from "../openModal";
import {usePluginModel} from "../../hooks/usePluginModel";

type IProps = {
    onClose(): void
}
export default function DepositModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const [reducerState] = useExchangeStore();
    const { theme } = useTheme();
    const { needApprove, approve, checkHashStatus, NewWriteContract, project } = usePluginModel();
    const state = useEffectState({
        approveStatus: false,
        loading: false,
        amount: ""
    });

    /*const USDC = project.contracts.USDC;
    const Satori = project.contracts.Satori;
    const Proxy = project.contracts.Proxy;*/

    const {walletBalance } = useAccountInfo(reducerState.currentPair.settleCoinId);

    useEffect(() => {
        //getBalance();
        state.approveStatus = false;
        checkApproveStatus();
    }, [storeData.address]);

    async function checkApproveStatus() {
        if (storeData.address) {
            const a = {
                token: project.contracts.USDC.address,
                owner: storeData.address,
                spender: project.contracts.Proxy.address
            };
            state.loading = true;
            state.approveStatus = await needApprove(a);
            state.loading = false;
        }
    }

    async function approveToken() {
        const a = {
            token: project.contracts.USDC.address,
            owner: storeData.address,
            spender: project.contracts.Proxy.address
        };
        state.loading = true;
        const [transInfo, error] = await awaitWrap(approve(a));
        if (error) {
            showError(error);
        } else {
            let transData = extendTran(transInfo, {type: t(`授权`), symbol: "Proxy", status: 0});
            dispatch.setLocalTrans(storeData.localTrans.concat(transData));
            dispatch.setTrans(storeData.trans.concat(transData));
            await checkHashStatus(transInfo);
            state.approveStatus = true;
        }
        state.loading = false;
    }


    /*async function getBalance() {
        state.balance = await getTokenBalance(storeData.address, USDC.address);
    }*/

    /*const surAmount = useMemo(() => {
        if (!state.balance || !state.amount) {
            return 0;
        }
        let val = Decimal.sub(state.balance, state.amount).toFixed();
        return Number(val);
    }, [state.balance, state.amount]);*/

    async function submit() {
        if (!isNumber(state.amount)) {
            showMessage(`Please enter the quantity`);
            return ;
        }
        const contract = NewWriteContract(project.contracts.Proxy.address, project.contracts.Satori.abi);
        state.loading = true;
        let [transInfo, error] = await awaitWrap(contract.deposit(getInput(state.amount,  project.contracts.USDC.decimals)));
        if (error) {
            showError(error);
        } else {
            await checkHashStatus(transInfo);
            let transData = extendTran(transInfo, {type: `Deposit`, symbol: ``, status: 0});
            dispatch.setLocalTrans(storeData.localTrans.concat(transData));
            dispatch.setTrans(storeData.trans.concat(transData));
            const tipText = regExpTemplate(t(`Your 300.00 USDT recharge will be available after confirmation on the mainnet.`), {amount: state.amount});
            openModal<IWaitParams>(WaitingModal, {
                title: t(`Recharging...`),
                content: tipText,
                hash: transInfo.hash,
                callback(result: boolean): void {
                    OpenMessageBox({
                        title: t(`Deposit Successfully!`)
                    });
                    PubSub.publish(RELOAD_ACCOUNT_INFO);
                }
            });
            /*OpenWaitingModal({
                title: t(`Recharging...`),
                content: tipText,
                hash: transInfo.hash,
                callback(result: boolean): void {
                    OpenMessageBox({
                        title: t(`Deposit Successfully!`)
                    });
                    PubSub.publish(RELOAD_ACCOUNT_INFO);
                }
            });*/
            props.onClose()
        }
        state.loading = false;
    }

    return (
        <Modal title={t(`Deposit`)} close={props.onClose}>
            <Form>
                {/*<AssetBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Assets`)}</span>
                    <div className={"flex-row"}>
                        <img src={require("src/assets/images/USDT.png")} className={"icon"} alt="" />
                        <span>USDT</span>
                    </div>
                </AssetBox>*/}
                <Label>{t(`Amount`)}</Label>
                <InputNumber
                       right={<div className={`flex-row`}>
                           <span style={{color: theme.colors.headerButtonColor}}>USDT</span>
                           <RightBtn onClick={() => state.amount = String(fixedNumber(walletBalance, USDT_decimal))}>{t(`MAX`)}</RightBtn>
                       </div>
                       }
                       inputStyle={{flex: 1}}
                       placeholder={"0.000000"}
                       hideTips={true}
                       regex={[{regStr: NUMBER_REG, tips: ""}]}
                       onPaste={(event) => {
                           console.log(event.clipboardData)
                       }}
                       maxDecimal={USDT_decimal}
                       value={state.amount}
                       onChange={(value) =>  {
                           if (value === "" || isInputNumber(value)) {
                               state.amount = value;
                           }
                       }}  />
                       <Explain>
                           {t(`* Please make sure there is a certain amount of USDT in the wallet balance, otherwise the deposit will fail due to insufficient handling fees.`)}
                       </Explain>
                <Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Wallet Balance`)}</span>
                    <span>{walletBalance} USDT</span>
                </Group>
                <Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Account Balance`)}</span>
                    <span>{reducerState.accountInfo.availableAmount} USDT</span>
                </Group>
                {/*<BalanceBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Available USDT`)}</span>
                    <div className={"flex-row"} style={{color: colors.artContentColor}}>
                        <span>{fixedNumber(state.balance, precision)} </span>
                        <span style={{margin: "0 4px"}}>→</span>
                        <span className={`balance ${surAmount < 0 ? 'short' :''}`}>{surAmount}</span>
                    </div>
                </BalanceBox>*/}
                {/*<Toggle vIf={Number(state.amount) > state.balance}>
                    <Warn className={"flex-row"}>
                        <img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>
                        <div>{t(`Your recharge cannot exceed the available pledge.`)}</div>
                    </Warn>
                </Toggle>
                <Toggle vIf={!state.approveStatus}>
                    <ApproveBox onCallback={(approveStatus) => state.approveStatus = approveStatus}></ApproveBox>
                </Toggle>*/}
                {/*<StickyBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Equity`)}</span>
                    <span>$0.0056</span>
                </StickyBox>*/}
                {/*<LoadButton loading={!state.approveStatus || state.loading}>{t(`Confirm Deposit`)}</LoadButton>*/}
            </Form>
            <ModalFooter
                onCancel={props.onClose}
                confirmText={state.approveStatus ? t(`Confirm`) : t(`Enable USDT`)}
                onConfirm={() => {
                    if (state.approveStatus) {
                        submit()
                    } else {
                        approveToken();
                    }
                }}
                loading={state.loading}
            ></ModalFooter>
        </Modal>
    )
}
