import React, {useCallback, useEffect, useMemo} from 'react';
import { AccountStyle, ChartTab } from './Account.style';
import {useTranslation} from "react-i18next";
import Position from "../Position";
import LineChart from "src/components/lineChart/LineChart";
import useTheme from "src/hooks/useTheme";
import {useEffectState} from "src/hooks/useEffectState";
import {useAccountInfo} from "src/hooks/useAccountInfo";
import {IAccountPortfolio, useAccountAsset, useAccountPortfolio} from "src/ajax/user/user.type";
import {formatAmount} from "../../../common/utilTools";
import Toggle from 'src/components/toggle/Toggle';
import LineChart2 from 'src/components/lineChart/LineChart2';
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";

export default function Account() {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const {theme} = useTheme();
    const state = useEffectState({
        data: {} as IAccountPortfolio
    });

    const {data} = useAccountPortfolio(storeData.token);
    useEffect(() => {
        if (data) {
            state.data = data;
        }
    }, [data]);
    const dataArr = useMemo(() => {
        if (state.data.profitList && state.data.profitList.length > 0) {
            let result = state.data.profitList.map((item) => [item.dayDate, item.profitLoss]);
            return result;
        }
        return  []
    }, [state.data]);

    const getRiseInfo = useCallback((rise: string) => {
        let obj = {className: "", dotal: ""};
        if (Number(rise) > 0) {
            obj.className = "long";
            obj.dotal = "+";
        } else if(Number(rise) < 0) {
            obj.className = "short";
            obj.dotal = "";
        }

        return obj;
    }, []);

    return (
        <AccountStyle>
            <div className={"detail"}>
                <div className={"userInfo flex-row"}>
                    <div className={"info"}>
                        <p className={"label"}>{t(`Portfolio value`)}</p>
                        <p className={"val"}>$ {state.data.totalAssets}</p>
                    </div>
                    <div className={"info"}>
                        <p className={"label"}>{t(`Today PnL`)}</p>
                        <p className={getRiseInfo(state.data.todayProfitLoss).className}>
                            <span className={`val`}>{getRiseInfo(state.data.todayProfitLoss).dotal} $ {state.data.todayProfitLoss}</span>
                            {/*<span>({state.data.todayIncreaseRate}%)</span>*/}
                        </p>
                    </div>
                    <div className={"info"}>
                        <p className={"label"}>{t(`Total PnL`)}</p>
                        {/*<Toggle vIf={!!state.data.totalProfitLoss && state.data.totalProfitLoss !== "0"}>
                            <p className={getRiseInfo(state.data.totalProfitLoss).className}>
                                <span className={"val"}>{getRiseInfo(state.data.totalProfitLoss).dotal} $ {formatAmount(state.data.totalProfitLoss)}</span>
                                <span>({formatAmount(state.data.totalIncreaseRate, true)})</span>
                            </p>
                            <span className={`val`}>--</span>
                        </Toggle>*/}
                        <p className={getRiseInfo(state.data.totalProfitLoss).className}>
                            <span className={"val"}>{getRiseInfo(state.data.totalProfitLoss).dotal} $ {state.data.totalProfitLoss}</span>
                            {/*<span>({state.data.totalIncreaseRate}%)</span>*/}
                        </p>
                    </div>
                </div>
                <div className={"Trend"}>
                    {/*<p>{t(`Total PnL Trend`)}</p>*/}
                    <ChartTab>
                        {/*<div className={"tabItem active"}>{t(`Value Trend`)}</div>*/}
                        <div className={"tabItem active"}>{t(`Total Pnl Trend`)}</div>
                    </ChartTab>
                    <div className={"chartContainer"}>
                        <Toggle vIf={dataArr.length > 0}>
                            {/*<LineChart
                                labelColor={theme.colors.labelColor}
                                lineColor={theme.colors.long}
                                lineWidth={4}
                                style={{height: "100%"}}
                                dataArr={dataArr}
                            />*/}
                            <LineChart2 dataArr={dataArr}
                                        slitLineColor={theme.colors.borderColor}
                                        lineColor={theme.colors.long}
                                        chartStyle={{height: "310px"}} style={{height: "100%"}} />
                        </Toggle>
                    </div>
                </div>
            </div>
            <h3 className={"title"}>{t(`Portfolios`)}</h3>
            <Position></Position>
        </AccountStyle>
    )
}
