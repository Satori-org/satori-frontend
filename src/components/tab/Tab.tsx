import React, {CSSProperties, useEffect, useMemo} from 'react';
import {TabSlider, TabStyle} from './Tab.style';
import {useEffectState} from "../../hooks/useEffectState";

type IOption<T> = {text: string, value: T}
type IProps<T = number> = {
    options: IOption<T>[]
    onChange(value: T, selected: IOption<T>): void
    defaultValue?: T
}
export default function Tab<T>(props: IProps<T>) {
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

    const sliderStyle = useMemo((): CSSProperties => {
        return {
            transform: `translate(${state.active*100}%)`
        }
    }, [state.active]);

    return (
        <TabStyle len={props.options.length}>
            {
                props.options.map((item,index) => {
                    return <div className={`item ${state.selected.value === item.value ? 'active' : ''}`}
                                key={index}
                                onClick={() => {
                                    state.active = index;
                                    state.selected = item;
                                }}>{item.text}</div>
                })
            }
            <TabSlider len={props.options.length} style={sliderStyle} />
        </TabStyle>
    )
}
