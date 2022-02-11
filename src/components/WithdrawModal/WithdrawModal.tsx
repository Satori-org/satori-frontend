import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {AssetBox, BalanceBox, RightBtn, StickyBox, Warn} from './WithdrawModal.style';
import Modal from "../modal/Modal";
import Input from "../form/Input";
import Form from "../form/Form";
import LoadButton from '../loadButton/LoadButton';
import {colors} from "src/styles/style";
import {withdraw} from "src/ajax/contract/contract";
import {useEffectState} from "src/hooks/useEffectState";
import {NUMBER_REG} from "src/common/regExp";
import {checkHashStatus, getWallet, NewWriteContract, signMsg, unpackEIP712} from 'src/contract/wallet';
import {project} from "src/contract/config";
import {
    awaitWrap,
    fixedNumber,
    isInputNumber,
    isNumber,
    regExpTemplate,
    showError,
    showMessage
} from "src/common/utilTools";
import OpenWaitingModal from "../waitingModal/WaitingModal";
import OpenMessageBox from "../messageBox/MessageBox";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {Explain, Group, Label} from "../DepositModal/DepositModal.style";
import useTheme from "../../hooks/useTheme";
import {useAccountInfo} from "../../hooks/useAccountInfo";
import useExchangeStore from "../../views/exchange/ExchangeProvider";
import ModalFooter from "../modal/ModalFooter";
import {RELOAD_ACCOUNT_INFO} from "../../common/PubSubEvents";
import {USDT_decimal} from "../../config";
import InputNumber from "../inputNumber/InputNumber";

type IProps = {
    onClose(): void
}
export default function WithdrawModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const { theme } = useTheme();
    const state = useEffectState({
        amount: "",
        loading: false
    });

    const Satori = project.contracts.Satori;
    const Proxy = project.contracts.Proxy;

    const { walletBalance } = useAccountInfo(reducerState.currentPair.settleCoinId);

    async function submit() {
        /*const tipText = regExpTemplate(t(`Your 300.00 USDT withdraw will be successful after confirmation on the mainnet.`), {amount: "1235.2564"});
        OpenWaitingModal({
            title: t(`Withdrawing...`),
            content: tipText,
            hash: "transInfo.hash",
            callback(result: boolean): void {
                OpenMessageBox({
                    title: t(`Withdraw Successfully!`),
                    content: tipText
                });
                PubSub.publish(RELOAD_ACCOUNT_INFO);
            }
        });
        return ;*/
        if (!isNumber(state.amount)) {
            showMessage(`Please enter the quantity`);
            return ;
        }
        state.loading = true;
        const withdrawInfo = {
            "amount": state.amount,
            "address": storeData.address,
            "expireTime": new Date().getTime() + 30 * 1000
        };
        /*const originData = JSON.stringify(withdrawInfo);
        const withdrawSignature = await getWallet().signMessage(originData);*/

        const signatureData = await signMsg(withdrawInfo, storeData.address);

        const {data: resData} = await withdraw(state.amount, signatureData.origin, signatureData.signatrue);
        const [r,v,s] = unpackEIP712(resData.signHash);
        const contract = NewWriteContract(Proxy.address, Satori.abi);
        const [transInfo, error] = await awaitWrap(contract.withdraw(resData.amount, resData.expireTime, resData.salt, v, r, s));
        if (error) {
            showError(error);
        } else {
            await checkHashStatus(transInfo);
            const tipText = regExpTemplate(t(`Your 300.00 USDT withdraw will be successful after confirmation on the mainnet.`), {amount: state.amount});
            OpenWaitingModal({
                title: t(`Withdrawing...`),
                content: tipText,
                hash: transInfo.hash,
                callback(result: boolean): void {
                    OpenMessageBox({
                        title: t(`Withdraw Successfully!`)
                    });
                    PubSub.publish(RELOAD_ACCOUNT_INFO);
                }
            });
            state.loading = false;
            props.onClose();
        }
    }

    return (
        <Modal title={t(`Withdraw`)} close={props.onClose}>
            <Form>
                <Label className={"label"}>{t(`Amount`)}</Label>
                <InputNumber
                    right={<div className={`flex-row`}>
                        <span style={{color: theme.colors.explain, pointerEvents: "none"}}>USDT</span>
                        <RightBtn onClick={() => state.amount = String(fixedNumber(reducerState.accountInfo.availableAmount, USDT_decimal))}>{t(`Max`)}</RightBtn>
                    </div>
                    }
                    inputStyle={{width: "110px"}}
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
                    {t(`* Please make sure that there is a certain amount of USDT in the account balance, otherwise the withdrawal will fail.`)}
                </Explain>
                {/*<Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Fee`)}</span>
                    <span>{walletBalance} USDT</span>
                </Group>*/}
                <Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Account Balance`)}</span>
                    <span>{reducerState.accountInfo.availableAmount || "--"} USDT</span>
                </Group>
                <Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Wallet Balance`)}</span>
                    <span>{walletBalance || "--"} USDT</span>
                </Group>
                {/*<AssetBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Assets`)}</span>
                    <div className={"flex-row"}>
                        <img src={require("src/assets/images/USDT.png")} className={"icon"} alt="" />
                        <span>USDT</span>
                    </div>
                </AssetBox>
                <Input label={t(`Amount`)}
                       right={<div className={`flex-row`}>
                           <RightBtn>{t(`MAX`)}</RightBtn>
                       </div>
                       }
                       inputStyle={{width: "110px"}}
                       placeholder={"0.00"}
                       hideTips={true}
                       regex={[{regStr: NUMBER_REG, tips: ""}]}
                       onPaste={(event) => {
                           console.log(event.clipboardData)
                       }}
                       value={state.amount}
                       onChange={(value) =>  {
                           let arr = value.split(".");
                           if (!(arr[1] && arr[1].length > 3)) {
                               state.amount = value;
                           }
                       }}  />
                <BalanceBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Free Collateral`)}</span>
                    <div className={"flex-row"} style={{color: colors.artContentColor}}>
                        <span>10.056 </span>
                        <span style={{margin: "0 4px"}}>→</span>
                        <span className={"balance"}>5.01</span>
                    </div>
                </BalanceBox>
                <Warn className={"flex-row"}>
                    <img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>
                    <div>{t(`You cannot Withdraw more than your available wallet balance.`)}</div>
                </Warn>
                <StickyBox>
                    <div className={"flex-sb row"}>
                        <span className={"label"}>{t(`Fee`)}</span>
                        <span>$0.056</span>
                    </div>
                    <div className={"flex-sb row"}>
                        <span className={"label"}>{t(`Total`)}</span>
                        <span>$0.056</span>
                    </div>
                    <div className={"flex-sb row"}>
                        <span className={"label"}>{t(`Wallet`)}</span>
                        <span>$0.056</span>
                    </div>
                </StickyBox>
                <LoadButton loading={false}>{t(`Confirm Withdraw`)}</LoadButton>*/}
            </Form>
            <ModalFooter
                onCancel={props.onClose}
                onConfirm={submit}
                loading={state.loading}
            ></ModalFooter>
        </Modal>
    )
}
