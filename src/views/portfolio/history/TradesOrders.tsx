import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "../../../components/pagination/Pagination";

const data = [
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 0,price: "1.078236",cont: "6.998 BTC",pnl: "1,297.60 USDT",fee: "8.1334 USDT",status: "Limit",liquidty:"Maker"},
    {time: "2021-11-22 13:00:45", pairs: "BTC/USDT",type: 1,price: "1.078236",cont: "6.998 BTC",pnl: "1,297.60 USDT",fee: "8.1334 USDT",status: "Limit",liquidty:"Maker"}
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td style={{width: "17.2%"}}>{props.item.time}</td>
            <td>{props.item.pairs}</td>
            <td className={`${props.item.type === 0 ? 'short' : 'long'}`}>{props.item.type === 0 ? t(`Sell/Short`) : t(`Buy/Long`)}</td>
            <td>{props.item.price}</td>
            <td>{props.item.cont}</td>
            <td>{props.item.pnl}</td>
            <td>{props.item.fee}</td>
            <td>{props.item.status}</td>
            <td>{props.item.liquidty}</td>
        </tr>
    </>
}

export default function TradesOrders() {
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
            <Pagination onChange={(page) => console.log(page)} total={520} />
        </div>
    )
}
