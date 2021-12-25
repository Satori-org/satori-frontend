import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "../../../components/table/Table";
import Copy from "../../../components/copy/Copy";
import {useEffectState} from "../../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import {colors} from "../../../styles/style";

const data = [
    { Pairs: "BTC/USDT", time: "2021-11-20", Total: "656565", balance: "6.998", status: "Limit" },
    { Pairs: "BTC/USDT", time: "2021-11-20", Total: "12465", balance: "6.998",status: "Market" }
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <tr>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.time}</span>
            </div>
        </td>
        <td>{props.item.status}</td>
        <td>{props.item.Total}</td>
        <td>{props.item.Pairs}</td>
        <td>{props.item.balance}</td>
    </tr>
}

export default function TransactionHistory() {
    const {t} = useTranslation();

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>{t(`Time`)}</th>
                    <th>{t(`Orders Status`)}</th>
                    <th>{t(`Total`)}</th>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Wallet balance`)}</th>
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
        </div>
    )
}
