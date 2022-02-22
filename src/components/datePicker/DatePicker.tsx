import React, {CSSProperties, useCallback, useEffect, useMemo, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {DateContent, DatePickerPanel, DatePickerStyle, PickerHeader, PickerTitle, RowItem} from './DatePicker.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";

type IProps = {
    selectsRange?: boolean
    customInput: React.ReactNode
    startDate?: Date | null
    endDate?: Date | null
    onChange(dates: Date[]): void
}
export default function DatePicker(props: IProps) {
    const {t} = useTranslation();
    const customRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const currentDate = new Date();
    const state = useEffectState({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDay(),
        startValue: props.startDate,
        endValue: props.endDate,
        hoverValue: null as (Date | null),
        showPanel: false,
        pickerStyle: {} as CSSProperties
    });

    const Week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const Mon = ["January", "February", "March", "April  ", "May", "June", "July ", "August", "September", "October", "November", "December"];

    function domOnClick() {
        state.showPanel = false;
    }
    function domOnScroll() {
        setTimeout(() => {
            calcPosition();
        }, 1000);
    }

    function reset() {
        state.startValue = null;
        state.endValue = null;
        state.hoverValue = null;
    }

    useEffect(() => {
        document.addEventListener("click", domOnClick);
        document.addEventListener("scroll", calcPosition);

        return () => {
            document.removeEventListener("click", domOnClick);
            document.removeEventListener("scroll", calcPosition);
        }
    }, []);
    useEffect(() => {
        if (!state.showPanel) {
            //reset();
        }
    }, [state.showPanel]);

    useEffect(() => {
        if (state.startValue && state.endValue) {
            props.onChange([state.startValue, state.endValue]);
            state.showPanel = false;
        }
    }, [state.startValue, state.endValue]);

    useEffect(() => {
        setTimeout(() => {
            calcPosition();
        }, 0);
    }, [state.showPanel, state.month]);

    function calcPosition() {
        if (customRef.current && panelRef.current) {
            let left = customRef.current.getBoundingClientRect().left;
            let _top = customRef.current.getBoundingClientRect().top;
            let width = customRef.current.offsetWidth;
            let height = customRef.current.offsetHeight;

            if (window.innerHeight - _top - height - 20 < panelRef.current.offsetHeight) {
                _top = _top - panelRef.current.offsetHeight - 10
            } else {
                _top = _top + height + 10
            }

            state.pickerStyle = {
                left: left,
                top: _top,
                opacity: 1
            }
        } else {
            state.pickerStyle = {};
        }
    }

    const preDays = useMemo(() => {
        let dateInfo = new Date(`${state.year}/${state.month}/1`);
        let day = dateInfo.getDay() || 7;
        let timer = dateInfo.setDate(0);
        let lastDate = new Date(timer).getDate();
        let arr: number[] = [];
        new Array(day - 1).fill("").forEach((item, index) => {
            arr.push(lastDate - index);
        });

        return arr.reverse();
    }, [state.year, state.month]);
    const currentDays = useMemo(() => {
        let dateInfo;
        if (state.month === 12) {
            dateInfo = new Date(`${state.year+1}/1/1`);
        } else {
            dateInfo = new Date(`${state.year}/${state.month+1}/1`);
        }

        dateInfo.setDate(0);
        let lastDate = dateInfo.getDate();
        let arr: number[] = [];
        new Array(lastDate).fill("").forEach((item, index) => {
            arr.push(index+1);
        });

        return arr;
    }, [state.year, state.month]);
    const nextDays = useMemo(() => {
        let dateInfo;
        if (state.month === 12) {
            dateInfo = new Date(`${state.year+1}/1/1`);
        } else {
            dateInfo = new Date(`${state.year}/${state.month+1}/1`);
        }

        dateInfo.setDate(0);
        let day = dateInfo.getDay() || 7;
        let arr: number[] = [];
        new Array(7 - day).fill("").forEach((item, index) => {
            arr.push(index+1);
        });

        return arr;
    }, [state.year, state.month]);

    const getItemClassName = useCallback((value: number) => {
        let onSelectTimer = new Date(`${state.year}/${state.month}/${value}`).getTime();
        if (!state.startValue) {
            return "";
        }
        if (onSelectTimer === state.startValue.getTime()) {
            return "start_date";
        }
        let ltEnd = state.endValue && onSelectTimer < state.endValue.getTime();
        let ltHover = state.hoverValue && onSelectTimer <= state.hoverValue.getTime();
        if (onSelectTimer > state.startValue.getTime() && (ltEnd || ltHover)) {
            return "range"
        }
        if (onSelectTimer === state.endValue?.getTime()) {
            return "end_date";
        }
    }, [state.year, state.month, state.startValue, state.endValue]);



    return (
        <DatePickerStyle ref={customRef} onClick={(event) => {
            event.stopPropagation();
            state.showPanel = true;
        }}>
            {props.customInput}
            <Toggle vIf={state.showPanel}>
                <DatePickerPanel
                    ref={panelRef}
                    style={state.pickerStyle}
                    onMouseLeave={() => state.hoverValue = null}
                    onClick={(event) => event.stopPropagation()} >
                    <PickerTitle className={"flex-sb"}>
                        <img src={require("src/assets/images/arrow-left.png")}
                             className={"icon"}
                             alt=""
                             onClick={() => {
                                 if (state.month === 1) {
                                     state.year -=1;
                                     state.month = 12;
                                 } else {
                                     state.month -=1;
                                 }
                             }}/>
                        <span>{Mon[state.month - 1]} {state.year}</span>
                        <img
                            src={require("src/assets/images/arrow-left.png")}
                            className={"icon right"}
                            alt=""
                            onClick={() => {
                                if (state.month === 12) {
                                    state.year +=1;
                                    state.month = 1;
                                } else {
                                    state.month +=1;
                                }
                            }}/>
                    </PickerTitle>
                    <PickerHeader>
                        {
                            Week.map((item, index) => {
                                return <RowItem className={"header"} key={index}>{item}</RowItem>
                            })
                        }
                    </PickerHeader>
                    <DateContent>
                        {
                            preDays.map((item, index) => {
                                return <RowItem disabled={true} key={item}>{item}</RowItem>
                            })
                        }
                        {
                            currentDays.map((item, index) => {
                                return <RowItem
                                    key={`${state.month}-${item}`}
                                    className={getItemClassName(item)}
                                    onMouseOver={() => {
                                        let currentDate = new Date(`${state.year}/${state.month}/${item}`);
                                        if (!!state.startValue && currentDate.getTime() > state.startValue.getTime()) {
                                            state.hoverValue = currentDate;
                                        }
                                    }}
                                    onClick={() => {
                                        state.hoverValue = null;
                                        let currentDate = new Date(`${state.year}/${state.month}/${item}`);
                                        if (state.startValue) {
                                            if (!state.endValue && currentDate.getTime() > state.startValue.getTime()) {
                                                state.endValue = currentDate;
                                            } else if(state.endValue) {
                                                state.startValue = currentDate;
                                                state.endValue = null;
                                            } else {
                                                state.startValue = currentDate;
                                            }
                                        } else {
                                            state.startValue = currentDate;
                                        }
                                    }}
                                >{item}</RowItem>
                            })
                        }
                        {
                            nextDays.map((item, index) => {
                                return <RowItem disabled={true} key={item}>{item}</RowItem>
                            })
                        }
                    </DateContent>
                </DatePickerPanel>
            </Toggle>
        </DatePickerStyle>
    )
}
