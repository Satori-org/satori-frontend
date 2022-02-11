import React, {CSSProperties, useEffect, useState} from 'react';
import { StepNumberStyle } from './StepNumber.style';
import {useEffectState} from "../../hooks/useEffectState";
import {INT_REG} from "../../common/regExp";
import Decimal from "decimal.js";
import {isIntNumber, isNumber} from "../../common/utilTools";

type IProps = {
    value?: string
    onChange(value: string): void
    style?: CSSProperties
    max?: number
    maxCb?(): void
    children?: React.ReactNode
}
export default function StepNumber(props: IProps) {
    const state = useEffectState({
        value: props.value ?? "10"
    });

    useEffect(() => {
        props.onChange(state.value);
    }, [state.value]);

    function handleAdd() {
        if (!isNumber(state.value)) {
            return;
        }
        if (props.max && Number(state.value) >= props.max) {
            props.maxCb && props.maxCb();
        } else if (typeof props.max === "number" && Number(state.value) < props.max) {
            state.value = Decimal.add(state.value, 1).toFixed();
        } else if (typeof props.max !== "number") {
            state.value = Decimal.add(state.value, 1).toFixed();
        }
    }

    function handleSub() {
        if (isNumber(state.value) && Number(state.value) > 1) {
            state.value = Decimal.sub(state.value, 1).toFixed();
        }
    }

    return (
        <StepNumberStyle style={props.style}>
            <button className={"flex-box stepBtn"} onClick={handleSub}>-</button>
            <input className={"value"} value={state.value} onChange={(event) => {
                /*if (new RegExp(INT_REG, "g").test(event.target.value)) {
                    state.value = Number(event.target.value);
                }*/
                if (event.target.value === "" || isIntNumber(event.target.value)) {
                    state.value = event.target.value;
                }
            }} />
            <button className={"flex-box stepBtn"} onClick={handleAdd}>+</button>
        </StepNumberStyle>
    )
}
