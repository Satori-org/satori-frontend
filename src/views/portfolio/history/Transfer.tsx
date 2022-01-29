import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from "src/components/table/Table";
import Pagination from "../../../components/pagination/Pagination";

const data = [
    {time: "2021-11-22 13:00:45",type: 'Deposit',Amount: "$1.078236",Status: "confirmed", address: "0x5022b938170167511A065D339d00002FdcBCfC27"},
    {time: "2021-11-22 13:00:45",type: 'Withdraw',Amount: "$1.078236",Status: "confirmed", address: "0x5022b938170167511A065D339d00002FdcBCfC27"}
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td>{props.item.time}</td>
            <td>{props.item.type}</td>
            <td>{props.item.Amount}</td>
            <td>{props.item.Status}</td>
            <td>
                <a className={"flex-row"} href={"http://www.baidu.com"} target={"_blank"}>
                    <span>{props.item.address}</span>
                    <img src={require("src/assets/images/link.png")} style={{width: "14px",height: "14px",marginLeft:"6px"}} alt="" />
                </a>
            </td>
        </tr>
    </>
}

export default function Transfer() {
    const {t} = useTranslation();

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th style={{width: "17.2%"}}>{t(`Time`)}</th>
                    <th>{t(`Type`)}</th>
                    <th>{t(`Amount`)}</th>
                    <th>{t(`Status`)}</th>
                    <th style={{width: "26%"}}>{t(`Account Address`)}</th>
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
