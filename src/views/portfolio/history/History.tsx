import React, {CSSProperties, useEffect, useMemo, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
    DateContainer,
    DropMenu,
    DropMenuContainer,
    HistoryStyle,
    RecordHeader,
    RecordTab
} from './History.style';
import {useEffectState} from "../../../hooks/useEffectState";
import TradesOrders from "./TradesOrders";
import Transfer from './Transfer';
import Funding from "./Funding";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {formatDate, getDayStartTime} from "../../../common/utilTools";
import Toggle from "../../../components/toggle/Toggle";
import DropDown from '../DropDown';
import Tab2 from "../../../components/tab2/Tab2";

export const tdStyle: CSSProperties = {
    fontSize: "0.14rem",
    lineHeight: "0.4rem"
};

type IDate = Date | null
export default function History() {
    const {t} = useTranslation();
    const [startDate, setStartDate] = useState<Date>(getDayStartTime());
    const childRef = useRef<{ resetPage(): void }>();
    const state = useEffectState({
        active: 0,
        symbol: "BTC/USDT",
        showDropMenu: false,
        pariId: 2,
        orderType: true,
        type: 1,
        startDate: null as IDate,
        endDate: null as IDate,
    });

    const symbols = [{text: "BTC/USD", value: 2}, {text: "ETH/USDT", value: 3}];
    const orderTypes = useMemo(() => {
        return [{text: t(`Market`), value: true}, {text: t(`Limit`), value: false}]
    }, [t]);
    const types = useMemo(() => {
        return [
            {text: t(`Deposit`), value: 1},
            {text: t(`Withdraw`), value: 2}
        ]
    }, [t]);
    const tabs = useMemo(() => {
        return [
            {text: t(`Trades`), value: 0},
            {text: t(`Transfer`), value: 1},
            {text: t(`Funding`), value: 2}
        ]
    }, [t]);
    const endTime = useMemo(() => {
        return startDate.getTime() + 24 * 60 *60 * 1000;
    }, [startDate]);

    useEffect(() => {
        /*document.addEventListener("click", docClick);

        return () => {
            document.removeEventListener("click", docClick);
        }*/
        console.log("startDate", startDate?.getTime())
    }, [startDate.getTime()]);

    function docClick() {
        state.showDropMenu = false;
    }

    const SearchComponent = useMemo(() => {
        switch (state.active) {
            case 1:
                return <DropDown<number> data={types} value={state.type} label={t(`Type`)} onChange={(value) => {
                    childRef.current && childRef.current.resetPage();
                    state.type = value;
                }}></DropDown>;
            case 2:
                return <DropDown<number> data={symbols} value={state.pariId} label={t(`Pairs`)} onChange={(value) => {
                    childRef.current && childRef.current.resetPage();
                    state.pariId = value;
                }}></DropDown>;
            default:
                return <>
                    <DropDown<number> data={symbols} value={state.pariId} label={t(`Pairs`)} onChange={(value) => {
                        childRef.current && childRef.current.resetPage();
                        state.pariId = value;
                    }}></DropDown>
                    <DropDown<boolean> data={orderTypes} value={state.orderType} label={t(`Order Type`)} onChange={(value) => {
                        childRef.current && childRef.current.resetPage();
                        state.orderType = value;
                    }}></DropDown>
                </>
        }
    }, [state.active, state.type, state.pariId, state.orderType, types, orderTypes]);

    const RecordComponent = useMemo(() => {
        switch (state.active) {
            case 1:
                return <Transfer type={state.type}
                                 startDate={state.startDate}
                                 childRef={childRef}
                                 endTime={state.endDate}></Transfer>;
            case 2:
                return <Funding pariId={state.pariId}
                                childRef={childRef}
                                startDate={state.startDate}
                                endTime={state.endDate}></Funding>;
            default:
                return <TradesOrders pariId={state.pariId}
                                     isMarket={state.orderType}
                                     startDate={state.startDate}
                                     childRef={childRef}
                                     endTime={state.endDate}></TradesOrders>
        }
    }, [state.active, state.orderType, state.pariId, state.type, startDate, state.orderType, state.startDate, state.endDate]);

    return (
        <HistoryStyle>
            <RecordHeader className={"flex-row"}>
                <RecordTab className={"flex-row"}>
                    <Tab2
                        options={tabs}
                        style={{width: "100%"}}
                        onChange={(value) => {
                        state.active = value;
                    }}></Tab2>
                    {/*{
                        tabs.map((item, index) => {
                            return <div key={index}
                                        className={`tabItem flex-box ${state.active === index ? 'active' : ''}`}
                                        onClick={() => state.active = index}>{item.text}</div>
                        })
                    }*/}
                </RecordTab>
                {SearchComponent}
                {/*<DropDown
                    className={"flex-sb"}
                    onMouseOver={(event) => state.showDropMenu = true}
                    onMouseLeave={() => state.showDropMenu = false}>
                    <span className={"label"}>{t(`Pairs`)}</span>
                    <div className={"flex-row"}>
                        <span>{state.symbol}</span>
                        <img src={require("src/assets/images/icon_arrow_down.png")} className={"icon"} alt="" />
                    </div>
                    <Toggle vIf={state.showDropMenu}>
                        <DropMenuContainer>
                            <DropMenu>
                                <li className={"flex-row label"}>{t(`Pairs`)}</li>
                                {
                                    symbols.map((item,index) => {
                                        return <li className={"flex-row menuItem"}
                                                   key={index}
                                                   onClick={(event) => {
                                                       event.stopPropagation();
                                                       state.symbol = item.symbol;
                                                       state.showDropMenu = false;
                                                   }}>{item.symbol}</li>
                                    })
                                }
                            </DropMenu>
                        </DropMenuContainer>
                    </Toggle>
                </DropDown>*/}
                {/*<DropDown className={"flex-sb"}>
                    <span className={"label"}>{t(`Order Type`)}</span>
                    <div className={"flex-row"}>
                        <span>Market</span>
                        <img src={require("src/assets/images/icon_arrow_down.png")} className={"icon"} alt="" />
                    </div>
                </DropDown>*/}
                <div>
                    <DatePicker
                        selectsRange
                        startDate={state.startDate}
                        endDate={state.endDate}
                        onChange={(value) => {
                            state.startDate = value[0];
                            state.endDate = value[1];
                        }}
                        customInput={<DateContainer className={"flex-sb"}>
                            <span className={"label"}>{t(`Date`)}</span>
                            <div className={"flex-row"}>
                                <span style={{marginTop: "2px"}}>{state.startDate ? formatDate(state.startDate.getTime(), "yyyy-MM-dd") : "YYYY-MM-DD"}</span>
                                <span style={{margin: "0 4px"}}>To</span>
                                <span style={{marginTop: "2px"}}>{state.endDate ? formatDate(state.endDate.getTime(), "yyyy-MM-dd") : "YYYY-MM-DD"}</span>
                                <img src={require("src/assets/images/icon_calendar.png")} className={"calendar"} alt="" />
                            </div>
                        </DateContainer>}
                    />
                </div>
            </RecordHeader>
            <div className={"listContainer"}>
                {RecordComponent}
            </div>
        </HistoryStyle>
    )
}
