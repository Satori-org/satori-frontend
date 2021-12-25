import React, {CSSProperties, useEffect} from 'react';
import { InputStyle } from './Input.style';
import {useEffectState} from "src/hooks/useEffectState";

type IProps = {
    unit?: string
    placeholder: string
    onChange(value: string): void
    style?: CSSProperties
    value?: string
    disabled?: boolean
}
export default function Input(props: IProps) {
    const state = useEffectState({
        value: props.value || ""
    });

    useEffect(() => {
        props.onChange(state.value)
    }, [state.value]);

    return (
        <InputStyle style={props.style}>
            <input type="text" className={"text"} placeholder={props.placeholder}
                   value={state.value}
                   disabled={props.disabled}
                   onChange={(event) => {
                      state.value = event.target.value;
                   }} />
            {
                props.unit
                    ? <span className={"unit"}>SNF</span>
                    : null
            }
        </InputStyle>
    )
}
