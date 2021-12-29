import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { DropDownStyle, Option } from './DropDown.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";

type IProps<T> = {
    options: {text: string, value: T}[],
    defaultIndex?: number,
    onChange(selectd: {text: string, value: T}): void
}
export default function DropDown<T>(props: IProps<T>) {
    const {t} = useTranslation();
    const state = useEffectState({
        selected: props.options[props.defaultIndex ?? 0],
        showOption: false
    });

    useEffect(() => {
        props.onChange(state.selected);
    }, [state.selected]);

    return (
        <DropDownStyle>
            <div className={"flex-row dropdownTrigger"} onClick={() => state.showOption = !state.showOption}>
                <span className={"text"}>{state.selected.text}</span>
                <img src={require("src/assets/images/arrow.png")} className={"icon"} alt=""/>
            </div>
            <Toggle vIf={state.showOption}>
                <Option>
                    {
                        props.options.map((item,index) => {
                            return <li className={`item ${item.value === state.selected.value ? 'active' : ''}`} key={index}
                                       onClick={() => {
                                           state.selected = item;
                                           state.showOption = false
                                       }}>{item.text}</li>
                        })
                    }
                </Option>
            </Toggle>
        </DropDownStyle>
    )
}
