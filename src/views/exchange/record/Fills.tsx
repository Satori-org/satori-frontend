import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "src/components/pagination/Pagination";
import {RecordListStyle, RowStyle} from './style';
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import useExchangeStore from "../ExchangeProvider";
import {useEffectState} from "src/hooks/useEffectState";
import {getFillHistory, IFills} from "src/ajax/contract/contract";
import {getOrderType} from "../config";
import Loading from "src/components/loadStatus/Loading";
import { RELOAD_RECORD } from 'src/common/PubSubEvents';
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";
import {useUpdateEffect} from "ahooks";
import useWidthChange from "../../../hooks/useWidthChange";
import NotConnect from "../../../components/NotConnect/NotConnect";
import Toggle from "../../../components/toggle/Toggle";
import RecordDatePicker from "../../../components/recordDatePicter/RecordDatePicker";
import EmptyData from "../../../components/noData/EmptyData";
import {fixedNumberStr, formatDate, formatUSDT} from "../../../common/utilTools";
import {USDT_decimal_show} from "../../../config";

type IRow = {
    item: IFills
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <RowStyle>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.createTime}</span>
            </div>
        </td>
        <td>{props.item.symbol}</td>
        <td className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
        <td>{props.item.isMarket ? t(`Market`) : t(`Limit`)}</td>
        <td>{formatUSDT(props.item.averagePrice)}</td>
        <td>{props.item.quantity} {props.item.symbol.split("-")[0]}</td>
        {/*<td>{props.item.profitLoss}</td>
        <td>{props.item.positionFee}</td>*/}
        <td>{props.item.isTaker ? t(`Taker`) : t(`Maker`)}</td>
        <td className={"right"}>
            <span>{formatUSDT(props.item.profitLoss)}</span>
            <span>/</span>
            <span>{formatUSDT(props.item.tradeFee)}</span>
        </td>
    </RowStyle>
}

type IDate = Date | null
export default function Fills() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const { width } = useWidthChange();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 4,
        startDate: null as IDate,
        endDate: null as IDate,
        timeType: 0
    });
    /* Currently selected trading pairs */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);*/
    const {data, loading, total, reload} = useFetchPostPage<IFills>(getFillHistory, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: reducerState.hideDifferent ? reducerState.currentPair.id : undefined,
        timeType: state.timeType,
        fromDate: (state.startDate && state.timeType === 1) ? formatDate(state.startDate.getTime()) : null,
        toDate: (state.endDate && state.timeType === 1) ? formatDate(state.endDate.getTime()) : null
    }, reducerState.hideDifferent ? [reducerState.currentPair.id, storeData.token] : [storeData.token]);

    usePubSubEvents(RELOAD_RECORD, reload);

    /*useUpdateEffect(() => {
        reload();
    }, [storeData.token, reload]);*/

    const ItemStyle = useMemo(() => {
        return width > 1700 ? {width: "11%"} : {};
    }, [width]);

    return (
        <div>
            <RecordDatePicker
                style={{marginBottom: "0.12rem"}}
                onChange={(value) => {
                    state.pageNo = 1;
                    state.timeType = value;
                }}
                onSelectRange={(startDate, endDate) => {
                    state.pageNo = 1;
                    state.timeType = 1;
                    state.startDate = startDate;
                    state.endDate = endDate;
                }} />
            <RecordListStyle>
                { loading ? <Loading /> :null }
                <Toggle vIf={!!storeData.token}>
                    <Table style={{whiteSpace: "nowrap"}}>
                        <thead>
                        <tr>
                            <th style={ItemStyle}>{t(`TIME`)}</th>
                            <th style={ItemStyle}>{t(`PAIRS`)}</th>
                            <th style={ItemStyle}>{t(`TYPE`)}</th>
                            <th style={ItemStyle}>{t(`ORDER TYPE`)}</th>
                            <th style={ItemStyle}>{t(`PRICE`)}</th>
                            <th style={ItemStyle}>{t(`COUNT`)}</th>
                            {/*<th style={ItemStyle}>{t(`REALIZED PNL(USDT) `)}</th>
                            <th style={ItemStyle}>{t(`FUNDING COSTS(USDT) `)}</th>*/}
                            {/*<th>{t(`Fee`)}</th>*/}

                            <th style={ItemStyle}>{t(`TRANSACTION TYPE`)}</th>
                            <th className={"right"} style={ItemStyle}>{t(`Realized PnL/FEE(USDT)`)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => {
                                return <Row key={index} item={item}></Row>
                            })
                        }
                        </tbody>
                    </Table>
                    <NotConnect></NotConnect>
                </Toggle>
                <Toggle vIf={total === 0 && !!storeData.token}>
                    <EmptyData style={{marginTop: "78px"}} />
                </Toggle>
            </RecordListStyle>
            <Toggle vIf={!!total && total > state.pageSize}>
                <div style={{padding: "0 24px"}}>
                    <Pagination
                        style={{marginRight: "24px", marginTop: "6px"}}
                        current={state.pageNo}
                        pageSize={state.pageSize}
                        total={total || 0}
                        onChange={(page) => state.pageNo = page} />
                </div>
            </Toggle>
        </div>
    )
}
