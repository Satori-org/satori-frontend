import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "src/components/pagination/Pagination";
import {useEffectState} from "src/hooks/useEffectState";
import {getFillHistory, getTransRecord, IFills, ITransRecord} from "src/ajax/contract/contract";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import useExchangeStore from "../ExchangeProvider";
import {getTransactionRecordType} from "../config";
import {RecordListStyle, RowStyle} from './style';
import Loading from "src/components/loadStatus/Loading";
import {RELOAD_RECORD} from "src/common/PubSubEvents";
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";
import {useUpdateEffect} from "ahooks";
import NotConnect from "../../../components/NotConnect/NotConnect";
import Toggle from "../../../components/toggle/Toggle";
import RecordDatePicker from "../../../components/recordDatePicter/RecordDatePicker";
import EmptyData from "../../../components/noData/EmptyData";
import {formatDate} from "../../../common/utilTools";

type IRow = {
    item: ITransRecord
}
function Row(props: IRow) {
    const {t} = useTranslation();

    const operaInfo = useMemo(() => {
        let obj = {
            className: "",
            value: ""
        };
        if (props.item.positive) {
            obj.className = 'long';
            obj.value = `+${props.item.operateAmount}`
        } else {
            obj.className = 'short';
            obj.value = `-${props.item.operateAmount}`
        }
        return obj;
    }, [props.item.positive, props.item.operateAmount]);

    return <RowStyle>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.createTime}</span>
            </div>
        </td>
        <td>{props.item.contractPairSymbol}</td>
        <td style={{paddingRight: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{props.item.logType}</td>
        <td className={operaInfo.className} style={{paddingLeft: "0.65rem"}}>{operaInfo.value}</td>
        <td className={"right"}>{props.item.accountAmount}</td>
    </RowStyle>
}

type IDate = Date | null
export default function TransactionHistory() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const PADDING = "0 5% 0 0";
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
    const {data, loading, total, reload} = useFetchPostPage<ITransRecord>(getTransRecord, {
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
            <RecordListStyle style={{padding: PADDING}}>
                { loading ? <Loading /> :null }
                <Toggle vIf={!!storeData.token}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{width: "20%"}}>{t(`TIME`)}</th>
                            <th style={{width: "20%"}}>{t(`PAIRS`)}</th>
                            <th style={{width: "20%"}}>{t(`TYPE`)}</th>
                            <th style={{width: "20%", paddingLeft: "0.65rem"}}>{t(`TOTAL(USDT)`)}</th>
                            <th className={"right"} style={{width: "20%"}}>{t(`ACCOUNT BALANCE(USDT)`)}</th>
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
            <div style={{padding: PADDING}}>
                <Toggle vIf={!!total && total > state.pageSize}>
                    <Pagination
                        style={{marginRight: "-8px", marginTop: "6px"}}
                        current={state.pageNo}
                        pageSize={state.pageSize}
                        total={total || 0}
                        onChange={(page) => state.pageNo = page} />
                </Toggle>
            </div>
        </div>
    )
}
