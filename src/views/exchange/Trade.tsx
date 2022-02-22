import React, {useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import Tab from 'src/components/tab/Tab';
import {Direction, FeeBox, InputLabel, Lever, LeverageBtn, Submit, TradeStyle} from './styles/Trade.style';
import {useEffectState} from "src/hooks/useEffectState";
import Form from "src/components/form/Form";
import Input from "src/components/form/Input";
import useExchangeStore from "./ExchangeProvider";
import {addOrder, IAccount} from "src/ajax/contract/contract";
import {ORDER_DIRECTION, ORDER_TYPE} from "src/common/enum";
import {signExpire, signMsg} from "src/contract/wallet";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Decimal from "decimal.js";
import {
    awaitWrap,
    fixedNumber,
    fixedNumberStr,
    isInputNumber,
    isIntNumber,
    isNumber,
    showMessage
} from "src/common/utilTools";
import PubSub from "pubsub-js";
import {RELOAD_RECORD, USER_SELECT_PRICE} from "src/common/PubSubEvents";
import useTheme from "src/hooks/useTheme";
import Toggle from "src/components/toggle/Toggle";
import InputNumber from "src/components/inputNumber/InputNumber";
import Divider from "../../components/divider/Divider";
import {NUMBER_REG} from "../../common/regExp";
import {Toast} from "../../components/toast/Toast";
import {mapExchangeDispatch} from "./exchangeReducer";

type IProps = {
    longPrice: string
    shortPrice: string
}
export default function Trade(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [ reducerState, dispatch ] = useExchangeStore();
    const mapDispatch = mapExchangeDispatch(dispatch);
    const childRef = useRef<{ validate(): boolean }>();
    const $form = useRef<HTMLFormElement>();
    const {theme} = useTheme();

    const placeholderText = "0.0000";
    const state = useEffectState({
        orderType: ORDER_TYPE.limit,   //false：Limit，true：Market
        sliderValue: 0,
        isRISE: true,
        isLong: true,
        disabledCtroll: false,
        quantity: "",
        quantityPlaceholder: placeholderText,
        price: "",
        pricePlaceholder: placeholderText,
        balance: 0,
        loading: false,
        accountInfo: {} as IAccount,
        percent: 0,
        levers: [5, 10 ,20]
    });
    const symbolDecimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;
    const settleDecimal = useMemo(() => {
        //return reducerState.currentPairDecimal;
        return 3;
    }, [reducerState.currentPairDecimal]);
    /* Currently selected trading pairs */
    //const pairInfo = useCurrentPairInfo();, textAlign: "right
    /*Get contract account information*/
    //const { accountInfo, reloadData } = useAccountInfo(reducerState.currentPair.settleCoinId);
    /* Total amount of orders placed */
    const orderDirections = useMemo(() => {
        return [
            {text: t(`Buy`), isLong: ORDER_DIRECTION.buy},
            {text: t(`Sell`), isLong: ORDER_DIRECTION.sell},
        ]
    }, [t]);
    const isLimit = useMemo(() => {
        return state.orderType === ORDER_TYPE.limit;
    }, [state.orderType]);
    const isMarket = useMemo(() => {
        return state.orderType === ORDER_TYPE.market;
    }, [state.orderType]);
    const disabledAddOrder = useMemo(() => {
        return state.loading || !state.quantity || (state.orderType === ORDER_TYPE.limit && !state.price);
    }, [state.loading, state.orderType, state.quantity, state.price]);
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
    /*useEffect(() => {
        let lever = Number(reducerState.leverage);
        if (!reducerState.leverage || !isNumber(reducerState.leverage)) {
            showMessage(t(`Please enter leverage`));
        } else if(lever < reducerState.currentPair.minLever) {
            showMessage(t(`Below leverage min：`) + reducerState.currentPair.minLever);
        } else if(lever > reducerState.currentPair.maxLever){
            showMessage(t(`Exceeds leverage maximum：`) + reducerState.currentPair.maxLever);
        }
    }, [t, reducerState.leverage, reducerState.currentPair]);*/

    const amount = useMemo(() => {
        if (!state.quantity || !state.price || !isNumber(state.quantity)) {
            return "0.000";
        }
        return fixedNumber(Decimal.mul(state.quantity, state.price).toFixed(), 3)
    }, [state.quantity, state.price]);
    const longMargin = useMemo(() => {
        if (!state.quantity || !reducerState.leverage) {
            return "0";
        }
        if (isLimit) {
            let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            return amount;
        } else {
            let _price = props.shortPrice || reducerState.marketPrice;
            let calcPrice = Decimal.mul(_price, 1 + 0.0005);
            let amount = Decimal.mul(calcPrice, state.quantity).div(reducerState.leverage).toFixed();
            return amount;
            /* (marker price + marker price/leverage)*quantity/leverage */
            // let a = Decimal.div(reducerState.marketPrice, reducerState.leverage).toFixed();
            // let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(reducerState.leverage).toFixed();
            return amount
        }
    }, [isLimit, state.price, state.quantity, reducerState.leverage, reducerState.marketPrice, props.shortPrice]);
    const longFee = useMemo(() => {
        let margin = longMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [longMargin, reducerState.currentPair.tradeFeeRate]);
    const shortMargin = useMemo(() => {
        if (!state.quantity || !reducerState.leverage) {
            return "0";
        }
        if (isLimit) {
            let arr = [state.price, props.longPrice];
            let r = arr.filter((item) => !!item);
            // @ts-ignore
            let maxPrice = Math.max(...r);
            console.log("maxPrice", maxPrice)
            let amount = Decimal.mul(maxPrice || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            return amount;
        } else if (reducerState.marketPrice){
            let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
            let amount = Decimal.mul(_price, state.quantity).div(reducerState.leverage).toFixed();
            return amount
        } else {
            return "0";
        }
    }, [isLimit, state.price, state.quantity, reducerState.leverage, reducerState.marketPrice, props.longPrice]);
    const shortFee = useMemo(() => {
        let margin = shortMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [shortMargin, reducerState.currentPair.tradeFeeRate]);

    const ExpectedPrice = useMemo(() => {
        if (state.isLong) {
            let _price = props.shortPrice || reducerState.marketPrice;
            return Decimal.mul(_price, 1 + 0.0005).toFixed();
        } else {
            return props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
        }
    }, [state.isLong, props.longPrice, props.shortPrice, reducerState.marketPrice]);
    const orderTotalAmount = useMemo(() => {
        if (!state.quantity || !reducerState.leverage) {
            return "0";
        }
        if (isLimit) {
            if (state.isLong) {
                return Decimal.mul(state.price || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            } else {
                let arr = [state.price, props.longPrice];
                let r = arr.filter((item) => !!item);
                // @ts-ignore
                let maxPrice = Math.max(...r);
                return Decimal.mul(maxPrice || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            }
        } else if(ExpectedPrice) {
            return Decimal.mul(ExpectedPrice, state.quantity).div(reducerState.leverage).toFixed();
        } else {
            return "0";
        }
        /*if (state.isLong) {
            if (isLimit) {
                return Decimal.mul(state.price || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            } else {
                /!*let _price = props.shortPrice || reducerState.marketPrice;
                let calcPrice = Decimal.mul(_price, 1 + 0.0005);*!/
                return Decimal.mul(ExpectedPrice, state.quantity).div(reducerState.leverage).toFixed();
            }
        } else {
            if (isLimit) {
                let arr = [state.price, props.longPrice];
                let r = arr.filter((item) => !!item);
                // @ts-ignore
                let maxPrice = Math.max(...r);
                return Decimal.mul(maxPrice || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
            } else if (reducerState.marketPrice){
                //let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
                return Decimal.mul(ExpectedPrice, state.quantity).div(reducerState.leverage).toFixed()
            } else {
                return "0";
            }
        }*/
    }, [state.isLong, isLimit, state.price, state.quantity, reducerState.leverage, props.longPrice, ExpectedPrice]);
    const orderFee = useMemo(() => {
        let margin = orderTotalAmount || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [orderTotalAmount, reducerState.currentPair.tradeFeeRate]);

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
    }, [props.longPrice, props.shortPrice, isLimit, reducerState.currentPair.tradeFeeRate, state.price, reducerState.marketPrice, reducerState.accountInfo.availableAmount, reducerState.leverage, state.percent, state.orderType]);
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
            let quantity = Decimal.mul(margin, reducerState.leverage).div(price).toFixed();
            state.quantity = fixedNumberStr(quantity, symbolDecimal)
        } else {
            let long_price = props.shortPrice || reducerState.marketPrice;
            let calcPrice = Decimal.mul(long_price, 1 + 0.0005);

            let quantity_long = Decimal.mul(margin, reducerState.leverage).div(calcPrice).toFixed();
            let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
            let quantity_short = Decimal.mul(margin, reducerState.leverage).div(_price).toFixed();

            let quantity = Number(quantity_long) > Number(quantity_short) ? quantity_short : quantity_long;
            state.quantity = fixedNumberStr(quantity, symbolDecimal);
        }



        // if (isLimit) {
        //     //let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(reducerState.leverage).toFixed();
        //
        //     sum = Decimal.mul(margin, reducerState.leverage).div(state.price).toFixed();
        // } else {
        //     let a = Decimal.div(reducerState.marketPrice, reducerState.leverage).toFixed();
        //     let s = Decimal.add(a, reducerState.marketPrice);
        //     sum =  Decimal.mul(margin, reducerState.leverage).div(s).toFixed();
        // }
        // state.quantity = sum;
        /*let a = Decimal.div(reducerState.marketPrice, reducerState.leverage).toFixed();
        let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(reducerState.leverage).toFixed();

        let R = Decimal.add(1, fe).mul(price);
        let quantity = Decimal.mul(reducerState.accountInfo.availableAmount, reducerState.leverage).mul(percent).div(R).toFixed(symbolDecimal);
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
        let totalAmount = Decimal.mul(state.quantity, state.price).div(reducerState.leverage).toFixed();
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

    async function submit() {
        if (isLimit && !Number(state.price)) {
            showMessage(t(`Please enter the price`));
            return ;
        }
        if (!isNumber(reducerState.leverage)) {
            showMessage(t(`Please enter leverage`));
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
        if (Number(state.quantity) > Number(reducerState.currentPair.maxCount)) {
            showMessage(t(`Exceed the maximum：`) +  reducerState.currentPair.maxCount);
            return ;
        }
        if (Number(state.quantity) < Number(reducerState.currentPair.minCount)) {
            showMessage(t(`Less than minimum：`) +  reducerState.currentPair.minCount);
            return ;
        }
        if ( Decimal.div(amount, reducerState.leverage).toNumber() > Number(reducerState.accountInfo.availableAmount)) {
            showMessage(t(`Insufficient available balance`));
            return ;
        }
        if (childRef.current!.validate()) {
            return ;
        }
        state.loading = true;
        const isClose = false;
        const total = state.isLong ? Decimal.mul(longMargin, reducerState.leverage).toFixed() : Decimal.mul(shortMargin, reducerState.leverage).toFixed();
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
                isLong: state.isLong,
                isMarket: state.orderType,
                quantity: Number(state.quantity),
                signHash: signData.signatrue,
                originMsg: signData.origin,
                lever: Number(reducerState.leverage),
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
            <div style={{flex: 1, padding: "0.16rem 0"}}>
                {/*<div>
                    <LabelButton>{t(`Isolated`)}</LabelButton>
                    <LabelButton onClick={() => {
                        openModal<ILeverageModal>(LeverageModal, {
                            defaultValue: String(reducerState.leverage),
                            callback(leverage): void {
                                if (isNumber(leverage)) {
                                    reducerState.leverage = Number(leverage);
                                }
                            }
                        })
                    }}>{t(`Leverage`)} {reducerState.leverage}x</LabelButton>
                </div>*/}
                <Form childRef={childRef} ref={$form}
                      style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
                    <div>
                        <Direction className={"borderRadius"} style={{marginBottom: "0.16rem"}}>
                            {
                                orderDirections.map((item, index) => {
                                    return <button className={`button font12 
                                ${item.isLong ? '' : 'sell'} 
                                ${state.isLong === item.isLong ? 'active' : ''}`}
                                                   onClick={() => state.isLong = item.isLong}>{item.text}</button>
                                })
                            }
                        </Direction>
                        {/*<BalanceBox className={"flex-row"}>
                        <span className={"label"}>{t(`Avbl`)}</span>
                        <span style={{color: theme.colors.baseColor}}>{reducerState.accountInfo.availableAmount}</span>
                        <span className={"unit"}>USDT</span>
                    </BalanceBox>*/}
                        <Toggle vIf={isLimit}>
                            <div>
                                <InputLabel>
                                    <span>{t(`Price`)}</span>
                                    <span className={"explain"}>{t(`Set Order Price`)}</span>
                                </InputLabel>
                                <InputNumber
                                    inputStyle={{textAlign: "left"}}
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
                            </div>
                        </Toggle>
                        <div style={{marginTop: "0.12rem"}}>
                            <InputLabel>
                                <span>{t(`Amount`)}</span>
                                <span className={"explain"}>{t(`Set Order Size`)}</span>
                            </InputLabel>
                            <InputNumber
                                inputStyle={{textAlign: "left"}}
                                right={<span style={{color: theme.colors.labelColor}}>{reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol}</span>}
                                placeholder={state.quantityPlaceholder}
                                value={state.quantity}
                                maxDecimal={symbolDecimal}
                                onChange={(value) => {
                                    state.percent = 0;
                                    state.quantity = value;
                                    //calcSliderValue();
                                }}/>
                        </div>
                        {/*<div style={{textAlign: "right", marginTop: "12px"}}>
                       <span className={"label"} style={{marginRight: "4px"}}>{t(`Order Value`)}</span>
                       <span>≈{fixedNumber(orderValue, settleDecimal)} USDT</span>
                   </div>*/}
                        <Divider style={{margin: "0.16rem 0"}}>{t(`OR`)}</Divider>
                        <InputLabel>
                            <span>{t(`Leverage`)}</span>
                            <span className={"explain"}>{t(`Up to 10x`)}</span>
                        </InputLabel>
                        <div style={{position: "relative"}} className={"flex-row"}>
                            <Lever className={"flex-sb"}>
                                <div className={"flex-row"}>
                                    <Toggle vIf={!!reducerState.leverage}>
                                        <span>{reducerState.leverage}x</span>
                                    </Toggle>
                                    <input type="text" className={"leverText"} value={reducerState.leverage} onChange={(event) => {
                                        let value = event.target.value;
                                        if ((value === "" || isIntNumber(value))) {
                                            let number_val = Number(value);
                                            if(value && number_val < reducerState.currentPair.minLever) {
                                                showMessage(t(`Below leverage min：`) + reducerState.currentPair.minLever);
                                            } else if(number_val > reducerState.currentPair.maxLever){
                                                showMessage(t(`Exceeds leverage maximum：`) + reducerState.currentPair.maxLever);
                                            } else {
                                                //reducerState.leverage = value;
                                                mapDispatch.setLeverage(value);
                                            }
                                        }
                                    }} />
                                </div>
                                <div>
                                    {
                                        state.levers.map((item, index) => {
                                            return <LeverageBtn className={`${Number(reducerState.leverage) === item ? 'active' : ''}`} key={index}
                                                                onClick={() => mapDispatch.setLeverage(String(item))}>{item}x</LeverageBtn>
                                        })
                                    }
                                </div>
                            </Lever>
                            {/*<Input
                                value={reducerState.leverage}
                                inputStyle={{width: "1rem"}}
                                placeholder={"0x"}
                                onChange={(value) => {
                                    reducerState.leverage = value;
                                }}
                                left={<span>{reducerState.leverage}x</span>}
                                right={
                                    <>
                                        {
                                            state.levers.map((item, index) => {
                                                return <LeverageBtn className={`${Number(reducerState.leverage) === item ? 'active' : ''}`} key={index}
                                                                    onClick={() => reducerState.leverage = String(item)}>{item}x</LeverageBtn>
                                            })
                                        }
                                    </>
                                } />*/}
                        </div>
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
                    {/*<Percent<number>
                        data={[{value: 25},{value: 50},{value: 75},{value: 100}]}
                        value={state.percent}
                        onChange={(value) => {
                            state.percent = value
                        }} />*/}
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
                    <div>
                        <Toggle vIf={state.orderType === ORDER_TYPE.market}>
                            <FeeBox>
                                <div className={"label"}>{t(`Expected Price`)}</div>
                                <div>{fixedNumberStr(ExpectedPrice, settleDecimal) || "--"} USDT</div>
                            </FeeBox>
                        </Toggle>
                        <FeeBox>
                            <div className={"label"}>{t(`Fee`)}</div>
                            <div>{fixedNumberStr(orderFee, settleDecimal) || "--"} USDT</div>
                        </FeeBox>
                        <FeeBox>
                            <div className={"label"}>{t(`Total`)}</div>
                            <div>{fixedNumberStr(Decimal.add(orderFee || 0, orderTotalAmount || 0).toFixed(), settleDecimal) || "--"} USDT</div>
                        </FeeBox>
                        <Submit className={`font12 borderRadius ${state.isLong ? '' : 'sell'}`}
                                disabled={disabledAddOrder}
                                onClick={submit}>{ state.orderType === ORDER_TYPE.market ? t(`Place Market Order`) : t(`Place Limit Order`)}</Submit>
                    </div>
                    {/*<ButtonGroup className={"grid-2"}>
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
                    </ButtonGroup>*/}
                </Form>
            </div>
            {/*<SettlementModal />*/}
        </TradeStyle>
    )
}
