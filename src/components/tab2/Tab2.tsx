import React, {CSSProperties, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Tab2Style } from './Tab2.style';
import {useEffectState} from "../../hooks/useEffectState";
import {TabStyle} from "../tab/Tab.style";

type IOption<T> = {text: string, value: T}
type IProps<T = number> = {
    options: IOption<T>[]
    onChange(value: T, selected: IOption<T>): void
    defaultValue?: T
    style?: CSSProperties
}
export default function Tab2<T = number>(props: IProps<T>) {
    const state = useEffectState({
        active: 0,
        selected: (() => {
            let defaultOption = props.options[0];
            props.options.some((item, index) => {
                if (item.value === props.defaultValue) {
                    defaultOption = item;
                    state.active = index;
                    return true;
                }
                return false;
            });
            return defaultOption;
        })()
    });

    useEffect(() => {
        props.onChange(state.selected.value, state.selected);
    }, [state.active]);

    return (
        <Tab2Style className={"borderRadius"} len={props.options.length} style={props.style}>
            {
                props.options.map((item,index) => {
                    return <button className={`button ${state.selected.value === item.value ? 'active' : ''}`}
                                key={index}
                                onClick={() => {
                                    state.active = index;
                                    state.selected = item;
                                }}>{item.text}</button>
                })
            }
        </Tab2Style>
    )
}
