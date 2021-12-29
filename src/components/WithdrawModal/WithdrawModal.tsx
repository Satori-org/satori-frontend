import React from 'react';
import { useTranslation } from 'react-i18next';
import {AssetBox, BalanceBox, RightBtn, StickyBox, Warn} from './WithdrawModal.style';
import Modal from "../modal/Modal";
import Input from "../form/Input";
import Form from "../form/Form";
import LoadButton from '../loadButton/LoadButton';
import {colors} from "../../styles/style";

type IProps = {
    onClose(): void
}
export default function WithdrawModal(props: IProps) {
    const {t} = useTranslation();

    return (
        <Modal title={t(`Withdraw`)} close={props.onClose}>
            <Form onSubmit={() => console.log("??????")}>
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
                       placeholder={"0.00"}  />
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
                    <div>{t(`Your recharge cannot exceed the available pledge.`)}</div>
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
