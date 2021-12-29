import React from 'react';
import { AccountStyle } from './Account.style';
import {useTranslation} from "react-i18next";
import Position from 'src/views/exchange/record/Position';

export default function Account() {
    const {t} = useTranslation();

    return (
        <AccountStyle>
            <div className={"detail"}>
                <div className={"userInfo"}>
                    <p>{t(`My Account Balance`)}</p>
                    <div className={"balanceBox"}>
                        <p className={"label"}>{t(`Portfolio value`)}</p>
                        <p className={"balance"}>$ 1908.12</p>
                        <p className={"rise"}>$0.00(0.00%) {t(`Last Week`)}</p>
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

                    </div>
                </div>
            </div>
            <h3 className={"title"}>{t(`Position`)}</h3>
            <Position></Position>
        </AccountStyle>
    )
}
