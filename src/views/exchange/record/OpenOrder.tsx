import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "../../../components/table/Table";
import Copy from "../../../components/copy/Copy";
import {useEffectState} from "../../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';
import {colors} from "../../../styles/style";

const data = [
    { Pairs: "BTC/USDT", time: "2021-11-20", Status: "Limit", Type: "Sell/Short", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" },
    { Pairs: "BTC/USDT", time: "2021-11-20", Status: "Market", Type: "Buy/Long", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" }
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();
    const state = useEffectState({
        showpercent: false,
        percent: ""
    });

    const percents = [0.1, 0.2 ,0.50,0.75, 1];

    return <tr>
        <td>
            <div className={"flex-row"}>
                <span className={"name"}>{props.item.time}</span>
            </div>
        </td>
        <td>{props.item.Pairs}</td>
        <td>{props.item.Status}</td>
        <td className={"long"}>{props.item.Type}</td>
        <td>{props.item.Price}</td>
        <td className={"long"}>{props.item.Completed}</td>
        <td className={"long"}>{props.item.Commission}</td>
        <td>
            <div className={"flex-row"} style={{position: "relative"}}>
                <button className={"closeBtn"} style={{
                    width: "71px",
                    height: "28px",
                    background: "#333A47",
                    borderRadius: "8px",
                    color: colors.baseColor
                }}>{t(`Cancel`)}</button>
            </div>
        </td>
    </tr>
}

export default function OpenOrder() {
    const {t} = useTranslation();

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>{t(`Time`)}</th>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Status`)}</th>
                    <th>{t(`Type`)}</th>
                    <th>{t(`Price`)}</th>
                    <th>{t(`Completed Cont`)}</th>
                    <th>{t(`Commission Cont`)}</th>
                    <th>{t(`Operation`)}</th>
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
