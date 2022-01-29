import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "src/components/pagination/Pagination";
import {CancelButton, RecordListStyle, RowStyle} from "./style";
import {cancelEntrust, getCurrentEntrustList, ICurrentEntrustList} from "src/ajax/contract/contract";
import useExchangeStore from "../ExchangeProvider";
import {Toast} from "src/components/toast/Toast";
import {useEffectState} from "src/hooks/useEffectState";
import {getOrderType} from "../config";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Loading from "src/components/loadStatus/Loading";
import {RELOAD_RECORD} from "src/common/PubSubEvents";
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";

type IRow = {
    item: ICurrentEntrustList
    reload(): void
}
function Row(props: IRow) {
    const {t} = useTranslation();

    async function cancelOrder() {
        const result = await cancelEntrust(props.item.id);
        if (result) {
            Toast(t(`Undo successfully`));
            props.reload();
        }
    }

    return <RowStyle>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.createTime}</span>
            </div>
        </td>
        <td>{props.item.symbol}</td>
        <td>{props.item.dealQuantity === "0" ? t(`Not Sold`) : t(`Partial Transaction`)}</td>
        <td className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
        <td>{props.item.price}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.dealQuantity}</td>
        <td>{props.item.contractPairId}</td>
        <td>
            <div className={"flex-row"} style={{position: "relative"}}>
                <CancelButton onClick={cancelOrder}>{t(`Cancel`)}</CancelButton>
            </div>
        </td>
    </RowStyle>
}

export default function OpenOrder() {
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

    const {data, loading, total, reload} = useFetchPostPage<ICurrentEntrustList>(getCurrentEntrustList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: pairInfo.id
    }, [pairInfo.id, storeData.token]);

    usePubSubEvents(RELOAD_RECORD, reload);

    return (
        <div>
            <RecordListStyle>
                { loading ? <Loading /> :null }
                <Table>
                    <thead>
                    <tr>
                        <th style={{width: "13%"}}>{t(`Time`)}</th>
                        <th>{t(`Pairs`)}</th>
                        <th>{t(`Status`)}</th>
                        <th>{t(`Type`)}</th>
                        <th>{t(`Price`)}</th>
                        <th>{t(`Total`)}</th>
                        <th>{t(`Filled`)}</th>
                        <th>{t(`Fee`)}</th>
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
                pageSize={state.pageSize}
                total={total}
                onChange={(page) => state.pageNo = page} />*/}
        </div>
    )
}
