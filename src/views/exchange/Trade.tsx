import React, {useEffect, useMemo, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'src/components/tab/Tab';
import {BalanceBox, ButtonGroup, FeeBox, LabelButton, TradeStyle} from './styles/Trade.style';
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
import {ILeverageModal, LeverageModal} from "src/components/LeverageModal/LeverageModal";
import Decimal from "decimal.js";
import {awaitWrap, fixedNumber, fixedNumberStr, isNumber, showMessage} from "src/common/utilTools";
import PubSub from "pubsub-js";
import {getOrderType} from "./config";
import {RELOAD_RECORD, USER_SELECT_PRICE} from "src/common/PubSubEvents";
import useTheme from "src/hooks/useTheme";
import Toggle from "src/components/toggle/Toggle";
import Percent from "src/components/percent/Percent";
import InputNumber from "src/components/inputNumber/InputNumber";
import openModal from "../../components/openModal";
import SettlementModal from "./SettlementModal";

type IProps = {
    longPrice: string
    shortPrice: string
}
export default function Trade(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [ reducerState, dispath ] = useExchangeStore();
    const childRef = useRef<{ validate(): boolean }>();
    const $form = useRef<HTMLFormElement>();
    const {theme} = useTheme();

    const placeholderText = "0.0000";
    const state = useEffectState({
        orderType: ORDER_TYPE.limit,   //false：Limit，true：Market
        sliderValue: 0,
        leverage: 10,
        isRISE: true,
        disabledCtroll: false,
        quantity: "",
        quantityPlaceholder: placeholderText,
        price: "",
        pricePlaceholder: placeholderText,
        balance: 0,
        loading: false,
        accountInfo: {} as IAccount,
        percent: 0
    });
    const symbolDecimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;
    const settleDecimal = useMemo(() => {
        return reducerState.currentPairDecimal;
    }, [reducerState.currentPairDecimal]);
    /* Currently selected trading pairs */
    //const pairInfo = useCurrentPairInfo();, textAlign: "right
    /*Get contract account information*/
    //const { accountInfo, reloadData } = useAccountInfo(reducerState.currentPair.settleCoinId);
    /* Total amount of orders placed */
    const isLimit = useMemo(() => {
        return state.orderType === ORDER_TYPE.limit;
    }, [state.orderType]);
    const isMarket = useMemo(() => {
        return state.orderType === ORDER_TYPE.market;
    }, [state.orderType]);
    useEffect(() => {
        const namespace = PubSub.subscribe(USER_SELECT_PRICE, (event: string, price: string) => {
            if (isLimit) {
                state.price = price;
            }
        });

        return () => {
            PubSub.unsubscribe(namespace);
        }
    }, [isLimit]);
    const amount = useMemo(() => {
        if (!state.quantity || !state.price || !isNumber(state.quantity)) {
            return "0.000";
        }
        return fixedNumber(Decimal.mul(state.quantity, state.price).toFixed(), 3)
    }, [state.quantity, state.price]);
    const longMargin = useMemo(() => {
        if (!state.quantity) {
            return "0";
        }
        if (isLimit) {
            let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(state.leverage).toFixed();
            return amount;
        } else {
            let _price = props.shortPrice || reducerState.marketPrice;
            let calcPrice = Decimal.mul(_price, 1 + 0.0005);
            let amount = Decimal.mul(calcPrice, state.quantity).div(state.leverage).toFixed();
            return amount;
            /* (marker price + marker price/leverage)*quantity/leverage */
            // let a = Decimal.div(reducerState.marketPrice, state.leverage).toFixed();
            // let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(state.leverage).toFixed();
            return amount
        }
    }, [isLimit, state.price, state.quantity, state.leverage, reducerState.marketPrice, props.shortPrice]);
    const longFee = useMemo(() => {
        let margin = longMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [longMargin, reducerState.currentPair.tradeFeeRate]);
    const shortMargin = useMemo(() => {
        if (!state.quantity) {
            return "0";
        }
        if (isLimit) {
            let arr = [state.price, props.longPrice];
            let r = arr.filter((item) => !!item);
            // @ts-ignore
            let maxPrice = Math.max(...r);
            console.log("maxPrice", maxPrice)
            let amount = Decimal.mul(maxPrice || 0, state.quantity || 0).div(state.leverage).toFixed();
            return amount;
        } else if (reducerState.marketPrice){
            let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
            let amount = Decimal.mul(_price, state.quantity).div(state.leverage).toFixed();
            return amount
        } else {
            return "0";
        }
    }, [isLimit, state.price, state.quantity, state.leverage, reducerState.marketPrice, props.longPrice]);
    const shortFee = useMemo(() => {
        let margin = shortMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [shortMargin, reducerState.currentPair.tradeFeeRate]);

    const orderValue = useMemo(() => {
        if (!state.quantity) {
            return "";
        }
        if (isLimit && state.price) {
            return Decimal.mul(state.quantity, state.price).toFixed();
        } else if(reducerState.marketPrice) {
            return Decimal.mul(reducerState.marketPrice, state.quantity).toFixed();
        } else {
            return "";
        }

    }, [state.quantity, isLimit, state.price, reducerState.marketPrice]);

    useEffect(() => {
        //calcSliderValue();
        calcQuantity();
    }, [props.longPrice, props.shortPrice, isLimit, reducerState.currentPair.tradeFeeRate, state.price, reducerState.marketPrice, reducerState.accountInfo.availableAmount, state.leverage, state.percent, state.orderType]);
    /*Calculate the number of*/
    function calcQuantity() {
        let price = isLimit ? state.price : reducerState.marketPrice;
        if (!price || !reducerState.accountInfo.availableAmount || !state.percent || !reducerState.currentPair.tradeFeeRate) {
            //state.quantity = "";
            return;
        }
        let percent = Decimal.div(state.percent, 100).toFixed();
        let fe = Decimal.div(reducerState.currentPair.tradeFeeRate, 100);
        let RR = Decimal.add(1, fe);
        let sum = "0";
        let margin = Decimal.mul(reducerState.accountInfo.availableAmount, percent).div(RR);

        /* 分别计算多头、空头的数量， 取最小价 */
        /* 市价且空头 */
        if (isLimit) {
            let quantity = Decimal.mul(margin, state.leverage).div(price).toFixed();
            state.quantity = fixedNumberStr(quantity, symbolDecimal)
        } else {
            let long_price = props.shortPrice || reducerState.marketPrice;
            let calcPrice = Decimal.mul(long_price, 1 + 0.0005);

            let quantity_long = Decimal.mul(margin, state.leverage).div(calcPrice).toFixed();
            let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
            let quantity_short = Decimal.mul(margin, state.leverage).div(_price).toFixed();

            let quantity = Number(quantity_long) > Number(quantity_short) ? quantity_short : quantity_long;
            state.quantity = fixedNumberStr(quantity, symbolDecimal);
        }



        // if (isLimit) {
        //     //let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(state.leverage).toFixed();
        //
        //     sum = Decimal.mul(margin, state.leverage).div(state.price).toFixed();
        // } else {
        //     let a = Decimal.div(reducerState.marketPrice, state.leverage).toFixed();
        //     let s = Decimal.add(a, reducerState.marketPrice);
        //     sum =  Decimal.mul(margin, state.leverage).div(s).toFixed();
        // }
        // state.quantity = sum;
        /*let a = Decimal.div(reducerState.marketPrice, state.leverage).toFixed();
        let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(state.leverage).toFixed();

        let R = Decimal.add(1, fe).mul(price);
        let quantity = Decimal.mul(reducerState.accountInfo.availableAmount, state.leverage).mul(percent).div(R).toFixed(symbolDecimal);
        state.quantity = Number(quantity).toString();*/
    }
    /* Calculate the value of the slider */
    function calcSliderValue() {
        if (!state.price || !storeData.token || reducerState.accountInfo.availableAmount === "0" || !state.quantity) {
            state.sliderValue = 0;
            return;
        }
        if (!isNumber(state.quantity)) {
            return;
        }
        let totalAmount = Decimal.mul(state.quantity, state.price).div(state.leverage).toFixed();
        let val = Decimal.div(totalAmount, reducerState.accountInfo.availableAmount).mul(100).toFixed();

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
        if (isLimit && !Number(state.price)) {
            showMessage(t(`Please enter the price`));
            return ;
        }
        if (isMarket && !reducerState.marketPrice) {
            showMessage(t(`No marker price obtained`));
            return ;
        }
        if (!state.quantity) {
            showMessage(t(`Please enter the quantity`));
            return ;
        }
        if ( Number(amount)/state.leverage > Number(reducerState.accountInfo.availableAmount)) {
            showMessage(t(`Insufficient available balance`));
            return ;
        }
        if (childRef.current!.validate()) {
            return ;
        }
        state.loading = true;
        const isClose = false;
        const total = isLong ? Decimal.mul(longMargin, state.leverage).toFixed() : Decimal.mul(shortMargin, state.leverage).toFixed();
        const [signData, error] = await awaitWrap(signMsg({
            "quantity": state.quantity,
            "address": storeData.address,
            "expireTime": signExpire(),
            "contractPairId": reducerState.currentPair.id,
            "isClose": isClose,
            amount: total
        }, storeData.address)) ;
        if (!error) {
            let reqParams = {
                contractPairId: reducerState.currentPair.id,
                contractPositionId: 0,
                isClose: isClose,
                isLong: isLong,
                isMarket: state.orderType,
                quantity: Number(state.quantity),
                signHash: signData.signatrue,
                originMsg: signData.origin,
                lever: state.leverage,
                amount: total
            };
            if (isLimit) {
                // @ts-ignore
                reqParams.price = Number(state.price);
            }
            const [res, error2] = await awaitWrap(addOrder(reqParams));
            if (!error2) {
                reset();
                //reloadData();
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
                    {text: t(`Market`), value: ORDER_TYPE.market},
                    {text: t(`Limit`), value: ORDER_TYPE.limit}
                    ]}
                 onChange={(value) => {
                     state.quantity = "";
                     state.percent = 0;
                     state.orderType = value;
                 }} />
            <div style={{marginTop: "20px"}}>
                <div>
                    {/*<LabelButton>{t(`Isolated`)}</LabelButton>*/}
                    <LabelButton onClick={() => {
                        openModal<ILeverageModal>(LeverageModal, {
                            defaultValue: String(state.leverage),
                            callback(leverage): void {
                                if (isNumber(leverage)) {
                                    state.leverage = Number(leverage);
                                }
                            }
                        })
                    }}>{t(`Leverage`)} {state.leverage}x</LabelButton>
                </div>

                <Form childRef={childRef} ref={$form}>
                    <BalanceBox className={"flex-row"}>
                        <span className={"label"}>{t(`Avbl`)}</span>
                        <span style={{color: theme.colors.baseColor}}>{reducerState.accountInfo.availableAmount}</span>
                        <span className={"unit"}>USDT</span>
                    </BalanceBox>
                    <Toggle vIf={isLimit}>
                        <InputNumber
                               label={t(`Price`)}
                               right={<div className={`flex-row`}>
                                   <span>USDT</span>
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
                           style={{marginTop: "14px"}}
                           right={<span>{reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol}</span>}
                           placeholder={state.quantityPlaceholder}
                           value={state.quantity}
                           maxDecimal={symbolDecimal}
                           onChange={(value) => {
                               state.percent = 0;
                               state.quantity = value;
                               //calcSliderValue();
                           }}/>
                   <div style={{textAlign: "right", marginTop: "12px"}}>
                       <span className={"label"} style={{marginRight: "4px"}}>{t(`Order Value`)}</span>
                       <span>≈{fixedNumber(orderValue, settleDecimal)} USDT</span>
                   </div>
                    {/*<div style={{margin: "44px auto 20px"}}>
                        <RSlider marks={[{value: 0},{value: 25},{value: 50},{value: 75},{value: 100}]}
                                 tipFormatter={tipFormatter}
                                 disabled={state.disabledCtroll}
                                 value={state.sliderValue}
                                 stepClassName={state.isRISE?"":"down"}
                                 onChange={(value) => {
                                     state.sliderValue = value;
                                     calcQuantity();
                                 }}></RSlider>
                    </div>*/}
                    <Percent<number>
                        data={[{value: 25},{value: 50},{value: 75},{value: 100}]}
                        value={state.percent}
                        onChange={(value) => {
                            state.percent = value
                        }} />
                    {/*<Percent>
                        {
                            [{value: 25},{value: 50},{value: 75},{value: 100}].map((item, index) => {
                                return <div className={`flex-box percentItem ${state.percent === item.value ? 'active' : ''}`}
                                            onClick={() => {
                                                state.percent = item.value;
                                            }}>{item.value}%</div>
                            })
                        }
                    </Percent>*/}
                    {/*<FeeBox className={"flex-sb"}>
                    <span>{t(`Fee`)}</span>
                    <span style={{color: "#B2B6BC"}}>0.000 USDT</span>
                </FeeBox>
                <FeeBox className={"flex-sb"}>
                    <span>{t(`Total`)}</span>
                    <span style={{color: "#B2B6BC"}}>{amount} USDT</span>
                </FeeBox>*/}
                    {/*<TotleAmount className={"disabled"}>{t(`Total(BTC)`)}</TotleAmount>*/}
                    <ButtonGroup className={"grid-2"}>
                        <div>
                            <LoadButton
                                loading={state.loading}
                                className={"btn Long"}
                                onClick={() => submit(true)}>{getOrderType(true, t)}</LoadButton>
                            <FeeBox>
                                <div className={"label"}>{t(`Fees:`)}</div>
                                <div>{fixedNumber(longFee, settleDecimal) || "--"} USDT</div>
                            </FeeBox>
                            <FeeBox>
                                <div className={"label"}>{t(`Total:`)}</div>
                                <div>{fixedNumber(Decimal.add(longFee || 0, longMargin || 0).toFixed(), settleDecimal) || "--"} USDT</div>
                            </FeeBox>
                        </div>
                        <div style={{textAlign: "right"}}>
                            <LoadButton loading={state.loading}
                                        className={"btn Short"}
                                        onClick={() => submit(false)}>{getOrderType(false, t)}</LoadButton>
                            <FeeBox style={{justifyContent: "flex-end"}}>
                                <div className={"label"}>{t(`Fees:`)}</div>
                                <div>{fixedNumber(shortFee, settleDecimal) || "--"} USDT</div>
                            </FeeBox>
                            <FeeBox style={{justifyContent: "flex-end"}}>
                                <div className={"label"}>{t(`Total:`)}</div>
                                <div>{fixedNumber(Decimal.add(shortFee || 0, shortMargin || 0).toFixed(), settleDecimal) || "--"} USDT</div>
                            </FeeBox>
                        </div>
                    </ButtonGroup>
                </Form>
            </div>
            {/*<SettlementModal />*/}
        </TradeStyle>
    )
}
