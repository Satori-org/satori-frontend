import React, {MutableRefObject, useEffect, useImperativeHandle} from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "../../../components/pagination/Pagination";
import {useEffectState} from "../../../hooks/useEffectState";
import {useFetchPostPage} from "../../../ajax";
import {getFillHistory, IFills} from "../../../ajax/contract/contract";
import {useStore} from "react-redux";
import {IState} from "../../../store/reducer";
import Loading from "../../../components/loadStatus/Loading";
import Toggle from "../../../components/toggle/Toggle";
import NotConnect from "../../../components/NotConnect/NotConnect";
import EmptyData from "../../../components/noData/EmptyData";
import {getOrderType} from "../../exchange/config";
import {formatDate, formatUSDT} from "../../../common/utilTools";
import {tdStyle} from "./History";

const data = [
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 0,Leverage: 10,price: "1.078236",cont: "6.998 BTC", total: 2.568,pnl: "1,297.60 USDT",fee: "8.1334 USDT",status: "Limit",liquidty:"Maker"},
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 1,Leverage: 5,price: "1.078236",cont: "6.998 BTC", total: 2.568,pnl: "1,297.60 USDT",fee: "8.1334 USDT",status: "Limit",liquidty:"Maker"}
];

type IRow = {
    item: IFills
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td style={Object.assign({width: "17.2%"}, tdStyle)}>{props.item.createTime}</td>
            <td style={tdStyle}>{props.item.symbol}</td>
            <td style={tdStyle} className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
            <td style={tdStyle}>{props.item.isMarket ? t(`Market`) : t(`Limit`)}</td>
            <td style={tdStyle}>{props.item.lever}x</td>
            <td style={tdStyle}>{props.item.averagePrice}</td>
            <td style={tdStyle}>{props.item.quantity} {props.item.symbol.split("-")[0]}</td>
            <td style={tdStyle}>{props.item.isTaker ? t(`Taker`) : t(`Maker`)}</td>
            <td style={tdStyle}>
                <span className={"dashedBorder"}>{formatUSDT(props.item.profitLoss)} / {props.item.tradeFee}</span>
            </td>
        </tr>
    </>
}

type IProps = {
    startDate: Date | null
    endTime: Date | null
    pariId: number
    isMarket: boolean
    childRef: MutableRefObject<{ resetPage(): void } | undefined>
}
export default function TradesOrders(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 10
    });
    /* Currently selected trading pairs */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);*/
    useImperativeHandle(
        props.childRef,
        () => ({
            resetPage: () => {
                state.pageNo = 1;
            }
        }),
        [],
    );

    const {data, loading, total, reload} = useFetchPostPage<IFills>(getFillHistory, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: props.pariId,
        timeType: 1,
        fromDate: (props.startDate && props.endTime) ? formatDate(props.startDate.getTime()) : null,
        toDate: (props.startDate && props.endTime) ? formatDate(props.endTime.getTime()) : null,
        isMarket: props.isMarket
    }, [storeData.token]);

    return (
        <div>
            { loading ? <Loading /> :null }
            <Toggle vIf={!!storeData.token}>
                <Table className={"table"}>
                    <thead>
                    <tr>
                        <th>{t(`TIME`)}</th>
                        <th>{t(`PAIRS`)}</th>
                        <th>{t(`TYPE`)}</th>
                        <th>{t(`ORDER TYPE`)}</th>
                        <th>{t(`LEVERAGE`)}</th>
                        <th>{t(`PRICE`)}</th>
                        <th>{t(`CONT`)}</th>
                        <th>{t(`TRANSACTION TYPE`)}</th>
                        <th>{t(`Realized PnL / FEE(USDT)`)}</th>
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
            <Toggle vIf={!!total && total > state.pageSize}>
                <Pagination
                    style={{marginRight: "18px"}}
                    current={state.pageNo}
                    pageSize={state.pageSize}
                    total={total || 0}
                    onChange={(page) => state.pageNo = page} />
            </Toggle>
        </div>
    )
}
