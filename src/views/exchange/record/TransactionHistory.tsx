import React, {useMemo} from 'react';
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

type IRow = {
    item: ITransRecord
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <RowStyle>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.createTime}</span>
            </div>
        </td>
        <td>{props.item.logType}</td>
        <td>{props.item.operateAmount}</td>
        <td>{props.item.coinSymbol}</td>
        <td>{props.item.accountAmount}</td>
    </RowStyle>
}

export default function TransactionHistory() {
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
    const {data, loading, total, reload} = useFetchPostPage<ITransRecord>(getTransRecord, {
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
                        <th style={{width: "20%"}}>{t(`Time`)}</th>
                        <th style={{width: "20%"}}>{t(`Orders Status`)}</th>
                        <th style={{width: "20%"}}>{t(`Total`)}</th>
                        <th style={{width: "20%"}}>{t(`Pairs`)}</th>
                        <th style={{width: "20%"}}>{t(`Wallet balance`)}</th>
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
            </RecordListStyle>
            {/*<Pagination
                style={{marginRight: "24px"}}
                total={total}
                pageSize={state.pageSize}
                onChange={(page) => state.pageNo = page} />*/}
        </div>
    )
}
