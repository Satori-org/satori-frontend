import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "src/components/table/Table";
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import MarginModal from "src/components/marginModal/MarginModal";
import ReactDOM from 'react-dom';
import Pagination from "src/components/pagination/Pagination";
import {addOrder, getPositionList, IPair, IPositionList, IQuotation} from "src/ajax/contract/contract";
import useExchangeStore from "../ExchangeProvider";
import {awaitWrap, fixedNumber, showMessage} from "src/common/utilTools";
import {signExpire, signMsg} from "src/contract/wallet";
import {Toast} from "src/components/toast/Toast";
import {NUMBER_REG} from "src/common/regExp";
import Decimal from "decimal.js";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Loading from "src/components/loadStatus/Loading";
import {CloseBtn, RecordListStyle, RowStyle} from "./style";
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";
import {RELOAD_RECORD} from "src/common/PubSubEvents";
import {getOrderType} from "../config";
import {ClosePositionModal} from "../../../components/closePositionModal/ClosePositionModal";
import {useUpdateEffect} from "ahooks";
import NotConnect from "../../../components/NotConnect/NotConnect";
import EmptyData from "../../../components/noData/EmptyData";
import {useThemeManager} from "../../../hooks/useThemeManager";

type IRow = {
    item: IPositionList
    reload(): void
    isDark: boolean
}
function Row(props: IRow) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const state = useEffectState({
        showpercent: false,
        percent: "100%",
        showMarin: false,
        showCloseModal: false,
        loading: false
    });

    const rowPair = useMemo(() => {
        let obj = reducerState.pairs.find((item) => {
            return item.id === props.item.contractPairId;
        });

        return obj || {} as IPair;
    }, [reducerState.pairs]);

    const pairQuotation = useMemo(() => {
        let obj = reducerState.quotation.find((item) => {
            return item.contractPairId === props.item.contractPairId;
        });

        return obj || {} as IQuotation;
    }, [reducerState.quotation]);

    const pnl = useMemo(() => {
        let obj = {
            profit: 0,
            percent: "0%",
            className: ""
        };
        if (!rowPair.id || !pairQuotation.contractPairId) {
          return obj;
        }
        let decimal = rowPair.settleCoin && rowPair.settleCoin.settleDecimal || 2;
        let profit = Decimal.sub(pairQuotation.lastPrice ,props.item.openingPrice).mul(props.item.quantity).toFixed();
        let amount = Decimal.mul(props.item.openingPrice, props.item.quantity).toFixed();
        let percent = fixedNumber( Decimal.div(profit, props.item.marginAmount).mul(100).toFixed(), 2 );

        //obj.profit = props.item.isLong ? fixedNumber(profit, decimal) : 0 - fixedNumber(profit, decimal);
        let dicProfit = props.item.isLong ? profit : Decimal.sub(0, profit);
        obj.profit = fixedNumber(Decimal.add(dicProfit, props.item.tariffAmount).toFixed(), decimal);
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
    }, [props.item.openingPrice, reducerState.tiker.close, props.item.isLong, rowPair, pairQuotation]);

    const percents = [0.1, 0.2 ,0.50,0.75, 1];

    const quantity = useMemo(() => {
        let val = "";
        let percentVal = state.percent.slice(0, -1);
        if (state.percent.endsWith("%") && new RegExp(NUMBER_REG, "g").test(percentVal)) {
            val = Decimal.div(percentVal, 100).mul(props.item.quantity).toFixed();
            return val;
        } else if (new RegExp(NUMBER_REG, "g").test(state.percent)){
            return state.percent;
        } else {
            return "";
        }
    }, [props.item.quantity, state.percent]);

    async function closeOrder() {

        state.showCloseModal = true;
        return ;

        if (!quantity) {
            showMessage(t(`Please enter the number of closed positions`));
            return ;
        }
        state.loading = true;
        const isClose = true;
        const [signData, error] = await awaitWrap(signMsg({
            "quantity": quantity,
            "address": storeData.address,
            "expireTime": signExpire(),
            "contractPairId": props.item.contractPairId,
            "isClose": isClose,
            "amount": "100"
        }, storeData.address)) ;
        if (!error) {
            const [res, error2] = await awaitWrap(addOrder({
                contractPairId: props.item.contractPairId,
                contractPositionId: props.item.id,
                isClose: isClose,
                isLong: props.item.isLong,
                isMarket: true,
                quantity: Number(quantity),
                signHash: signData.signatrue,
                originMsg: signData.origin,
                lever: 10,
                amount: "100"
            }));
            if (!error2) {
                props.reload();
            }
        }
        state.loading = false;
    }

    return <>
        <RowStyle>
            <td>{props.item.symbol} </td>
            <td className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
            <td>{props.item.lever}x</td>
            <td className={"right"}>{props.item.quantity} {props.item.symbol.split("-")[0]}</td>
            <td className={"right"}>{props.item.openingPrice}</td>
            <td className={"right"}>{Number(props.item.restrictPrice) < 0 ? "--" : props.item.restrictPrice}</td>
            <td className={"right"}>
                <div className={"flex-row"} style={{justifyContent: "flex-end"}}>
                    <span style={{marginRight: "4px"}}>{props.item.marginAmount}</span>
                    <img src={props.isDark?require("src/assets/images/dark/edit.png"):require("src/assets/images/light/edit.png")}
                         style={{width: "0.12rem", height: "0.12rem", cursor: "pointer"}} alt=""
                         onClick={() => state.showMarin = true} />
                </div>
            </td>
            <td className={"right"}>{props.item.tariffAmount}</td>
            {/*<td>
                <div className={"flex-row"}>
                    <span style={{marginRight: "4px"}}>{props.item.marginAmount}</span>
                    <img src={require("src/assets/images/edit.png")} style={{width: "16px", height: "16px"}} alt=""
                         onClick={() => state.showMarin = true} />
                </div>
            </td>*/}
            <td className={`${pnl.className} right`}>{pnl.profit}({pnl.percent})</td>
            {/*<td className={"long"}>{props.item.amount}</td>*/}
            <td className={"right"}>
                <div className={"flex-row"} style={{position: "relative", justifyContent: "flex-end"}}>
                    <CloseBtn onClick={closeOrder}>{t(`Close`)}</CloseBtn>
                    {/*<input type="text" className={"input"}
                           value={state.percent}
                           onChange={(event) => state.percent = event.target.value}
                           onFocus={() => state.showpercent = true}
                           onBlur={() => {
                               setTimeout(() => {
                                   state.showpercent = false
                               }, 100);
                           }} />
                    <Toggle vIf={state.showpercent}>
                        <PercentStyle>
                            {
                                percents.map((item,index) => {
                                    return <span className={`percentItem ${state.percent === `${item*100}%` ? 'active' : ''}`}
                                                 key={index}
                                                 onClick={() => state.percent = `${item*100}%`}>{item*100}%</span>
                                })
                            }
                        </PercentStyle>
                    </Toggle>*/}
                </div>
            </td>
        </RowStyle>
        {state.showMarin
            ? ReactDOM.createPortal(
                <MarginModal
                 data={props.item}
                 onClose={() => state.showMarin = false}
                 onSuccess={() => {
                     state.showMarin = false;
                     props.reload();
                 }}
                 ></MarginModal>, document.getElementById("root")!)
            : null
        }
        {
            state.showCloseModal
                ? ReactDOM.createPortal(<ClosePositionModal
                    data={props.item}
                    onClose={() => {
                        state.showCloseModal = false
                    }}
                    onConfirm={() => {
                        state.showCloseModal = false;
                        props.reload();
                    }}></ClosePositionModal>, document.getElementById("root")!)
                : null
        }
    </>
}

