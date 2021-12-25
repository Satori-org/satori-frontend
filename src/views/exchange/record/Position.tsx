import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {PercentStyle, PositionStyle } from '../styles/Position.style';
import Table from "../../../components/table/Table";
import Copy from "../../../components/copy/Copy";
import {useEffectState} from "../../../hooks/useEffectState";
import Toggle from 'src/components/toggle/Toggle';

const data = [
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_buy@2x.png"), entryPrice: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" },
    { name: "BTC/USDT", icon: require("src/assets/images/icon_pairs_sell@2x.png"), entryPrice: "1.078236", LiquidationPrice: "1.07", amount: "6.998", Margin: "1,297.60", Unrealized: "1.894541 (-129.35%)" }
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
                <img src={props.item.icon} className={"tokenIcon"} alt=""/>
                <span className={"name"}>{props.item.name}</span>
                <span className={"Leverage"}>25X</span>
            </div>
        </td>
        <td>{props.item.entryPrice}</td>
        <td>{props.item.LiquidationPrice}</td>
        <td>{props.item.amount} BTC</td>
        <td>
            <div className={"flex-row"}>
                <span style={{marginRight: "4px"}}>{props.item.Margin}</span>
                <Copy text={"132456"} callback={() => alert('复制成功')}></Copy>
            </div>
        </td>
        <td className={"long"}>{props.item.Unrealized}</td>
        <td>
            <div className={"flex-row"} style={{position: "relative"}}>
                <button className={"closeBtn"}>{t(`Close Positions`)}</button>
                <input type="text" className={"input"}
                       value={state.percent}
                       onChange={(event) => state.percent = event.target.value}
                       onFocus={() => state.showpercent = true}
                       onBlur={() => {
                            setTimeout(() => {
                                state.showpercent = false
                            }, 100);
                       }} />
                <Toggle vIf={state.showpercent}>
                    <PercentStyle>
                        {
                            percents.map((item,index) => {
                                return <span className={`percentItem ${state.percent === `${item*100}%` ? 'active' : ''}`}
                                             key={index}
                                             onClick={() => state.percent = `${item*100}%`}>{item*100}%</span>
                            })
                        }
                    </PercentStyle>
                </Toggle>
            </div>
        </td>
    </tr>
}

export default function Position() {
    const {t} = useTranslation();

    return (
        <PositionStyle>
            <Table>
                <thead>
                    <tr>
                    <th>{t(`Pairs`)}</th>
                    <th>{t(`Entry Price`)}</th>
                    <th>{t(`Liquidation Price`)}</th>
                    <th>{t(`Amount`)}</th>
                    <th>{t(`Margin`)}</th>
                    <th>{t(`Unrealized PnL(ROE%)`)}</th>
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
        </PositionStyle>
    )
}
