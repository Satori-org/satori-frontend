import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {OrdersStyle} from './Orders.style';
import Table from "src/components/table/Table";
import OperationBtn from "src/components/OperationBtn/OperationBtn";
import Pagination from "../../../components/pagination/Pagination";
import {getOrderType} from "../../exchange/config";
import {useStore} from "react-redux";
import {IState} from "../../../store/reducer";
import {useEffectState} from "../../../hooks/useEffectState";
import {fetchGet, useFetchPostPage} from "../../../ajax";
import {cancelEntrust, getCurrentEntrustList, ICurrentEntrustList} from "../../../ajax/contract/contract";
import Loading from "../../../components/loadStatus/Loading";
import Toggle from "../../../components/toggle/Toggle";
import NotConnect from "../../../components/NotConnect/NotConnect";
import EmptyData from "../../../components/noData/EmptyData";
import {awaitWrap, showMessage} from "../../../common/utilTools";
import {MsgStatus} from "../../../common/enum";
import {ThButton} from "../history/History.style";

const data = [
    { Pairs: "BTC/USDT", time: "2021-11-22 13:00:45", Status: "Limit",isLong: true,Leverage: 10,margin: "12.88", Type: "Sell/Short", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" },
    { Pairs: "BTC/USDT", time: "2021-11-22 13:00:45", Status: "Market",isLong: false,Leverage: 5,margin: "112.88", Type: "Buy/Long", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" }
];
type IRow = {
    item: ICurrentEntrustList
    reload(): void
    setLoading(loading: boolean): void
}
function Row(props: IRow) {
    const {t} = useTranslation();

    async function cancelOrder() {
        props.setLoading(true);
        const result = await cancelEntrust(props.item.id);
        props.setLoading(false);
        if (result) {
            showMessage(t(`Undo successfully`), MsgStatus.success);
            props.reload();
        }
    }

    return <tr>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.createTime}</span>
            </div>
        </td>
        <td>{props.item.symbol}</td>
        <td className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
        <td>{props.item.lever}x</td>
        <td>{props.item.price}</td>
        <td>{props.item.dealQuantity}/{props.item.quantity}</td>
        {/*<td>{props.item.amount}</td>*/}
        <td>
            <OperationBtn style={{background: "transparent"}} onClick={cancelOrder}>{t(`Cancel`)}</OperationBtn>
        </td>
    </tr>
}

export default function Orders() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 10,
        loading: false
    });

    /* Currently selected trading pairs */
    /*const pairInfo = useMemo(() => {
        return reducerState.pairs[reducerState.currentTokenIndex] || {};
    }, [reducerState.pairs, reducerState.currentTokenIndex]);*/

    const {data, loading, total, reload} = useFetchPostPage<ICurrentEntrustList>(getCurrentEntrustList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize
    }, [storeData.token]);

    useEffect(() => {
        state.loading = loading;
    }, [loading]);

    async function cancelOrder() {
        const [data, error] = await awaitWrap(fetchGet("/contract-provider/contract/cancelAllEntrust"));
        if (data) {
            showMessage(t(`Cancel Success`), MsgStatus.success);
            reload();
        }
        /*props.setLoading(true);
        const result = await cancelEntrust(props.item.id);
        props.setLoading(false);
        if (result) {
            showMessage(t(`Undo successfully`), MsgStatus.success);
            props.reload();
        }*/
    }

    return (
        <OrdersStyle>
            {/*<Title>{t(`All Orders`)}</Title>*/}
            { state.loading ? <Loading /> :null }
            <Toggle vIf={!!storeData.token}>
                <Table className={"table"}>
                    <thead>
                    <tr>
                        <th style={{width: "16%"}}>{t(`Time`)}</th>
                        <th>{t(`Pairs`)}</th>
                        <th>{t(`Type`)}</th>
                        <th>{t(`Leverage`)}</th>
                        <th>{t(`Price`)}</th>
                        <th style={{width: "26%"}}>{t(`Completed Cont`)}/{t(`Commission Cont`)}</th>
                        {/*<th>{t(`Margin`)}</th>*/}
                        <th>
                            <ThButton onClick={cancelOrder}>{t(`Cancel all`)}</ThButton>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item) => {
                            return <Row key={item.id} item={item} reload={reload} setLoading={(loading) => state.loading = loading}></Row>
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
                <Pagination onChange={(page) => state.pageNo = page} total={total || 0} />
            </Toggle>
        </OrdersStyle>
    )
}
