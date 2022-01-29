import React, {CSSProperties, useEffect, useState} from 'react';
import { StepNumberStyle } from './StepNumber.style';
import {useEffectState} from "../../hooks/useEffectState";
import {INT_REG} from "../../common/regExp";

type IProps = {
    value?: number
    onChange(value: number): void
    style?: CSSProperties
    max?: number
    maxCb?(): void
    children?: React.ReactNode
}
export default function StepNumber(props: IProps) {
    const state = useEffectState({
        value: props.value ?? 1
    });

    useEffect(() => {
        props.onChange(state.value);
    }, [state.value]);

    function handleAdd() {
        if (props.max && state.value >= props.max) {
            props.maxCb && props.maxCb();
        } else if (typeof props.max === "number" && state.value < props.max) {
            state.value = state.value + 1;
        } else if (typeof props.max !== "number") {
            state.value = state.value + 1;
        }
    }

    function handleSub() {
        if (state.value > 1) {
            state.value = state.value - 1;
        }
    }

    return (
        <StepNumberStyle style={props.style}>
            <button className={"flex-box stepBtn"} onClick={handleSub}>-</button>
            <input className={"value"} value={state.value} onChange={(event) => {
                if (new RegExp(INT_REG, "g").test(event.target.value)) {
                    state.value = Number(event.target.value);
                }
            }} />
            <button className={"flex-box stepBtn"} onClick={handleAdd}>+</button>
        </StepNumberStyle>
    )
}
