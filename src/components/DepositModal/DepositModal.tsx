import React from 'react';
import { useTranslation } from 'react-i18next';
import {AssetBox, BalanceBox, DepositModalStyle, RightBtn, StickyBox, Warn} from './DepositModal.style';
import Modal from "../modal/Modal";
import Input from "../form/Input";
import Form from "../form/Form";
import LoadButton from '../loadButton/LoadButton';
import ApproveBox from "../ApproveBox/ApproveBox";
import {colors} from "../../styles/style";

type IProps = {
    onClose(): void
}
export default function DepositModal(props: IProps) {
    const {t} = useTranslation();

    return (
        <Modal title={t(`Deposit`)} close={props.onClose}>
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
                    <span className={"label"}>{t(`Available USDT`)}</span>
                    <div className={"flex-row"} style={{color: colors.artContentColor}}>
                        <span>10.056 </span>
                        <span style={{margin: "0 4px"}}>→</span>
                        <span className={"balance"}>5.01</span>
                    </div>
                </BalanceBox>
                {/*<ApproveBox></ApproveBox>*/}
                <Warn className={"flex-row"}>
                    <img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>
                    <div>{t(`Your recharge cannot exceed the available pledge.`)}</div>
                </Warn>
                <StickyBox className={"flex-sb"}>
                    <span className={"label"}>{t(`Equity`)}</span>
                    <span>$0.0056</span>
                </StickyBox>
                <LoadButton loading={false}>{t(`Confirm Deposit`)}</LoadButton>
            </Form>
        </Modal>
    )
}
