import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "../../../components/table/Table";
import Copy from "../../../components/copy/Copy";
import {useEffectState} from "../../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import {colors} from "../../../styles/style";

const data = [
    { Pairs: "BTC/USDT", time: "2021-11-20", Type: "Sell/Short", Price: "6.998", Cont: "1,297.60", Realized: '124545 USDT', Fee: "1.894541", status: "Limit",Liquidty: "Market" },
    { Pairs: "BTC/USDT", time: "2021-11-20", Type: "Buy/Long", Price: "6.998", Cont: "1,297.60", Realized: '124545 USDT', Fee: "1.894541", status: "Market",Liquidty: "Taker" }
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
        <td>{props.item.Pairs}</td>
        <td className={"long"}>{props.item.Type}</td>
        <td>{props.item.Price}</td>
        <td>{props.item.Cont}</td>
        <td>{props.item.Realized}</td>
        <td>{props.item.Fee}</td>
        <td>{props.item.status}</td>
        <td>{props.item.Liquidty}</td>
    </tr>
}

export default function Fills() {
    const {t} = useTranslation();

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>{t(`Time`)}</th>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Type`)}</th>
                    <th>{t(`Price`)}</th>
                    <th>{t(`Cont`)}</th>
                    <th>{t(`Realized PnL`)}</th>
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
        </div>
    )
}
