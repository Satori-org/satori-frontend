import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import {Tag} from "./History.style";
import Pagination from "../../../components/pagination/Pagination";

const data = [
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 0,payments: "+1.078236",rate: "0.0457%",order: "0.045 ETH",oraclePrice: "8.1334 USDT"},
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 1,payments: "-1.078236",rate: "0.0457%",order: "0.045 ETH",oraclePrice: "8.1334 USDT"}
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td>{props.item.time}</td>
            <td>{props.item.pairs}</td>
            <td className={`${props.item.type === 0 ? 'short' : 'long'}`}>{props.item.payments}</td>
            <td>{props.item.rate}</td>
            <td>
                <div className={"flex-row"}>
                    <span>{props.item.order}</span>
                    <Tag style={{marginLeft: "8px"}}>{`${props.item.type === 0 ? 'Sell/Short' : 'Buy/Long'}`}</Tag>
                </div>
            </td>
            <td>{props.item.oraclePrice}</td>
        </tr>
    </>
}

export default function Funding() {
    const {t} = useTranslation();

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th style={{width: "17.2%"}}>{t(`Time`)}</th>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Payments`)}</th>
                    <th>{t(`Funding Rate`)}</th>
                    <th>{t(`Open Orders`)}</th>
                    <th>{t(`Oracle price`)}</th>
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
            <Pagination onChange={(page) => console.log(page)} total={520} />
        </div>
    )
}
