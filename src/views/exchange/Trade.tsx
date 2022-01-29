import React, {useEffect, useMemo, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'src/components/tab/Tab';
import {BalanceBox, ButtonGroup, FeeBox, FontBtn, LabelButton, TradeStyle} from './styles/Trade.style';
import {useEffectState} from "src/hooks/useEffectState";
import Form from "src/components/form/Form";
import Input from "src/components/form/Input";
import RSlider from "src/components/slider/RSlider";
import LoadButton from "src/components/loadButton/LoadButton";
import useExchangeStore from "./ExchangeProvider";
import {addOrder, IAccount} from "src/ajax/contract/contract";
import {ORDER_TYPE} from "src/common/enum";
import {signExpire, signMsg} from "src/contract/wallet";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {Toast} from "src/components/toast/Toast";
import OpenLeverageModal from "src/components/LeverageModal/LeverageModal";
import Decimal from "decimal.js";
import {awaitWrap, fixedNumber, isNumber} from "src/common/utilTools";
import PubSub from "pubsub-js";
import {getOrderType} from "./config";
import {NUMBER_REG} from "../../common/regExp";
import {RELOAD_RECORD} from "../../common/PubSubEvents";
import {useFetchPost} from "../../ajax";

export default function Trade() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [ reducerState, dispath ] = useExchangeStore();
    const childRef = useRef<{ validate(): boolean }>();
    const $form = useRef<HTMLFormElement>();

    const state = useEffectState({
        orderType: ORDER_TYPE.limit,   //false：Limit，true：Market
        sliderValue: 0,
        leverage: 10,
        isRISE: true,
        disabledCtroll: false,
        quantity: "",
        price: "",
        balance: 0,
        loading: false,
        accountInfo: {} as IAccount
    });
    const symbolDecimal = 10;
    /* Currently selected trading pairs */
    const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);
    /*Get contract account information*/
    let { data: accountInfo, reload } = useFetchPost<IAccount>(`/contract-provider/contract-account/account/${pairInfo.settleCoinId}`, undefined, [pairInfo.settleCoinId, storeData.token]);

    /* Total amount of orders placed */
    const amount = useMemo(() => {
        if (!state.quantity || !state.price || !isNumber(state.quantity)) {
            return "0.000";
        }
        return fixedNumber(Decimal.mul(state.quantity, state.price).toFixed(), 3)
    }, [state.quantity, state.price]);
    useEffect(() => {
        calcSliderValue();
        calcQuantity();
    }, [state.price, storeData.token, accountInfo.availableAmount, state.leverage]);
    /*Calculate the number of*/
    function calcQuantity() {
        if (!state.price || !storeData.token || accountInfo.availableAmount === "0" || !state.sliderValue) {
            state.quantity = "";
            return;
        }
        let percent = Decimal.div(state.sliderValue, 100).toFixed();
        let quantity = Decimal.mul(accountInfo.availableAmount, state.leverage).mul(percent).div(state.price).toFixed(symbolDecimal);
        state.quantity = Number(quantity).toString();
    }
    /* Calculate the value of the slider */
    function calcSliderValue() {
        if (!state.price || !storeData.token || accountInfo.availableAmount === "0" || !state.quantity) {
            state.sliderValue = 0;
            return;
        }
        if (!isNumber(state.quantity)) {
            return;
        }
        let totalAmount = Decimal.mul(state.quantity, state.price).div(state.leverage).toFixed();
        let val = Decimal.div(totalAmount, accountInfo.availableAmount).mul(100).toFixed();

        state.sliderValue = Number(val);
    }

    /*async function getPairBalance(pairId: number) {
        const data = await getAccountDetail(pairId);
        data.availableAmount = Number(data.availableAmount)
    }*/
    /*Percentage of slider display*/
    function tipFormatter (value=0) {
        return (<span>{value}%</span>)
    }

    async function submit(isLong: boolean) {
        if (state.orderType === ORDER_TYPE.limit && !state.price) {
            Toast(t(`Please enter the price`));
            return ;
        }
        if (!state.quantity) {
            Toast(t(`Please enter the quantity`));
            return ;
        }
        if ( Number(amount)/state.leverage > Number(accountInfo.availableAmount)) {
            Toast(t(`Insufficient available balance`));
            return ;
        }
        if (childRef.current!.validate()) {
            return ;
        }
        state.loading = true;
        const isClose = false;
        const [signData, error] = await awaitWrap(signMsg({
            "quantity": state.quantity,
            "address": storeData.address,
            "expireTime": signExpire(),
            "contractPairId": pairInfo.id,
            "isClose": isClose,
            amount: 100
        })) ;
        if (!error) {
            const [res, error2] = await awaitWrap(addOrder({
                contractPairId: pairInfo.id,
                contractPositionId: 0,
                isClose: isClose,
                isLong: isLong,
                isMarket: state.orderType,
                price: state.orderType ? null : Number(state.price),
                quantity: Number(state.quantity),
                signHash: signData.signatrue,
                originMsg: signData.origin,
                lever: state.leverage,
                amount: 100
            }));
            if (!error2) {
                reset();
                reload();
                PubSub.publish(RELOAD_RECORD);
            }
        }
        state.loading = false;
    }

    function reset() {
        state.quantity = "";
        state.sliderValue = 0;
    }

    return (
        <TradeStyle>
            <Tab<boolean>
                options={[
                    {text: t(`Limit`), value: ORDER_TYPE.limit},
                    {text: t(`Market`), value: ORDER_TYPE.market}
                    ]}
                 onChange={(value) => state.orderType = value} />
            <div className={"grid-2"} style={{gridColumnGap: "10px", marginTop: "20px"}}>
                <LabelButton>{t(`Isolated`)}</LabelButton>
                <LabelButton onClick={() => {
                    OpenLeverageModal({
                        defaultValue: state.leverage,
                        callback(leverage: number): void {
                            state.leverage = leverage;
                        }
                    })
                }}>{state.leverage}x</LabelButton>
            </div>

            <Form childRef={childRef} ref={$form}>
                <BalanceBox className={"flex-sb"}>
                    <span>{t(`Available`)}</span>
                    <span style={{color: "#B2B6BC"}}>{fixedNumber(accountInfo.availableAmount, 4)} USDT</span>
                </BalanceBox>
                <Input label={t(`Price`)}
                       right={<div className={`flex-row`}>
                            <FontBtn>{t(`Last`)}</FontBtn>
                           <span>USDT</span>
                       </div>
                       }
                       inputStyle={{width: "110px"}}
                       placeholder={""}
                       hideTips={true}
                       regex={[{regStr: NUMBER_REG, tips: ""}]}
                       value={state.price}
                       onChange={(value) => state.price = value}  />
                <Input label={t(`Amount`)}
                       style={{marginTop: "14px"}}
                       placeholder={"BTC"}
                       value={state.quantity}
                       hideTips={true}
                       regex={[{regStr: NUMBER_REG, tips: ""}]}
                       maxDecimal={symbolDecimal}
                       onChange={(value) => {
                           state.quantity = value;
                           calcSliderValue();
                       }}/>
                <div style={{margin: "44px auto 20px"}}>
                    <RSlider marks={[{value: 0},{value: 25},{value: 50},{value: 75},{value: 100}]}
                             tipFormatter={tipFormatter}
                             disabled={state.disabledCtroll}
                             value={state.sliderValue}
                             stepClassName={state.isRISE?"":"down"}
                             onChange={(value) => {
                                state.sliderValue = value;
                                calcQuantity();
                             }}></RSlider>
                </div>
                <FeeBox className={"flex-sb"}>
                    <span>{t(`Fee`)}</span>
                    <span style={{color: "#B2B6BC"}}>0.000 USDT</span>
                </FeeBox>
                <FeeBox className={"flex-sb"}>
                    <span>{t(`Total`)}</span>
                    <span style={{color: "#B2B6BC"}}>{amount} USDT</span>
                </FeeBox>
                {/*<TotleAmount className={"disabled"}>{t(`Total(BTC)`)}</TotleAmount>*/}
                <ButtonGroup className={"grid-2"}>
                    <LoadButton loading={state.loading} className={"btn Long"} onClick={() => submit(true)}>{getOrderType(true, t)}</LoadButton>
                    <LoadButton loading={state.loading} className={"btn Short"} onClick={() => submit(false)}>{getOrderType(false, t)}</LoadButton>
                </ButtonGroup>
            </Form>
            {/*<SettlementModal />*/}
        </TradeStyle>
    )
}
