import React, {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {DropDownStyle, DropMenu, DropMenuContainer} from './styles/DropDown.style';
import Toggle from "../../components/toggle/Toggle";
import {useEffectState} from "../../hooks/useEffectState";
import {useThemeManager} from "../../hooks/useThemeManager";

type IItem<T> = {
    value: T,
    text: string
}
type IProps<T> = {
    value: T,
    label?: string
    data: Array<IItem<T>>
    onChange(value: T, item?: IItem<T>): void
}
export default function DropDown<T>(props: IProps<T>) {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        value: props.value,
        showDropMenu: false
    });

    useEffect(() => {
        state.value = props.value;
    }, [props.value]);

    const selectedData = useMemo(() => {
        let selected = props.data[0];
        props.data.some((item) => {
            if (item.value === state.value) {
                selected = item;
                return true
            }
            return false;
        });
        return selected;
    }, [state.value, props.data]);

    return (
        <DropDownStyle
            className={"flex-sb"}
            onMouseOver={(event) => state.showDropMenu = true}
            onMouseLeave={() => state.showDropMenu = false}>
            <span className={"label"}>{props.label}</span>
            <div className={"flex-row"}>
                <span className={"selected-text"}>{selectedData && selectedData.text}</span>
                <img src={isDark ? require("src/assets/images/dark/icon_arrow_down2.png") : require("src/assets/images/light/icon_arrow_down2.png")} className={"icon"} alt="" />
            </div>
            <Toggle vIf={state.showDropMenu}>
                <DropMenuContainer>
                    <DropMenu>
                        {/*<li className={"flex-row label"}>{props.label}</li>*/}
                        {
                            props.data.map((item,index) => {
                                return <li className={"flex-row menuItem"}
                                           key={index}
                                           onClick={(event) => {
                                               event.stopPropagation();
                                               //state.value = item.value;
                                               props.onChange(item.value);
                                               state.showDropMenu = false;
                                           }}>{item.text}</li>
                            })
                        }
                    </DropMenu>
                </DropMenuContainer>
            </Toggle>
        </DropDownStyle>
    )
}
