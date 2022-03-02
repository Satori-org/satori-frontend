import React, {CSSProperties, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {
    DropDown,
    DropMenu,
    DropMenuContainer,
    ExplainText,
    FieldGroup,
    PlanFieldStyle,
    PlanOrderModalStyle
} from './PlanOrderModal.style';
import Modal from "../modal/Modal";
import InputNumber from '../inputNumber/InputNumber';
import {useThemeManager} from "../../hooks/useThemeManager";
import ModalFooter from "../modal/ModalFooter";
import {useEffectState} from "../../hooks/useEffectState";
import {IPositionList} from "../../ajax/contract/contract";
import Toggle from "../toggle/Toggle";
import {NetworkStyle} from "../network/Network.style";
import {fixedNumber, fixedNumberStr, showMessage} from "../../common/utilTools";
import {USDT_decimal_show} from "../../config";
import useExchangeStore from "../../views/exchange/ExchangeProvider";
import Decimal from "decimal.js";

type IPlanField = {
    isDark: boolean
    style?: CSSProperties
    onChange(value: string): void
    data: IPositionList
    isProfit: boolean
}
function PlanField(props: IPlanField) {
    const {t} = useTranslation();
    const state = useEffectState({
        showDropDown: false,
        amount: ""
    });

    useEffect(() => {
        props.onChange(state.amount);
    }, [state.amount]);

    const pnl = useMemo(() => {
        let obj = {
            profit: 0,
            percent: "0%",
            className: ""
        };
        if (!state.amount) {
            return obj;
        }
        /*let decimal = rowPair.settleCoin && rowPair.settleCoin.settleDecimal || 2;*/
        //let lastPrice = state.amount;
        let profit = Decimal.sub(state.amount ,props.data.openingPrice).mul(props.data.quantity).toFixed();
        let amount = Decimal.mul(props.data.openingPrice, props.data.quantity).toFixed();
        let percent = fixedNumber( Decimal.div(profit, props.data.marginAmount).mul(100).toFixed(), 2 );

        //obj.profit = props.item.isLong ? fixedNumber(profit, decimal) : 0 - fixedNumber(profit, decimal);
        let dicProfit = props.data.isLong ? profit : Decimal.sub(0, profit);
        obj.profit = fixedNumber(Decimal.add(dicProfit, props.data.tariffAmount).toFixed(), USDT_decimal_show);
        if (obj.profit > 0) {
            obj.percent = `+${Math.abs(percent)}%`;
            obj.className = "long";
        } else if(obj.profit < 0) {
            obj.percent = `-${Math.abs(percent)}%`;
            obj.className = "short";
        } else {
            obj.percent = `${Math.abs(percent)}%`;
        }
        // obj.percent = `${obj.profit > 0 ? '+' : '-'}${Math.abs(percent)}%`;

        return obj;
    }, [props.data.openingPrice, props.data.isLong, state.amount]);

    function validProfit(profit: string) {
        if (!profit) {
            return;
        }
        if (props.data.isLong && Number(profit) < Number(props.data.openingPrice)) {
            showMessage(t(`The long take profit price must be greater than the opening price`))
        }
        if (!props.data.isLong && Number(profit) > Number(props.data.openingPrice)) {
            showMessage(t(`The short take profit price must be lower than the opening price`))
        }
    }

    function validLoss(loss: string) {
        if (!loss) {
            return;
        }
        if (props.data.isLong && Number(loss) > Number(props.data.openingPrice)) {
            showMessage(t(`The long stop price must be lower than the opening price`))
        }
        if (!props.data.isLong && Number(loss) < Number(props.data.openingPrice)) {
            showMessage(t(`The short stop price must be greater than the opening price`))
        }
    }

    return <div style={props.style || {marginTop: "0.16rem"}}>
        <PlanFieldStyle>
            <InputNumber label={t(`Take Profit`)}
                         right={<span className={"label"}>USDT</span>}
                         placeholder={"0.00"}
                         inputStyle={{flex: 1, textAlign: "right", marginRight: "0.04rem"}}
                         style={{flex: 1}}
                         value={state.amount}
                         onBlur={() => {
                             if (props.isProfit) {
                                 validProfit(state.amount);
                             } else {
                                 validLoss(state.amount);
                             }
                         }}
                         onChange={(value) => state.amount = value} />
            <DropDown
                className={"flex-row"}
                onMouseOver={() => state.showDropDown = true}
                onMouseLeave={() => state.showDropDown = false}>
                <span>Current</span>
                <img src={props.isDark ? require("src/assets/images/dark/icon_arrow_down_2.png") : require("src/assets/images/light/icon_arrow_down_2.png")} className={"arrow"} alt=""/>
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
            When <span className={"value"}>current price</span> reach <span className={"value"}>{state.amount || "0.00"} USDT</span>, postion will be closed at trigger proce, est. profit/loss will be <span className={`${pnl.className}`}>{pnl.profit} USDT</span>
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
    const [reducerState] = useExchangeStore();
    const state = useEffectState({
        loading: false,
        profit: "",
        loss: ""
    });

/*    useEffect(() => {
        if (props.data.isLong && Number(state.profit) < Number(props.data.openingPrice)) {
            showMessage(t(`The long take profit price must be greater than the opening price`))
        }
        if (props.data.isLong && Number(state.loss) > Number(props.data.openingPrice)) {
            showMessage(t(`The long stop price must be lower than the opening price`))
        }
    }, [state.profit, props.data.isLong]);

    useEffect(() => {
        if (!props.data.isLong && Number(state.profit) > Number(props.data.openingPrice)) {
            showMessage(t(`The short take profit price must be lower than the opening price`))
        }
        if (!props.data.isLong && Number(state.loss) < Number(props.data.openingPrice)) {
            showMessage(t(`The short stop price must be greater than the opening price`))
        }
    }, [state.loss, props.data.isLong]);*/

    async function submit() {

    }

    return (
        <Modal title={t(`Take Profit/ Stop Limit`)} titleStyle={{marginBottom: "0.2rem"}} style={{borderRadius: "0.16rem"}}>
            <PlanOrderModalStyle>
                <FieldGroup>
                    <span className={"label"}>{t(`Contract`)}</span>
                    <span className={props.data.isLong ? 'Long' : 'Short'}>{props.data.symbol} {props.data.isLong ? 'Long' : 'short'}  {props.data.lever}x</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Opening Price`)}</span>
                    <span>{fixedNumberStr(props.data.openingPrice, USDT_decimal_show)} USDT</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Current Price`)}</span>
                    <span>{fixedNumberStr(reducerState.tiker.close, USDT_decimal_show)} USDT</span>
                </FieldGroup>
                <FieldGroup>
                    <span className={"label"}>{t(`Trigger Price`)}</span>
                    <span>{fixedNumberStr(reducerState.marketPrice, USDT_decimal_show)} USDT</span>
                </FieldGroup>
                <PlanField isDark={isDark} isProfit={true} data={props.data} style={{marginTop: "0.12rem"}} onChange={(value) => state.profit = value} />
                <PlanField isDark={isDark} isProfit={false} data={props.data} onChange={(value) => state.loss = value} />
                <ExplainText style={{marginTop: "0.28rem"}}>*TP/SL will apply to the entire postion. When the position closed, the order will be cancelled. When price reach trigger price, postion will be closed. If postion amount exceed max, order will be declined</ExplainText>

                <ModalFooter
                    onCancel={props.onClose}
                    onConfirm={submit}
                    loading={state.loading} />
            </PlanOrderModalStyle>
        </Modal>
    )
}
