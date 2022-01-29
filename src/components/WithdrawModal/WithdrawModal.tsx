import React, {useEffect} from 'react';
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
import {checkHashStatus, getWallet, NewWriteContract, unpackEIP712} from 'src/contract/wallet';
import {project} from "src/contract/config";
import {awaitWrap, regExpTemplate, showError} from "src/common/utilTools";
import OpenWaitingModal from "../waitingModal/WaitingModal";
import OpenMessageBox from "../messageBox/MessageBox";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";

type IProps = {
    onClose(): void
}
export default function WithdrawModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        amount: "",
        loading: false
    });

    const Satori = project.contracts.Satori;
    const Proxy = project.contracts.Proxy;

    useEffect(() => {
        console.log(regExpTemplate(t(`Your 300.00 USDT withdraw will be successful after 15 confirmations.`), {amount: "0.01"}))
    }, [])

    async function submit() {
        state.loading = true;
        const withdrawInfo = {
            "amount": state.amount,
            "address": storeData.address,
            "expireTime": new Date().getTime() + 30 * 1000
        };
        const originData = JSON.stringify(withdrawInfo);
        const withdrawSignature = await getWallet().signMessage(originData);

        const {data: resData} = await withdraw(state.amount, originData, withdrawSignature);
        const [r,v,s] = unpackEIP712(resData.signHash);
        const contract = NewWriteContract(Proxy.address, Satori.abi);
        const [transInfo, error] = await awaitWrap(contract.withdraw(resData.amount, resData.expireTime, resData.salt, v, r, s));
        if (error) {
            showError(error);
        } else {
            await checkHashStatus(transInfo);
            const tipText = regExpTemplate(t(`Your 300.00 USDT withdraw will be successful after 15 confirmations.`), {amount: state.amount});
            OpenWaitingModal({
                title: t(`Withdrawing...`),
                content: tipText,
                hash: transInfo.hash,
                callback(result: boolean): void {
                    OpenMessageBox({
                        title: t(`Withdraw Successfully!`),
                        content: tipText
                    });
                }
            });
            state.loading = false;
            props.onClose();
        }
    }

    return (
        <Modal title={t(`Withdraw`)} close={props.onClose}>
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
                <LoadButton loading={false}>{t(`Confirm Withdraw`)}</LoadButton>
            </Form>
        </Modal>
    )
}
