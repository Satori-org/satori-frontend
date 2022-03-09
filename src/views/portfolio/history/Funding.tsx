import React, {MutableRefObject, useImperativeHandle, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import {Tag} from "./History.style";
import Pagination from "../../../components/pagination/Pagination";
import {useEffectState} from "../../../hooks/useEffectState";
import {useFetchPostPage} from "../../../ajax";
import {getContractTariffList, getFillHistory, getTransRecord, IFills, ITariff, ITransRecord} from "../../../ajax/contract/contract";
import {useStore} from "react-redux";
import {IState} from "../../../store/reducer";
import Loading from "../../../components/loadStatus/Loading";
import Toggle from "../../../components/toggle/Toggle";
import NotConnect from "../../../components/NotConnect/NotConnect";
import EmptyData from "../../../components/noData/EmptyData";
import {formatDate, formatUSDT} from "../../../common/utilTools";

const data = [
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 0,payments: "+1.078236",rate: "0.0457%",order: "0.045",oraclePrice: "8.1334"},
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 1,payments: "-1.078236",rate: "0.0457%",order: "0.045",oraclePrice: "8.1334"}
];

type IRow = {
    item: ITariff
}
function Row(props: IRow) {
    const {t} = useTranslation();

    const operaInfo = useMemo(() => {
        let obj = {
            className: "",
            value: ""
        };
        if (Number(props.item.tariffAmount) > 0) {
            obj.className = 'long';
            obj.value = `+${props.item.tariffAmount}`
        } else {
            obj.className = 'short';
            obj.value = `${props.item.tariffAmount}`
        }
        return obj;
    }, [props.item.tariffAmount]);

    return <>
        <tr>
            <td>{props.item.fundingTime}</td>
            <td>{props.item.symbol}</td>
            <td className={`${operaInfo.className}`}>{operaInfo.value}</td>
            <td>{props.item.settledRate}%</td>
            <td>
                <div className={"flex-row"}>
                    <span>{props.item.quantity}</span>
                    <Tag className={props.item.isLong ? 'long' : 'short'} style={{marginLeft: "8px"}}>{`${props.item.isLong ? 'Long' : 'Short'}`}</Tag>
                </div>
            </td>
            <td>{formatUSDT(props.item.openingPrice)}</td>
        </tr>
    </>
}

type IProps = {
    startDate: Date | null
    endTime: Date | null
    pariId: number
    childRef: MutableRefObject<{ resetPage(): void } | undefined>
}
export default function Funding(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 10
    });

    useImperativeHandle(
        props.childRef,
        () => ({
            resetPage: () => {
                state.pageNo = 1;
            }
        }),
        [],
    );
    const {data, loading, total, reload} = useFetchPostPage<ITariff>(getContractTariffList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: props.pariId,
        timeType: 1,
        fromDate: (props.startDate && props.endTime) ? formatDate(props.startDate.getTime()) : null,
        toDate: (props.startDate && props.endTime) ? formatDate(props.endTime.getTime()) : null,
    }, [storeData.token]);

    return (
        <div>
            { loading ? <Loading /> :null }
            <Toggle vIf={!!storeData.token}>
                <Table className={"table"}>
                    <thead>
                    <tr>
                        <th style={{width: "17.2%"}}>{t(`TIME`)}</th>
                        <th>{t(`MARKETS`)}</th>
                        <th>{t(`PAYMENTS`)}</th>
                        <th>{t(`FUNDING RATE`)}</th>
                        <th>{t(`POSITION`)}</th>
                        <th>{t(`ORACLE PRICE`)}</th>
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
