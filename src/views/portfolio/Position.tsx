import React, {CSSProperties, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {PositionStyle} from './styles/Position.style';
import Table from "src/components/table/Table";
import OperationBtn from "../../components/OperationBtn/OperationBtn";
import Pagination from "../../components/pagination/Pagination";
import {getOrderType} from "../exchange/config";
import {useEffectState} from "../../hooks/useEffectState";
import {useFetchPostPage} from "../../ajax";
import {
    getContractPairList,
    getPositionList,
    IKline,
    IPair,
    IPositionList,
    IQuotation,
    ISocketRes
} from "../../ajax/contract/contract";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import Loading from "../../components/loadStatus/Loading";
import Toggle from "../../components/toggle/Toggle";
import NotConnect from "../../components/NotConnect/NotConnect";
import EmptyData from "../../components/noData/EmptyData";
import {RowStyle} from "../exchange/record/style";
import {$router} from "../../react-router-perfect/Index";
import {formatUSDT} from "../../common/utilTools";
import {useWebsocket} from "../../hooks/useWebsocket";
import {socketURL} from "../../config";
import {usePairPnl} from "../../hooks/usePairPnl";

const data = [
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_buy@2x.png"), isLong: true,Leverage: 10, average: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" },
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_sell@2x.png"), isLong: false,Leverage: 5, average: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" }
];

type IRow = {
    item: IPositionList
    quotation: IQuotation[]
    pairs: IPair[]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    const rowPair = useMemo(() => {
        let obj = props.pairs.find((item) => {
            return item.id === props.item.contractPairId;
        });

        return obj || {} as IPair;
    }, [props.pairs]);

    const pairQuotation = useMemo(() => {
        let obj = props.quotation.find((item) => {
            return item.contractPairId === props.item.contractPairId;
        });

        return obj || {} as IQuotation;
    }, [props.quotation]);

    const operaInfo = useMemo(() => {
        let obj = {
            className: "",
            value: ""
        };
        if (Number(props.item.unrealizedPnl) > 0) {
            obj.className = 'long';
            obj.value = `+${formatUSDT(props.item.unrealizedPnl)}`
        } else if(Number(props.item.unrealizedPnl) < 0) {
            obj.className = 'short';
            obj.value = `${formatUSDT(props.item.unrealizedPnl)}`
        }
        return obj;
    }, [props.item.unrealizedPnl]);

    const pnl = usePairPnl({pairs: rowPair, quotation: pairQuotation, item: props.item});

    const tdStyle: CSSProperties = {
        fontSize: "0.14rem",
        lineHeight: "0.4rem"
    };
    return <>
        <tr style={{lineHeight: "42px"}}>
            <td style={tdStyle}>
                <span className={"name"}>{props.item.symbol}</span>
            </td>
            <td style={tdStyle} className={`${props.item.isLong ? 'long' : 'short'}`}>{getOrderType(props.item.isLong, t)}</td>
            <td style={tdStyle}>{props.item.lever}x</td>
            <td style={tdStyle} className={"right"}>{props.item.quantity} {props.item.symbol.split("-")[0]}</td>
            <td style={tdStyle} className={"right"}>{formatUSDT(props.item.openingPrice)}</td>
            <td style={tdStyle} className={"right"}>{Number(props.item.restrictPrice) < 0 ? "-" : formatUSDT(props.item.restrictPrice)}</td>
            <td style={tdStyle} className={"right"}>{props.item.marginAmount}</td>
            <td style={tdStyle} className={`right ${pnl.className}`}>{pnl.profit}</td>
            <td style={tdStyle} className={"right"}>
                <OperationBtn onClick={() => {
                    $router.push({
                        pathname: "/",
                        query: {pairId: props.item.contractPairId}
                    })
                }}>{t(`Check`)}</OperationBtn>
            </td>
        </tr>
    </>
}

export default function Position() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const state = useEffectState({
        pageNo: 1,
        pageSize: 10,
        quotation: [] as IQuotation[],
        pairs: [] as IPair[]
    });

    useEffect(() => {
        getPairList();
    }, []);

    async function getPairList() {
        const { data } = await getContractPairList();
        state.pairs = data;
    }
    const socketData = useWebsocket<ISocketRes>({url: socketURL, event: "kline", params: {contractPairId: 2, period: "15MIN"}, token: ""}, []);

    useEffect(() => {
        if (socketData && socketData.success) {
            let resData = socketData.data;
            if (socketData.event === "contract_pair_quote") {
                state.quotation = resData;
            }
        }
    }, [socketData]);
    const {data, loading, total, reload} = useFetchPostPage<IPositionList>(getPositionList, {
        pageNo: state.pageNo,
        pageSize: state.pageSize
    }, [storeData.token]);

    return (
        <PositionStyle>
            { loading ? <Loading /> :null }
            <Toggle vIf={!!storeData.token}>
                <Table className={"table"}>
                    <thead>
                    <tr>
                        <th>{t(`PAIRS`)}</th>
                        <th>{t(`TYPE`)}</th>
                        <th>{t(`LEVERAGE`)}</th>
                        <th className={"right"}>{t(`AMOUNT`)}</th>
                        <th className={"right"}>{t(`ENTER PRICE`)}</th>
                        <th className={"right"}>{t(`LIQUIDATION PRICE`)}</th>
                        <th className={"right"}>{t(`MARGIN`)}</th>
                        <th className={"right"}>{t(`UNREALIZED PNL`)}</th>
                        <th className={"right"} style={{width: "1.2rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item, index) => {
                            return <Row key={index} item={item} quotation={state.quotation} pairs={state.pairs}></Row>
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
        </PositionStyle>
    )
}
