import React, {useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "src/components/table/Table";
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import MarginModal from "src/components/marginModal/MarginModal";
import ReactDOM from 'react-dom';
import Pagination from "src/components/pagination/Pagination";
import {addOrder, getPositionList, IPositionList} from "src/ajax/contract/contract";
import useExchangeStore from "../ExchangeProvider";
import {awaitWrap} from "src/common/utilTools";
import {signExpire, signMsg} from "src/contract/wallet";
import {Toast} from "src/components/toast/Toast";
import {NUMBER_REG} from "src/common/regExp";
import Decimal from "decimal.js";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Loading from "src/components/loadStatus/Loading";
import {RecordListStyle, RowStyle} from "./style";
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";
import {RELOAD_RECORD} from "src/common/PubSubEvents";

const longIcon = require("src/assets/images/symbol/btc_long.png");
const shortIcon = require("src/assets/images/symbol/btc_short.png");

type IRow = {
    item: IPositionList
    reload(): void
}
function Row(props: IRow) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        showpercent: false,
        percent: "100%",
        showMarin: false,
        loading: false
    });
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
        if (!quantity) {
            Toast(t(`Please enter the number of closed positions`));
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
        })) ;
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
                amount: 100
            }));
            if (!error2) {
                props.reload();
            }
        }
        state.loading = false;
    }

    return <>
        <RowStyle>
            <td>
                <div className={"flex-row"}>
                    <img src={props.item.isLong?longIcon:shortIcon} className={"tokenIcon"} alt=""/>
                    <span className={"name"}>{props.item.symbol}</span>
                    <span className={"Leverage"}>{props.item.lever}X</span>
                    {/*<div>{props.item.createTime}</div>*/}
                </div>
            </td>
            <td>{props.item.openingPrice}</td>
            <td>{props.item.openingPrice}</td>
            <td>{props.item.quantity} BTC</td>
            <td>
                <div className={"flex-row"}>
                    <span style={{marginRight: "4px"}}>{props.item.marginAmount}</span>
                    <img src={require("src/assets/images/edit.png")} style={{width: "16px", height: "16px"}} alt=""
                         onClick={() => state.showMarin = true} />
                </div>
            </td>
            <td>{props.item.amount} BTC</td>
            <td className={"long"}>{props.item.amount}</td>
            <td>
                <div className={"flex-row"} style={{position: "relative"}}>
                    <button className={"closeBtn"} onClick={closeOrder}>{t(`Close Positions`)}</button>
                    <input type="text" className={"input"}
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
                    </Toggle>
                </div>
            </td>
        </RowStyle>
        {state.showMarin
            ? ReactDOM.createPortal(<MarginModal onClose={() => state.showMarin = false}></MarginModal>, document.getElementById("root")!)
            : null
        }
    </>
}

export default function Position() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 10
    });

    /* Currently selected trading pairs */
    const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);

    const {data, loading, total, reload} = useFetchPostPage<IPositionList>(getPositionList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: pairInfo.id
    }, [pairInfo.id, storeData.token]);

    usePubSubEvents(RELOAD_RECORD, reload);

    return (
        <PositionStyle>
            <RecordListStyle>
                { loading ? <Loading /> :null }
                <Table>
                    <thead>
                    <tr>
                        <th style={{width: "13%"}}>{t(`Pairs`)}</th>
                        <th>{t(`Entry Price`)}</th>
                        <th>{t(`Liquidation Price`)}</th>
                        <th>{t(`Amount`)}</th>
                        <th>{t(`Margin`)}</th>
                        <th>{t(`Fee`)}</th>
                        <th>{t(`Unrealized PnL(ROE%)`)}</th>
                        <th style={{width: "15%", minWidth: "220px"}}>{t(`Operation`)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item) => {
                            return <Row key={item.id} item={item} reload={reload}></Row>
                        })
                    }
                    </tbody>
                </Table>
            </RecordListStyle>
            {/*<Pagination
                style={{marginRight: "24px"}}
                total={total}
                pageSize={state.pageSize}
                onChange={(page) => state.pageNo = page} />*/}
        </PositionStyle>
    )
}
