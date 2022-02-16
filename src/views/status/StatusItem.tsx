import React from 'react';
import { useTranslation } from 'react-i18next';
import {Collapse, StatusItemStyle} from './Status.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../../components/toggle/Toggle";
import {INotice} from "../../ajax/types";
import {useThemeManager} from "../../hooks/useThemeManager";

type IProps = {
    data: INotice
}
export default function StatusItem(props: IProps) {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        collapse: true
    });

    return (
        <StatusItemStyle>
            <div className={"flex-sb"}>
                <div>
                    <h3 className={"title"}>{props.data.title}</h3>
                    <time className={"date"}>{props.data.createTime}</time>
                </div>
                <Collapse className={`flex-box ${state.collapse ? '' : 'active'}`} onClick={() => state.collapse = !state.collapse}>
                    <img src={isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")} className={"icon"} alt=""/>
                </Collapse>
            </div>
            <Toggle vIf={!state.collapse}>
                <div className={"statusContent"} dangerouslySetInnerHTML={{__html: props.data.info}}></div>
            </Toggle>
        </StatusItemStyle>
    )
}
