import React from 'react';
import { useTranslation } from 'react-i18next';
import {ButtonGroup, LeverageModalStyle, Warn} from './LeverageModal.style';
import Modal from "../modal/Modal";
import LoadButton from '../loadButton/LoadButton';
import StepNumber from "../stepNumber/StepNumber";
import {useEffectState} from "../../hooks/useEffectState";
import {IOpenModal} from "../openModal";
import Toggle from '../toggle/Toggle';

export interface ILeverageModal{
    callback(leverage: string): void
    defaultValue?: string
}

export function LeverageModal(props: ILeverageModal & IOpenModal) {
    const {t} = useTranslation();
    const state = useEffectState({
        leverage: props.defaultValue ?? "10"
    });

    return (
        <Modal title={t(`Adjusting leverage`)} titleStyle={{marginBottom: "32px"}} close={props.destoryComponent}>
            <LeverageModalStyle>
                <StepNumber value={state.leverage} onChange={(value) => {
                    if (Number(value) > 0) {
                        state.leverage = value
                    }
                }}></StepNumber>
                <div className={"label"} style={{marginTop: "16px"}}>{t(`* The maximum position of the current trading pair is: 1,000,000 USDT.`, {nsSeparator: false})}</div>
                <Toggle vIf={Number(state.leverage) > 10}>
                    <Warn className={"flex-row"}>
                        {/*<img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>*/}
                        <div>{t(`Selecting more than [10×] leverage trading will increase the risk of forced liquidation, please try to pay attention to related risks.`)}</div>
                    </Warn>
                </Toggle>
                <ButtonGroup className={"grid-2"}>
                    <LoadButton
                        className={"cancel"}
                        loading={false}
                        onClick={props.destoryComponent}>{t(`Cancel`)}</LoadButton>
                    <LoadButton
                        loading={false}
                        onClick={() => {
                            props.callback(state.leverage);
                            props.destoryComponent();
                        }}>{t(`Confirm`)}</LoadButton>
                </ButtonGroup>
            </LeverageModalStyle>
        </Modal>
    )
}
