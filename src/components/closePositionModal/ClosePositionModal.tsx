import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ClosePositionModalContentStyle, ClosePositionModalStyle, Group} from './ClosePositionModal.style';
import Modal from "../modal/Modal";
import {useEffectState} from "src/hooks/useEffectState";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import useExchangeStore from "src/views/exchange/ExchangeProvider";
import Percent from "../percent/Percent";
import Decimal from "decimal.js";
import {addOrder, IPositionList} from "src/ajax/contract/contract";
import {awaitWrap, fixedNumber, isNumber, showMessage} from "src/common/utilTools";
import {signExpire, signMsg} from "src/contract/wallet";
import ModalFooter from "../modal/ModalFooter";
import {ORDER_TYPE} from "src/common/enum";
import Tab from "../tab/Tab";
import Toggle from "../toggle/Toggle";
import InputNumber from "../inputNumber/InputNumber";

interface IProps {
    data: IPositionList
    onConfirm():void
    onClose():void
}
export function ClosePositionModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [ reducerState, dispath ] = useExchangeStore();

    const placeholderText = "0.0000";
    const state = useEffectState({
        price: "",
        quantity: "",
        percent: 0,
        quantityPlaceholder: placeholderText,
        pricePlaceholder: placeholderText,
        loading: false,
        orderType: ORDER_TYPE.market
    });
    const symbolDecimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;
    const settleDecimal = useMemo(() => {
        return reducerState.currentPairDecimal;
    }, [reducerState.currentPairDecimal]);

    useEffect(() => {
        if (state.percent) {
            let percent = Decimal.div(state.percent, 100).toFixed();
            let quantity = Decimal.mul(props.data.remainingCloseQuantity, percent).toFixed(symbolDecimal);
            state.quantity = Number(quantity).toString();
        }
    }, [state.percent]);

    const isMart = useMemo(() => {
        return state.orderType === ORDER_TYPE.market;
    }, [state.orderType]);
    const amount = useMemo(() => {
        let price = isMart ? reducerState.marketPrice : state.price;
        if (!price || !isNumber(state.quantity)) {
            return "0";
        }
        /* (标记价 + 标记价/杠杆)*数量/杠杆 */
        /*let a = Decimal.div(state.price, props.data.lever).toFixed();
        let amount = Decimal.add(a, state.price).mul(state.quantity).div(props.data.lever).toFixed();*/
        return Decimal.mul(price, state.quantity).toFixed();
    }, [reducerState.marketPrice, state.quantity, isMart, state.price]);

    const fee = useMemo(() => {
        let margin = amount || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        console.log(Decimal.mul(margin, rate).div(100).toFixed())
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [amount, reducerState.currentPair.tradeFeeRate]);

    async function submit() {
        if (!isMart && !Number(state.price)) {
            showMessage(t(`Please enter the Price of closed positions`));
            return ;
        }
        if (isMart && !reducerState.marketPrice) {
            showMessage(t(`No marker price obtained`));
            return ;
        }
        if (!state.quantity || !isNumber(state.quantity)) {
            showMessage(t(`Please enter the amount of closed positions`));
            return ;
        }
        if (Number(state.quantity) > Number(props.data.remainingCloseQuantity)) {
            showMessage(t(`The number of inputs exceeds the number of positions`));
            return ;
        }
        state.loading = true;
        const isClose = true;
        let baseSignParams = {
            "quantity": state.quantity,
            "address": storeData.address,
            "expireTime": signExpire(),
            "contractPairId": props.data.contractPairId,
            "isClose": isClose,
            "amount": "100"
        };
        let signParams = isMart ? baseSignParams : Object.assign({}, baseSignParams, {"price": state.price});
        const [signData, error] = await awaitWrap(signMsg(signParams, storeData.address)) ;
        if (!error) {
            let baseOrderParams = {
                contractPairId: props.data.contractPairId,
                contractPositionId: props.data.id,
                isClose: isClose,
                isLong: props.data.isLong,
                isMarket: isMart,
                quantity: Number(state.quantity),
                signHash: signData.signatrue,
                originMsg: signData.origin,
                lever: 10,
                amount: "100"
            };
            let orderParams = isMart ? baseOrderParams : Object.assign({}, baseOrderParams, {price: Number(state.price)});
            const [res, error2] = await awaitWrap(addOrder(orderParams));
            if (!error2) {
                props.onConfirm();
            }
        }
        state.loading = false;
    }

    return (
        <Modal title={t(`Close Position`)} close={props.onClose}>
            <ClosePositionModalStyle>
                <Tab<boolean>
                    options={[
                        {text: t(`Market`), value: ORDER_TYPE.market},
                        {text: t(`Limit`), value: ORDER_TYPE.limit}
                    ]}
                    onChange={(value) => {
                        state.quantity = "";
                        state.percent = 0;
                        state.orderType = value;
                    }} />
                <ClosePositionModalContentStyle>
                    <Toggle vIf={state.orderType !== ORDER_TYPE.market}>
                        <InputNumber
                            label={t(`Price`)}
                            style={{marginBottom: "0.16rem"}}
                            right={<div className={`flex-row`}>
                                <button className={"btnText"} onClick={() => state.price = String(reducerState.marketPrice)}>Last</button>
                            </div>
                            }
                            placeholder={state.pricePlaceholder}
                            maxDecimal={symbolDecimal}
                            value={state.price}
                            onChange={(value) => {
                                state.price = value;
                            }}  />
                    </Toggle>
                    <InputNumber
                        label={t(`Amount`)}
                        style={{marginBottom: "0.16rem"}}
                        right={<span>{reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol}</span>}
                        placeholder={state.quantityPlaceholder}
                        maxDecimal={symbolDecimal}
                        value={state.quantity}
                        onChange={(value) => {
                            state.percent = 0;
                            state.quantity = value;
                        }}/>
                    <Percent<number>
                        data={[{value: 25},{value: 50},{value: 75},{value: 100}]}
                        value={state.percent}
                        onChange={(value) => {
                            state.percent = value
                        }} />
                    {/*<Group className={"flex-sb"} style={{marginTop: "32px"}}>
                        <span className={"label"}>{t(`Fee`)}</span>
                        <span>{fixedNumberStr("3.35624", USDT_decimal)} USDT</span>
                    </Group>*/}
                    <Group className={"flex-sb"} style={{marginTop: "0.28rem"}}>
                        <span className={"label"}>{t(`Total`)}</span>
                        <span>{fixedNumber(amount, settleDecimal)} USDT</span>
                    </Group>
                    <ModalFooter
                        onCancel={props.onClose}
                        onConfirm={submit}
                        loading={state.loading} />
                </ClosePositionModalContentStyle>
                {/*<ButtonGroup className={"grid-2"}>
                    <LoadButton
                        className={"cancel"}
                        loading={false}
                        onClick={props.onClose}>{t(`Cancel`)}</LoadButton>
                    <LoadButton
                        loading={state.loading}
                        onClick={submit}>{t(`Confirm`)}</LoadButton>
                </ButtonGroup>*/}
            </ClosePositionModalStyle>
        </Modal>
    )
}

/*
export default function OpenClosePositionModal(params: IParams) {
    let id = "close-position-box";
    let container = document.getElementById(id);
    if (!container) {
        container = document.createElement("div");
        container.id = id;
        document.body.appendChild(container);
    }
    const destoryComponent = () => {
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    };
    ReactDOM.render(<ClosePositionModal destoryComponent={destoryComponent} {...params}></ClosePositionModal>, container);
}
*/
