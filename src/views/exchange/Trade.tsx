import React, {useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import Tab from 'src/components/tab/Tab';
import {Direction, FeeBox, InputLabel, Lever, LeverageBtn, Submit, TradeStyle} from './styles/Trade.style';
import {useEffectState} from "src/hooks/useEffectState";
import Form from "src/components/form/Form";
import useExchangeStore from "./ExchangeProvider";
import {addOrder, IAccount} from "src/ajax/contract/contract";
import {ORDER_DIRECTION, ORDER_TYPE} from "src/common/enum";
import {signExpire} from "src/contract/wallet";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Decimal from "decimal.js";
import {
    awaitWrap,
    fixedNumber,
    fixedNumberStr, formatUSDT,
    isIntNumber,
    isNumber,
    showMessage
} from "src/common/utilTools";
import PubSub from "pubsub-js";
import {RELOAD_RECORD, USER_SELECT_PRICE} from "src/common/PubSubEvents";
import useTheme from "src/hooks/useTheme";
import Toggle from "src/components/toggle/Toggle";
import InputNumber from "src/components/inputNumber/InputNumber";
import Divider from "src/components/divider/Divider";
import {exchangeActions, mapExchangeDispatch} from "./exchangeReducer";
import {USDT_decimal_show} from "src/config";
import {usePluginModel} from "src/hooks/usePluginModel";
import {fetchPost, useFetchGet, useFetchPost} from "../../ajax";
import { useAccountLever } from 'src/ajax/user/user.type';

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
    const {signMsg} = usePluginModel();
    const placeholderText = "0.0000";
    const state = useEffectState({
        orderType: ORDER_TYPE.limit,   //false：Limit，true：Market
        sliderValue: 0,
        isRISE: true,
        isLong: true,
        disabledCtroll: false,
        quantity: "",
        quantityUSDT: "",
        reversePair: false,   // false: Symbol to USDT,  true: USDT to Symbol
        quantityPlaceholder: placeholderText,
        price: "",
        pricePlaceholder: placeholderText,
        balance: 0,
        loading: false,
        accountInfo: {} as IAccount,
        percent: 0,
        lever:  localStorage.getItem("leverage") || "",
        levers: [5, 10 ,20],
        showTogglePair: false
    });
    const symbolDecimal = reducerState.currentPair.settleCoin && reducerState.currentPair.settleCoin.settleDecimal || 4;
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
        let lever = Number(state.lever);
        if (!state.lever || !isNumber(state.lever)) {
            showMessage(t(`Please enter leverage`));
        } else if(lever < reducerState.currentPair.minLever) {
            showMessage(t(`Below leverage min：`) + reducerState.currentPair.minLever);
        } else if(lever > reducerState.currentPair.maxLever){
            showMessage(t(`Exceeds leverage maximum：`) + reducerState.currentPair.maxLever);
        }
    }, [t, state.lever, reducerState.currentPair]);*/

    const { data: leverData, reload: reloadLever } = useAccountLever({contractPairId: reducerState.currentPair.id}, [reducerState.currentPair.id, storeData.token]);

    useEffect(() => {
        if (leverData.lever) {
            state.lever = String(leverData.lever);
            localStorage.setItem("leverage", String(leverData.lever));
        }
    }, [leverData.lever]);

    const amount = useMemo(() => {
        if (!state.quantity || !state.price || !isNumber(state.quantity)) {
            return "0.000";
        }
        return fixedNumber(Decimal.mul(state.quantity, state.price).toFixed(), 3)
    }, [state.quantity, state.price]);
    const longMargin = useMemo(() => {
        if (!state.quantity || !state.lever) {
            return "0";
        }
        if (isLimit) {
            let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(state.lever).toFixed();
            return amount;
        } else {
            let _price = props.shortPrice || reducerState.marketPrice || 0;
            let calcPrice = Decimal.mul(_price, 1 + 0.0005);
            let amount = Decimal.mul(calcPrice, state.quantity).div(state.lever).toFixed();
            return amount;
            /* (marker price + marker price/leverage)*quantity/leverage */
            // let a = Decimal.div(reducerState.marketPrice, state.lever).toFixed();
            // let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(state.lever).toFixed();
            return amount
        }
    }, [isLimit, state.price, state.quantity, state.lever, reducerState.marketPrice, props.shortPrice]);
    const longFee = useMemo(() => {
        let margin = longMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [longMargin, reducerState.currentPair.tradeFeeRate]);
    const shortMargin = useMemo(() => {
        if (!state.quantity || !state.lever) {
            return "0";
        }
        if (isLimit) {
            let arr = [state.price, props.longPrice];
            let r = arr.filter((item) => !!item);
            // @ts-ignore
            let maxPrice = Math.max(...r);
            console.log("maxPrice", maxPrice)
            let amount = Decimal.mul(maxPrice || 0, state.quantity || 0).div(state.lever).toFixed();
            return amount;
        } else if (reducerState.marketPrice){
            let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
            let amount = Decimal.mul(_price, state.quantity).div(state.lever).toFixed();
            return amount
        } else {
            return "0";
        }
    }, [isLimit, state.price, state.quantity, state.lever, reducerState.marketPrice, props.longPrice]);
    const shortFee = useMemo(() => {
        let margin = shortMargin || 0;
        let rate = reducerState.currentPair.tradeFeeRate || 0;
        return Decimal.mul(margin, rate).div(100).toFixed();
    }, [shortMargin, reducerState.currentPair.tradeFeeRate]);

    const ExpectedPrice = useMemo(() => {
        if (state.isLong) {
            let _price = props.shortPrice || reducerState.marketPrice || 0;
            return Decimal.mul(_price, 1 + 0.0005).toFixed();
        } else {
            let c = reducerState.marketPrice || 0;
            return props.longPrice ? Math.max(Number(props.longPrice), c) : c;
        }
    }, [state.isLong, props.longPrice, props.shortPrice, reducerState.marketPrice]);

    const reversePrice = useMemo(() => {
        if (state.orderType === ORDER_TYPE.market) {
            return ExpectedPrice;
        } else {
            return state.price;
        }
    }, [state.orderType, ExpectedPrice, state.price]);

    useEffect(() => {
        if (state.reversePair && state.quantityUSDT && reversePrice) {
            state.quantity = fixedNumber(Decimal.div(state.quantityUSDT, reversePrice).toFixed(), symbolDecimal).toString();
        }
        if (!state.reversePair && state.quantity && reversePrice) {
            state.quantityUSDT = fixedNumber(Decimal.mul(state.quantity, reversePrice).toFixed(), symbolDecimal).toString();
        }
    }, [reversePrice, state.reversePair]);

    const orderTotalAmount = useMemo(() => {
        if (!state.quantity || !state.lever) {
            return "0";
        }
        if (isLimit) {
            if (state.isLong) {
                return Decimal.mul(state.price || 0, state.quantity || 0).div(state.lever).toFixed();
            } else {
                let arr = [state.price, props.longPrice];
                let r = arr.filter((item) => !!item);
                // @ts-ignore
                let maxPrice = Math.max(...r);
                return Decimal.mul(maxPrice || 0, state.quantity || 0).div(state.lever).toFixed();
            }
        } else if(ExpectedPrice) {
            return Decimal.mul(ExpectedPrice, state.quantity).div(state.lever).toFixed();
        } else {
            return "0";
        }
        /*if (state.isLong) {
            if (isLimit) {
                return Decimal.mul(state.price || 0, state.quantity || 0).div(state.lever).toFixed();
            } else {
                /!*let _price = props.shortPrice || reducerState.marketPrice;
                let calcPrice = Decimal.mul(_price, 1 + 0.0005);*!/
                return Decimal.mul(ExpectedPrice, state.quantity).div(state.lever).toFixed();
            }
        } else {
            if (isLimit) {
                let arr = [state.price, props.longPrice];
                let r = arr.filter((item) => !!item);
                // @ts-ignore
                let maxPrice = Math.max(...r);
                return Decimal.mul(maxPrice || 0, state.quantity || 0).div(state.lever).toFixed();
            } else if (reducerState.marketPrice){
                //let _price = props.longPrice ? Math.max(Number(props.longPrice), reducerState.marketPrice) : reducerState.marketPrice;
                return Decimal.mul(ExpectedPrice, state.quantity).div(state.lever).toFixed()
            } else {
                return "0";
            }
        }*/
    }, [state.isLong, isLimit, state.price, state.quantity, state.lever, props.longPrice, ExpectedPrice]);
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
    }, [props.longPrice, props.shortPrice, isLimit, reducerState.currentPair.tradeFeeRate, state.price, reducerState.marketPrice, reducerState.accountInfo.availableAmount, state.lever, state.percent, state.orderType]);
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

        /* Calculate the number of long and short positions respectively and take the minimum price */
        /* Market and short */
        if (isLimit) {
            let quantity = Decimal.mul(margin, state.lever).div(price).toFixed();
            state.quantity = fixedNumberStr(quantity, symbolDecimal)
        } else {
            let long_price = props.shortPrice || reducerState.marketPrice || 0;
            let calcPrice = Decimal.mul(long_price, 1 + 0.0005);

            let quantity_long = Decimal.mul(margin, state.lever).div(calcPrice).toFixed();
            let c = reducerState.marketPrice || 0;
            let _price = props.longPrice ? Math.max(Number(props.longPrice), c) : c;
            let quantity_short = Decimal.mul(margin, state.lever).div(_price).toFixed();

            let quantity = Number(quantity_long) > Number(quantity_short) ? quantity_short : quantity_long;
            state.quantity = fixedNumberStr(quantity, symbolDecimal);
        }



        // if (isLimit) {
        //     //let amount = Decimal.mul(state.price || 0, state.quantity || 0).div(state.lever).toFixed();
        //
        //     sum = Decimal.mul(margin, state.lever).div(state.price).toFixed();
        // } else {
        //     let a = Decimal.div(reducerState.marketPrice, state.lever).toFixed();
        //     let s = Decimal.add(a, reducerState.marketPrice);
        //     sum =  Decimal.mul(margin, state.lever).div(s).toFixed();
        // }
        // state.quantity = sum;
        /*let a = Decimal.div(reducerState.marketPrice, state.lever).toFixed();
        let amount = Decimal.add(a, reducerState.marketPrice).mul(state.quantity).div(state.lever).toFixed();

        let R = Decimal.add(1, fe).mul(price);
        let quantity = Decimal.mul(reducerState.accountInfo.availableAmount, state.lever).mul(percent).div(R).toFixed(symbolDecimal);
        state.quantity = Number(quantity).toString();*/
    }

    async function setLever(lever: number) {
        if (!lever || lever === leverData.lever) {
            return ;
        }
        const [res, error] = await awaitWrap(fetchPost("/contract-provider/contract/setUserLever", {
            "contractPairId": reducerState.currentPair.id,
            "lever": lever
        }));
        if (error) {
            console.error(error);
        } else {
            reloadLever();
        }
    }

    async function submit() {
        if (isLimit && !Number(state.price)) {
            showMessage(t(`Please enter the price`));
            return ;
        }
        if (!isNumber(state.lever)) {
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
        if ( Decimal.div(amount, state.lever).toNumber() > Number(reducerState.accountInfo.availableAmount)) {
            showMessage(t(`Insufficient available balance`));
            return ;
        }
        if (childRef.current!.validate()) {
            return ;
        }
        state.loading = true;
        const isClose = false;
        const total = state.isLong ? Decimal.mul(longMargin, state.lever).toFixed() : Decimal.mul(shortMargin, state.lever).toFixed();
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
                lever: Number(state.lever),
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
        state.quantityUSDT = "";
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
                     state.quantityUSDT = "";
                     state.percent = 0;
                     state.orderType = value;
                 }} />
            <div style={{flex: 1, padding: "0.16rem 0"}}>
                {/*<div>
                    <LabelButton>{t(`Isolated`)}</LabelButton>
                    <LabelButton onClick={() => {
                        openModal<ILeverageModal>(LeverageModal, {
                            defaultValue: String(state.lever),
                            callback(leverage): void {
                                if (isNumber(leverage)) {
                                    state.lever = Number(leverage);
                                }
                            }
                        })
                    }}>{t(`Leverage`)} {state.lever}x</LabelButton>
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
                                                   key={index}
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
                                        <span style={{color: theme.colors.labelColor}}>USDT</span>
                                    </div>
                                    }
                                    placeholder={state.pricePlaceholder}
                                    maxDecimal={USDT_decimal_show}
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
                            <div className={"flex-row"}>
                                <InputNumber
                                    style={{flex: 1}}
                                    inputStyle={{textAlign: "left"}}
                                    right={<span style={{color: theme.colors.labelColor}}>{reducerState.currentPair.tradeCoin && reducerState.currentPair.tradeCoin.symbol}</span>}
                                    placeholder={state.quantityPlaceholder}
                                    value={state.quantity}
                                    maxDecimal={symbolDecimal}
                                    onChange={(value) => {
                                        //state.percent = 0;
                                        state.quantity = value;
                                        state.reversePair = false;
                                        if (value && reversePrice) {
                                            state.quantityUSDT = fixedNumberStr(Decimal.mul(value, reversePrice).toFixed(), USDT_decimal_show);
                                        } else {
                                            state.quantityUSDT = "";
                                        }
                                    }}/>
                                <InputNumber
                                    style={{marginLeft: "0.04rem", flex: state.showTogglePair?1:0}}
                                    inputStyle={{textAlign: "left"}}
                                    right={
                                        <span style={{color: theme.colors.labelColor, cursor: "pointer"}}
                                              onClick={() => state.showTogglePair = !state.showTogglePair}>USDT</span>}
                                    placeholder={state.quantityPlaceholder}
                                    value={state.quantityUSDT}
                                    maxDecimal={USDT_decimal_show}
                                    onChange={(value) => {
                                        //state.percent = 0;
                                        state.quantityUSDT = value;
                                        state.reversePair = true;
                                        if (value && reversePrice) {
                                            state.quantity = fixedNumberStr(Decimal.div(value, reversePrice).toFixed(), symbolDecimal);
                                        } else {
                                            state.quantity = "";
                                        }
                                    }}/>
                            </div>
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
                                    {/*<Toggle vIf={!!state.lever}>
                                        <span>{state.lever}x</span>
                                    </Toggle>*/}
                                    <input type="text" className={"leverText"}
                                           value={state.lever ? `${state.lever}x` : ''}
                                           onBlur={() => setLever(Number(state.lever))}
                                           onChange={(event) => {
                                                /*let str = event.target.value.includes("x") ? */
                                                let value = event.target.value.includes("x")
                                                        ? event.target.value.replace(/x/g, "")
                                                        : (state.lever ? event.target.value.slice(0,-1) : event.target.value);
                                                if ((value === "" || isIntNumber(value))) {
                                                    let number_val = Number(value);
                                                    if(value && number_val < reducerState.currentPair.minLever) {
                                                        showMessage(t(`Below leverage min：`) + reducerState.currentPair.minLever);
                                                    } else if(number_val > reducerState.currentPair.maxLever){
                                                        showMessage(t(`Exceeds leverage maximum：`) + reducerState.currentPair.maxLever);
                                                    } else {
                                                        //state.lever = value;
                                                       // mapDispatch.setLeverage(value);

                                                    }
                                                    state.lever = value;
                                                }
                                            }}/>
                                </div>
                                <div>
                                    {
                                        state.levers.map((item, index) => {
                                            return <LeverageBtn className={`${Number(state.lever) === item ? 'active' : ''}`}
                                                                key={index}
                                                                onClick={() => setLever(item)}>{item}x</LeverageBtn>
                                        })
                                    }
                                </div>
                            </Lever>
                            {/*<Input
                                value={state.lever}
                                inputStyle={{width: "1rem"}}
                                placeholder={"0x"}
                                onChange={(value) => {
                                    state.lever = value;
                                }}
                                left={<span>{state.lever}x</span>}
                                right={
                                    <>
                                        {
                                            state.levers.map((item, index) => {
                                                return <LeverageBtn className={`${Number(state.lever) === item ? 'active' : ''}`} key={index}
                                                                    onClick={() => state.lever = String(item)}>{item}x</LeverageBtn>
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
                                <div>{formatUSDT(ExpectedPrice)} USDT</div>
                            </FeeBox>
                        </Toggle>
                        <FeeBox>
                            <div className={"label"}>{t(`Fee`)}</div>
                            <div>{formatUSDT(orderFee)} USDT</div>
                        </FeeBox>
                        <FeeBox>
                            <div className={"label"}>{t(`Total`)}</div>
                            <div>{formatUSDT(Decimal.add(orderFee || 0, orderTotalAmount || 0).toFixed())} USDT</div>
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
