import React, {useCallback, useEffect, useMemo} from 'react';
import { AccountStyle, ChartTab } from './Account.style';
import {useTranslation} from "react-i18next";
import Position from "../Position";
import LineChart from "src/components/lineChart/LineChart";
import useTheme from "src/hooks/useTheme";
import {useEffectState} from "src/hooks/useEffectState";
import {useAccountInfo} from "src/hooks/useAccountInfo";
import {IAccountPortfolio, useAccountAsset, useAccountPortfolio} from "src/ajax/user/user.type";
import {formatAmount, formatNumber} from "../../../common/utilTools";
import Toggle from 'src/components/toggle/Toggle';
import LineChart2 from 'src/components/lineChart/LineChart2';
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import RiseIcon from "../../../components/riseIcon/RiseIcon";
import {MonArr} from "../../../config";

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

            let result = state.data.profitList.map((item) => {
                let itemDate = new Date(item.dayDate);
                let Mon = itemDate.getMonth();
                let label = `${MonArr[Mon]} ${itemDate.getDate()}`;
                return [label, item.profitLoss]
            });
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

    const getTotalAssetInfo = useCallback((totalAsset: string) => {
        let obj = {className: "", dotal: ""};
        if (Number(totalAsset) > 0) {
            obj.className = "long";
            obj.dotal = "+";
        } else if(Number(totalAsset) < 0) {
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
                        <p className={"label"}>{t(`PORTFOLIO VALUE`)}</p>
                        <Toggle vIf={!!state.data.totalAssets}>
                            <p className={`val ${getTotalAssetInfo(state.data.totalAssets).className}`}>$ {formatNumber(state.data.totalAssets)}</p>
                            <p className={"val"}>-</p>
                        </Toggle>
                    </div>
                    <div className={"info"}>
                        <p className={"label"}>{t(`TODAY PNL`)}</p>
                        <Toggle vIf={!!state.data.todayProfitLoss}>
                            <p className={`flex-row ${getRiseInfo(state.data.todayProfitLoss).className}`}>
                                <RiseIcon className={`${getRiseInfo(state.data.todayProfitLoss).className}`} />
                                <span className={`val`}>{getRiseInfo(state.data.todayProfitLoss).dotal} $ {state.data.todayProfitLoss}</span>
                                <span>({state.data.todayIncreaseRate}%)</span>
                            </p>
                            <p className={"val"}>-</p>
                        </Toggle>
                    </div>
                    <div className={"info"}>
                        <p className={"label"}>{t(`TOTAL PNL`)}</p>
                        {/*<Toggle vIf={!!state.data.totalProfitLoss && state.data.totalProfitLoss !== "0"}>
                            <p className={getRiseInfo(state.data.totalProfitLoss).className}>
                                <span className={"val"}>{getRiseInfo(state.data.totalProfitLoss).dotal} $ {formatAmount(state.data.totalProfitLoss)}</span>
                                <span>({formatAmount(state.data.totalIncreaseRate, true)})</span>
                            </p>
                            <span className={`val`}>--</span>
                        </Toggle>*/}
                        <Toggle vIf={!!state.data.totalProfitLoss}>
                            <p className={`flex-row ${getRiseInfo(state.data.totalProfitLoss).className}`}>
                                <RiseIcon className={`${getRiseInfo(state.data.totalProfitLoss).className}`} />
                                <span className={"val"}>{getRiseInfo(state.data.totalProfitLoss).dotal} $ {state.data.totalProfitLoss}</span>
                                <span>({state.data.totalIncreaseRate}%)</span>
                            </p>
                            <p className={"val"}>-</p>
                        </Toggle>
                    </div>
                </div>
                <div className={"Trend"}>
                    {/*<p>{t(`Total PnL Trend`)}</p>*/}
                    <ChartTab>
                        {/*<div className={"tabItem active"}>{t(`Value Trend`)}</div>*/}
                        {/*<div className={"tabItem active"}>{t(`Total Pnl Trend`)}</div>*/}
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
                                        lineColor={theme.colors.long}
                                        chartStyle={{height: "2rem"}} style={{height: "100%"}} />
                        </Toggle>
                    </div>
                </div>
            </div>
            <div className={"listContainer"}>
                <h3 className={"title"} style={{marginBottom: "0.08rem"}}>{t(`Portfolios`)}</h3>
                <Position></Position>
            </div>
        </AccountStyle>
    )
}
