import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Table from "src/components/table/Table";
import {CancelButton, RecordListStyle, RowStyle} from "./style";
import {cancelEntrust, getCurrentEntrustList, ICurrentEntrustList} from "src/ajax/contract/contract";
import useExchangeStore from "../ExchangeProvider";
import {useEffectState} from "src/hooks/useEffectState";
import {getOrderType} from "../config";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Loading from "src/components/loadStatus/Loading";
import {RELOAD_RECORD} from "src/common/PubSubEvents";
import {useFetchPostPage} from "src/ajax";
import {usePubSubEvents} from "src/hooks/usePubSubEvents";
import {useUpdateEffect} from 'ahooks';
import {showMessage} from "../../../common/utilTools";
import {MsgStatus} from "../../../common/enum";
import NotConnect from "../../../components/NotConnect/NotConnect";
import Toggle from "../../../components/toggle/Toggle";
import Pagination from "../../../components/pagination/Pagination";
import EmptyData from "../../../components/noData/EmptyData";

type IRow = {
    item: ICurrentEntrustList
    reload(): void
}
function Row(props: IRow) {
    const {t} = useTranslation();

    async function cancelOrder() {
        const result = await cancelEntrust(props.item.id);
        if (result) {
            showMessage(t(`Undo successfully`), MsgStatus.success);
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
        {/*<td>{props.item.dealQuantity === "0" ? t(`Not Sold`) : t(`Partial Transaction`)}</td>*/}
        <td className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
        <td>{props.item.isMarket ? t(`Market`) : t(`Limit`)}</td>
        <td className={"right"}>{props.item.price || "--"}</td>
        <td className={"right"}>{props.item.dealQuantity}/{props.item.quantity} {props.item.symbol}</td>
       {/* <td className={"right"}>{props.item.amount}</td>*/}
        {/*<td>{props.item.contractPairId}</td>*/}
        <td className={"right"}>
            <CancelButton onClick={cancelOrder}>{t(`Cancel`)}</CancelButton>
        </td>
    </RowStyle>
}

type IProps = {
    onChange(count: number): void
}
export default function OpenOrder(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const [reducerState] = useExchangeStore();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 5
    });

    /* Currently selected trading pairs */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);*/

    const {data, loading, total, reload} = useFetchPostPage<ICurrentEntrustList>(getCurrentEntrustList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        contractPairId: reducerState.hideDifferent ? reducerState.currentPair.id : undefined
    }, reducerState.hideDifferent ? [reducerState.currentPair.id, storeData.token] : [storeData.token]);

    usePubSubEvents(RELOAD_RECORD, reload);

    useEffect(() => {
        if (typeof  total === "number") {
            props.onChange(total);
        }
    }, [total]);
    /*useUpdateEffect(() => {
        reload();
    }, [storeData.token, reload]);*/

    return (
        <div>
            <RecordListStyle>
                { loading ? <Loading /> :null }
                <Toggle vIf={!!storeData.token}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{width: "13%"}}>{t(`Time`)}</th>
                            <th>{t(`Pairs`)}</th>
                            <th>{t(`Type`)}</th>
                            {/*<th>{t(`Status`)}</th>*/}
                            <th>{t(`Commission type`)}</th>
                            <th className={"right"}>{t(`Price(USDT)`)}</th>
                            <th className={"right"}>{t(`Completed / Commission Cont`)}</th>
                            {/*<th className={"right"}>{t(`Margin(USDT)`)}</th>*/}
                            {/*<th>{t(`Fee`)}</th>*/}
                            <th className={"right"} style={{width: "10%", minWidth: "130px"}}>{t(`Operation`)}</th>
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
                    <NotConnect></NotConnect>
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
        </div>
    )
}
