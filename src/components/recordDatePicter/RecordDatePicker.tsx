import React, {CSSProperties, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {DateContainer, DateTab, RecordDatePickerStyle, Search} from './RecordDatePicker.style';
import {useEffectState} from "../../hooks/useEffectState";
import DatePicker from "react-datepicker";
import "src/lib/react-datepicker.css";
import {formatDate} from "../../common/utilTools";

type IProps = {
    style?: CSSProperties
    onSelectRange(startDate: Date, endDate: Date): void
    onChange(value: number): void
}
export default function RecordDatePicker(props: IProps) {
    const {t} = useTranslation();
    const state = useEffectState({
        value: 0,
        startDate: null as (Date | null),
        endDate: null as (Date | null),
    });

    const dates = useMemo(() => {
        return [
            {text: t(`1Day`), value: 2},
            {text: t(`1Week`), value: 3},
            {text: t(`1Month`), value: 4},
            {text: t(`3Months`), value: 5},
        ]
    }, [t]);

    return (
        <RecordDatePickerStyle className={"flex-row"} style={props.style}>
            <DateTab>
                {
                    dates.map((item,index) => {
                        return <span className={`tabItem ${item.value === state.value ?'active':''}`}
                                     key={index}
                                     onClick={() => {
                                         state.value = item.value;
                                         props.onChange(item.value);
                                     }}>{item.text}</span>
                    })
                }
            </DateTab>
            <div className={"flex-row"} style={{marginLeft: "32px", fontSize: "16px"}}>
                <span className={"label"} style={{marginRight: "12px"}}>{t(`Time`)}</span>
                <DatePicker
                    customInput={<DateContainer className={"flex-row"}>
                        <span className={`dateField ${state.startDate ? 'active' : ''}`}>{ state.startDate ? formatDate(state.startDate.getTime(), "YYYY-MM-dd") : "YYYY-MM-DD"}</span>
                        <span style={{margin: "0 8px"}}>{t(`To`)}</span>
                        <span className={`dateField ${state.startDate ? 'active' : ''}`}>{ state.endDate ? formatDate(state.endDate.getTime(), "YYYY-MM-dd") : "YYYY-MM-DD"}</span>
                        <img src={require("src/assets/images/icon_calendar.png")} className={"calendar"} alt="" />
                    </DateContainer>}
                    selectsRange
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onChange={(value) => {
                        state.startDate = value[0];
                        state.endDate = value[1];
                    }}
                >
                </DatePicker>
                <Search onClick={() => {
                    if (state.startDate && state.endDate) {
                        props.onSelectRange(state.startDate, state.endDate);
                    }
                }}>{t(`Seach`)}</Search>
            </div>
        </RecordDatePickerStyle>
    )
}
