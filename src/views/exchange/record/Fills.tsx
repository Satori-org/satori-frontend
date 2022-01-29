import React, {useMemo} from 'react';
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
        <td>{props.item.averagePrice}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.profitLoss}</td>
        <td>{props.item.positionFee}</td>
        <td>{props.item.isMarket ? t(`Market`) : t(`Limit`)}</td>
        <td>{props.item.isTaker ? t(`Taker`) : t(`Maker`)}</td>
    </RowStyle>
}

export default function Fills() {
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
    const {data, loading, total, reload} = useFetchPostPage<IFills>(getFillHistory, {
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
                        <th>{t(`Type`)}</th>
                        <th>{t(`Price`)}</th>
                        <th>{t(`Cont`)}</th>
                        <th style={{width: "12%"}}>{t(`Realized PnL `)}</th>
                        <th>{t(`Fee`)}</th>
                        <th>{t(`Orders Status`)}</th>
                        <th>{t(`Liquidty`)}</th>
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
