import React from 'react';
import { useTranslation } from 'react-i18next';
import { OrdersStyle } from './Orders.style';
import {Title} from "../styles/Portfolio.style";
import Table from "src/components/table/Table";
import OperationBtn from "src/components/OperationBtn/OperationBtn";
import Pagination from "../../../components/pagination/Pagination";

const data = [
    { Pairs: "BTC/USDT", time: "2021-11-20", Status: "Limit", Type: "Sell/Short", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" },
    { Pairs: "BTC/USDT", time: "2021-11-20", Status: "Market", Type: "Buy/Long", Price: "6.998", Completed: "1,297.60", Commission: "1.894541" }
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
        <td>{props.item.Completed}/{props.item.Commission}</td>
        <td>
            <OperationBtn>{t(`Cancel`)}</OperationBtn>
        </td>
    </tr>
}

export default function Orders() {
    const {t} = useTranslation();

    return (
        <OrdersStyle>
            <Title>{t(`All Orders`)}</Title>
            <Table>
                <thead>
                <tr>
                    <th>{t(`Time`)}</th>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Type`)}</th>
                    <th>{t(`Price`)}</th>
                    <th style={{width: "26%"}}>{t(`Completed Cont`)}/{t(`Commission Cont`)}</th>
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
            <Pagination onChange={(page) => console.log(page)} total={520} />
        </OrdersStyle>
    )
}
