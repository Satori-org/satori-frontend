import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { PercentStyle } from './Percent.style';
import {useEffectState} from "../../hooks/useEffectState";

type IOption<T> = {text?: string, value: T}
type IProps<T = number> = {
    data: IOption<T>[],
    onChange(value: T, selected: IOption<T>): void
    value: T
}
export default function Percent<T>(props: IProps<T>) {
    const {t} = useTranslation();
    const state = useEffectState({
        active: 0,
        selected: {} as IOption<T>
    });

    useEffect(() => {
        const selected = getSelected(props.value);
        if (selected.value) {
            state.selected = selected;
        } else {
            state.selected = {} as IOption<T>;
        }
    }, [props.value]);

    useEffect(() => {
        if (state.selected.value && state.selected.value !== props.value) {
            props.onChange(state.selected.value, state.selected);
        }
    }, [state.selected, props.value]);

    function getSelected(value: T) {
        let defaultOption = {} as IOption<T>;
        props.data.some((item, index) => {
            if (item.value === value) {
                defaultOption = item;
                state.active = index;
                return true;
            }
            return false;
        });
        return defaultOption;
    }

    return (
        <PercentStyle length={props.data.length}>
            {
                props.data.map((item, index) => {
                    return <div className={`flex-box percentItem ${state.selected.value === item.value ? 'active' : ''}`}
                                key={index}
                                onClick={() => {
                                    state.active = index;
                                    state.selected = item;
                                }}>{item.value}%</div>
                })
            }
        </PercentStyle>
    )
}
