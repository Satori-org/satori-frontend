import React from 'react';
import { AccountStyle } from './Account.style';
import {useTranslation} from "react-i18next";
import Position from "../Position";
import LineChart from "../../../components/lineChart/LineChart";
import {colors} from "../../../styles/style";

export default function Account() {
    const {t} = useTranslation();

    return (
        <AccountStyle>
            <div className={"detail"}>
                <div className={"userInfo"}>
                    <p>{t(`My Account Balance`)}</p>
                    <div className={"balanceBox flex-sb"}>
                        <div>
                            <p className={"label"}>{t(`Portfolio value`)}</p>
                            <p className={"balance"}>$ 1908.12</p>
                            <p className={"rise"}>$0.00(0.00%) {t(`Last Week`)}</p>
                        </div>
                        <LineChart width={224} height={88} onlyLine={true} lineWidth={4} lineColor={colors.long} dataArr={[["2017/01", 50], ["2017/02", 120], ["2017/03", 100], ["2017/04",500], ["2017/05",350], ["2017/06",600]]} />
                    </div>
                    <div className={"group"}>
                        <p className={"label"}>{t(`Today PnL`)}</p>
                        <p className={"balance"}>+ $ 253.66</p>
                        <p className={"rise"}>+8.91%</p>
                    </div>
                    <div className={"group"}>
                        <p className={"label"}>{t(`Total PnL`)}</p>
                        <p className={"balance"}>$ 1908.12</p>
                        <p className={"rise"}>-8.91%</p>
                    </div>
                </div>
                <div className={"Trend"}>
                    <p>{t(`Total PnL Trend`)}</p>
                    <div className={"chartContainer"}>
                        <LineChart style={{height: "100%"}} dataArr={[["2017/01", 50], ["2017/02", 120], ["2017/03", 100], ["2017/04",500], ["2017/05",350], ["2017/06",600]]} />
                    </div>
                </div>
            </div>
            <h3 className={"title"}>{t(`Position`)}</h3>
            <Position></Position>
        </AccountStyle>
    )
}