type IProps = {
    onChange(count: number): void
}
export default function Position(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 5
    });

    /* Currently selected trading pairs */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);*/

    const {data, loading, total, reload} = useFetchPostPage<IPositionList>(getPositionList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: reducerState.hideDifferent ? reducerState.currentPair.id : undefined
    }, reducerState.hideDifferent ? [reducerState.currentPair.id, storeData.token] : [storeData.token]);

    usePubSubEvents(RELOAD_RECORD, reload);

    /*useUpdateEffect(() => {
        reload();
    }, [storeData.token, reload]);*/
    useEffect(() => {
        if (typeof total === "number") {
            props.onChange(total);
        }
    }, [total]);

    return (
        <PositionStyle>
            <RecordListStyle>
                { loading ? <Loading /> :null }
                <Toggle vIf={!!storeData.token}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{width: "8%"}}>{t(`PAIRS`)}</th>
                            <th>{t(`TYPE`)}</th>
                            <th>{t(`LEVERAGE`)}</th>
                            <th className={"right"}>{t(`AMOUNT`)}</th>
                            <th className={"right"}>{t(`ENTRY PRICE`)}</th>
                            <th className={"right"}>{t(`LIQUIDATION PRICE`)}</th>
                            <th className={"right"}>{t(`MARGIN`)}</th>
                            <th className={"right"}>{t(`FUNDING COSTS`)}</th>
                            <th className={"right"}>{t(`UNREALIZED PNL(ROE%)`)}</th>
                            <th className={"right"} style={{width: "1rem"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item) => {
                                return <Row key={item.id} item={item} reload={reload} isDark={isDark}></Row>
                            })
                        }
                        </tbody>
                    </Table>
                    <NotConnect className={"center"} customInput={<p>{t(`Connect your wallet to view your positions.`)}</p>}></NotConnect>
                </Toggle>
                <Toggle vIf={total === 0 && !!storeData.token}>
                    <EmptyData style={{marginTop: "78px"}} />
                </Toggle>
            </RecordListStyle>
            <Toggle vIf={!!total && total > state.pageSize}>
                <Pagination
                    style={{marginRight: "18px", marginTop: "12px"}}
                    pageSize={state.pageSize}
                    total={total || 0}
                    onChange={(page) => state.pageNo = page} />
            </Toggle>
        </PositionStyle>
    )
}
