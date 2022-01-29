import React from 'react';
import { useTranslation } from 'react-i18next';
import {PositionStyle} from './styles/Position.style';
import Table from "src/components/table/Table";
import OperationBtn from "../../components/OperationBtn/OperationBtn";
import Pagination from "../../components/pagination/Pagination";

const data = [
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_buy@2x.png"), average: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" },
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_sell@2x.png"), average: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" }
];

type IRow = {
    item: (typeof data)[0]
}
function Row(props: IRow) {
    const {t} = useTranslation();

    return <>
        <tr>
            <td>
                <div className={"flex-row"}>
                    <img src={props.item.icon} className={"tokenIcon"} alt=""/>
                    <span className={"name"}>{props.item.name}</span>
                    <span className={"Leverage"}>25X</span>
                </div>
            </td>
            <td>{props.item.average}</td>
            <td>{props.item.LiquidationPrice}</td>
            <td>{props.item.amount} BTC</td>
            <td>{props.item.Margin}</td>
            <td>{props.item.Margin}</td>
            <td className={"long"}>{props.item.Unrealized}</td>
            <td>
                <OperationBtn>{t(`View`)}</OperationBtn>
            </td>
        </tr>
    </>
}

export default function Position() {
    const {t} = useTranslation();

    return (
        <PositionStyle>
            <Table>
                <thead>
                <tr>
                    <th>{t(`Market`)}</th>
                    <th>{t(`Average Open`)}</th>
                    <th>{t(`Liquidation Price`)}</th>
                    <th>{t(`Amount`)}</th>
                    <th>{t(`Margin`)}</th>
                    <th>{t(`Fee`)}</th>
                    <th>{t(`Unrealized PnL`)}</th>
                    <th>{t(`Action`)}</th>
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
            <Pagination onChange={(page) => console.log(page)} total={88} />
        </PositionStyle>
    )
}
