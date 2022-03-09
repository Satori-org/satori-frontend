import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, MarginModalStyle, RightBtn} from './MarginModal.style';
import Tab from "../tab/Tab";
import Modal from "../modal/Modal";
import ModalFooter from "../modal/ModalFooter";
import {useEffectState} from "src/hooks/useEffectState";
import useTheme from "src/hooks/useTheme";
import InputNumber from "../inputNumber/InputNumber";
import {changePositionMargin, IPositionList} from "src/ajax/contract/contract";
import Decimal from "decimal.js";
import {awaitWrap, fixedNumberStr, formatUSDT, isNumber, showMessage} from "src/common/utilTools";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import useExchangeStore from "src/views/exchange/ExchangeProvider";
import {MsgStatus} from "src/common/enum";
import {USDT_decimal_show} from "../../config";

type IProps = {
    data: IPositionList
    onSuccess(): void
    onClose(): void
}
export default function MarginModal(props: IProps) {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const placeholdeText = "0.00";
    const state = useEffectState({
        loading: false,
        amount: "",
        placeholde: placeholdeText,
        type: 0
    });


    const MMR = 0.005;
    const IMR = 1/props.data.lever;
    const capital = props.data.tariffAmount || "0";
    const restrictPrice = Number(props.data.restrictPrice) < 0 ? '--' : props.data.restrictPrice;

    const USDT_decimal = useMemo(() => {
        return reducerState.currentPairDecimal;
    }, [reducerState.currentPairDecimal]);
    const types = useMemo(() => {
        return [
            {text: t(`Add`), value: 0},
            {text: t(`Reduce`), value: 1},
        ]
    }, [t]);

    const Est = useMemo(() => {
        if (!isNumber(state.amount)) {
            return restrictPrice;
        }
        let mr = Decimal.add(1, IMR).sub(MMR);
        let sum = state.type === 0
            ? Decimal.add(state.amount, props.data.marginCallAmount).toFixed()
            : Decimal.sub(props.data.marginCallAmount, state.amount).toFixed();

        let x = Decimal.div(sum, props.data.quantity);
        let result = Decimal.mul(props.data.openingPrice, mr).add(x).sub(capital).toFixed();
        return Number(result) <= 0 ? '--' : result;
    }, [props.data, state.amount, state.type]);

    const Est_long = useMemo(() => {
        if (!isNumber(state.amount)) {
            return restrictPrice;
        }
        let mr = Decimal.sub(1, IMR).add(MMR);
        let sum = state.type === 0
            ? Decimal.add(state.amount, props.data.marginCallAmount).toFixed()
            : Decimal.sub(props.data.marginCallAmount, state.amount).toFixed();

        let x = Decimal.div(sum, props.data.quantity);
        let result = Decimal.mul(props.data.openingPrice, mr).sub(x).sub(capital).toFixed();
        return Number(result) <= 0 ? '--' : result;
    }, [props.data, state.amount, state.type]);

    const EstPrice = useMemo(() => {
        if (state.amount) {

        }
    }, [Est, Est_long, state.amount]);

    const available = useMemo(() => {
        if (state.type === 1) {
            return props.data.marginCallAmount;
        } else {
            return reducerState.accountInfo.availableAmount;
        }
    }, [props.data, reducerState.accountInfo, state.type]);

    /*const maxMargin = useMemo(() => {
        if (!reducerState.currentPair.tradeFeeRate || !available) {
            return "0";
        }
        let fe = Decimal.div(reducerState.currentPair.tradeFeeRate, 100);
        let rate = Decimal.add(1, fe);
        return fixedNumberStr(Decimal.div(available, rate).toFixed(), USDT_decimal)
    }, [available, reducerState.currentPair.tradeFeeRate]);*/

    const fee = useMemo(() => {
        if (!state.amount) {
            return "0";
        }
        let fe = Decimal.div(reducerState.currentPair.tradeFeeRate, 100);
        return Decimal.mul(state.amount, fe).toFixed();
    }, [state.amount]);

    async function submit() {
        if (!isNumber(state.amount) || Number(state.amount) === 0) {
            showMessage(t(`Please enter the quantity`));
            return ;
        }
        if (Number(state.amount) > Number(available)) {
            showMessage(t(`Exceed the maximum number of limits`));
            return ;
        }
        state.loading = true;
        const [info, error] = await awaitWrap(changePositionMargin({
            call: state.type === 0,
            id: props.data.id,
            marginAmount: state.amount
        }));
        if (info) {
            showMessage( state.type === 0 ? t(`Add margin successfully`) : t(`Reduce margin successfully`), MsgStatus.success);
            props.onSuccess();
        }
        state.loading = false;
    }


    return (
        <Modal title={t(`Adjust Margin`)} close={props.onClose} style={{minWidth: "3.44rem", width: "auto"}}>
            <MarginModalStyle>
                <Tab options={types}
                     style={{marginBottom: "0.24rem"}}
                     onChange={(value, selected) => {
                    state.amount = "";
                    state.type = value
                }}></Tab>
                {/*<Tab className={"grid-2"}>
                    {
                        types.map((item) => {
                            return <div key={item.value}
                                className={`flex-box item ${state.type === item.value ? 'active' : ''}`}
                                onClick={() => {
                                    state.amount = "";
                                    state.type = item.value
                                }}>{item.text}</div>
                        })
                    }
                   <div className={`flex-box item ${state.type === 0 ? 'active' : ''}`} onClick={() => state.type = 0}>{t(`Add`)}</div>
                   <div className={`flex-box item ${state.type === 1 ? 'active' : ''}`} onClick={() => state.type = 1}>{t(`Reduce`)}</div>
                </Tab>*/}
                <div className={"flex-sb"}>
                    <span>{t(`Total`)}</span>
                </div>
                <InputNumber
                    right={<div className={`flex-row`}>
                        <span style={{color: theme.colors.headerButtonColor}}>USDT</span>
                        <RightBtn onClick={() => state.amount = String(available)}>{t(`MAX`)}</RightBtn>
                     </div>
                    }
                    style={{margin: "0.08rem 0"}}
                    maxDecimal={USDT_decimal}
                    inputStyle={{width: "1.1rem", textAlign: "left"}}
                    placeholder={state.placeholde}
                    value={state.amount}
                    onChange={(value) => {
                        if (state.type === 1 && Number(value) > Number(props.data.marginCallAmount)) {
                            state.amount = props.data.marginCallAmount;
                        } else {
                            state.amount = value;
                        }
                    }}  />
                <Group className={"flex-sb"} style={{marginTop: "32px"}}>
                    <span className={"label"}>{ state.type === 1 ? t(`Maximum Reduce`) : t(`Maximum increase`)}</span>
                    <span>{fixedNumberStr(available, USDT_decimal)} USDT</span>
                </Group>
                <Group className={"flex-sb"}>
                    <span className={"label"}>{t(`Current position margin`)}</span>
                    <span>{formatUSDT(props.data.marginAmount)} USDT</span>
                </Group>
                <Group className={"flex-sb"}>
                    <span className={"label"}>{ state.type === 1 ? t(`Est.Liq.Price after Reduce`) : t(`Est.Liq.Price after increase`)}</span>
                    <span>{formatUSDT(props.data.isLong ? Est_long : Est)} USDT</span>
                </Group>
                {/*<div className={"flex-sb"} style={{margin: "6px 0"}}>
                    <span className={"label"}>{t(`Current position margin BTC/USDT Perpetual`)}</span>
                    <span> 1,616.58 USDT</span>
                </div>
                <div className={"flex-sb"}>
                    <span className={"label"}>{t(`Reference strong parity after adjustment`)}</span>
                    <span> 1,616.58 USDT</span>
                </div>*/}
                <ModalFooter style={{marginTop: "0.23rem"}} onCancel={props.onClose} onConfirm={submit} loading={state.loading} />
                {/*<LoadButton loading={false} style={{marginTop: "32px"}}>{t(`Confirm`)}</LoadButton>*/}
            </MarginModalStyle>
        </Modal>
    )
}
