import React, {MutableRefObject, useImperativeHandle} from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "../../../components/pagination/Pagination";
import {useFetchPostPage} from "../../../ajax";
import {getPositionList, getTransferRecord, IPositionList, ITransfer} from "../../../ajax/contract/contract";
import {useEffectState} from "../../../hooks/useEffectState";
import {TRANSFER_TYPE} from "../../../common/enum";
import Loading from "../../../components/loadStatus/Loading";
import Toggle from "../../../components/toggle/Toggle";
import {RecordListStyle} from "../../exchange/record/style";
import {useStore} from "react-redux";
import {IState} from "../../../store/reducer";
import NotConnect from "../../../components/NotConnect/NotConnect";
import EmptyData from "../../../components/noData/EmptyData";
import {getOrderType, getTransferStatus, getTransferType} from "../../exchange/config";
import {formatAddress} from "../../../common/utilTools";

const data = [
    {time: "2021-11-22 13:00:45",type: 'Deposit',Amount: "$1.078236",Status: "confirmed", address: "0x5022b938170167511A065D339d00002FdcBCfC27"},
    {time: "2021-11-22 13:00:45",type: 'Withdraw',Amount: "$1.078236",Status: "confirmed", address: "0x5022b938170167511A065D339d00002FdcBCfC27"}
];

type IRow = {
    item: ITransfer
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td>{props.item.createTime}</td>
            <td>{getTransferType(props.item.type, t)}</td>
            <td>${props.item.amount}</td>
            <td>{getTransferStatus(props.item.status, t)}</td>
            <td>
                <Toggle vIf={!!props.item.transHash}>
                    <a className={"flex-row"} href={`https://clover-testnet.subscan.io/tx/${props.item.transHash}`} target={"_blank"}>
                        <span>{formatAddress(props.item.transHash, 17, 9)}</span>
                        <img src={require("src/assets/images/link.png")} style={{width: "16px",height: "16px",marginLeft:"6px"}} alt="" />
                    </a>
                    <span>--</span>
                </Toggle>
            </td>
        </tr>
    </>
}

type IProps = {
    type: number
    startDate: Date | null
    endTime: Date | null
    childRef: MutableRefObject<{ resetPage(): void } | undefined>
}
export default function Transfer(props: IProps) {
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

    const {data, loading, total, reload} = useFetchPostPage<ITransfer>(getTransferRecord, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        type: props.type,
        startTime: (props.startDate && props.endTime) ? props.startDate.getTime() : null,
        endTime: (props.startDate && props.endTime) ? props.endTime.getTime() : null
    });

    return (
        <div>
            { loading ? <Loading /> :null }
            <Toggle vIf={!!storeData.token}>
                <Table className={"table"}>
                    <thead>
                    <tr>
                        <th style={{width: "17.2%"}}>{t(`TIME`)}</th>
                        <th>{t(`TYPE`)}</th>
                        <th>{t(`AMOUNT`)}</th>
                        <th>{t(`STATUS`)}</th>
                        <th style={{width: "26%"}}>{t(`TRANSACTION HASH`)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item,index) => {
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
