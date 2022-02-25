import React, {CSSProperties, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {DropDown, DropMenuContainer, ExplainText, FieldGroup, PlanFieldStyle, PlanOrderModalStyle} from './PlanOrderModal.style';
import Modal from "../modal/Modal";
import InputNumber from '../inputNumber/InputNumber';
import {useThemeManager} from "../../hooks/useThemeManager";
import ModalFooter from "../modal/ModalFooter";
import {useEffectState} from "../../hooks/useEffectState";
import {IPositionList} from "../../ajax/contract/contract";
import {DropMenu} from "../connectWallet/ConectWallet.style";
import Toggle from "../toggle/Toggle";
import {NetworkStyle} from "../network/Network.style";

type IPlanField = {
    isDark: boolean
    style?: CSSProperties
}
function PlanField(props: IPlanField) {
    const {t} = useTranslation();
    const state = useEffectState({
        showDropDown: false
    });

    return <div style={props.style || {marginTop: "0.16rem"}}>
        <PlanFieldStyle>
            <InputNumber label={t(`Take Profit`)}
                         right={<span className={"label"}>USDT</span>}
                         placeholder={"0.00"}
                         inputStyle={{flex: 1, textAlign: "right", marginRight: "0.04rem"}}
                         style={{flex: 1}} />
            <DropDown
                className={"flex-row"}
                onMouseOver={() => state.showDropDown = true}
                onMouseLeave={() => state.showDropDown = false}>
                <span>Current</span>
                <img src={props.isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")} className={"arrow"} alt=""/>
                <Toggle vIf={state.showDropDown}>
                    <DropMenuContainer onClick={(event) => event.stopPropagation()}>
                        <DropMenu>
                            <li className={"menuItem flex-box"}>{t(`Current`)}</li>
                            <li className={"menuItem flex-box"}>Trigger</li>
                        </DropMenu>
                    </DropMenuContainer>
                </Toggle>
            </DropDown>
        </PlanFieldStyle>
        <ExplainText>
            When <span className={"value"}>current price</span> reach <span className={"value"}>0.00 USDT</span>, postion will be closed at trigger proce, est. profit/loss will be XX.XX USDT
        </ExplainText>
    </div>
}


type IProps = {
    onClose(): void
    onConfirm(): void
    data: IPositionList
}
export default function PlanOrderModal(props: IProps) {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        loading: false
    });

    async function submit() {

    }

    return (
        <Modal title={t(`Take Profit/ Stop Limit`)} titleStyle={{marginBottom: "0.2rem"}}>
            <PlanOrderModalStyle>
                <FieldGroup>
                    <span className={"label"}>{t(`Contract`)}</span>
                    <span className={"long"}>BTC/USDT Long  25x</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Opening Price`)}</span>
                    <span>65534.10 USDT</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Current Price`)}</span>
                    <span>65534.10 USDT</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Trigger Price`)}</span>
                    <span>65534.10 USDT</span>
                </FieldGroup>
                <PlanField isDark={isDark} style={{marginTop: "0.12rem"}} />
                <PlanField isDark={isDark} />
                <ExplainText style={{marginTop: "0.28rem"}}>*TP/SL will apply to the entire postion. When the position closed, the order will be cancelled. When price reach trigger price, postion will be closed. If postion amount exceed max, order will be declined</ExplainText>

                <ModalFooter
                    onCancel={props.onClose}
                    onConfirm={submit}
                    loading={state.loading} />
            </PlanOrderModalStyle>
        </Modal>
    )
}
