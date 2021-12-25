import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {PanelStyle, SettingStyle} from './styles/Setting.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../../components/toggle/Toggle";
import {useCustomerTokenInfo} from "./useCustomerTokenInfo";

const checkbox_default = require("src/assets/images/icon_checkbox_default@2x.png");
const checkbox_selected = require("src/assets/images/icon_checkbox_selected@2x.png");

export default function Setting() {
    const {t} = useTranslation();
    const {customerTokenInfo, toggleTokenInfo} = useCustomerTokenInfo();

    const state = useEffectState({
        showPanel: false
    });

    function PanelItem() {

    }

    return (
        <SettingStyle className={"flex-box"}>
            <img src={require("src/assets/images/settings.png")} className={"icon"} alt=""
                 onClick={() => state.showPanel = !state.showPanel}/>
            <Toggle vIf={state.showPanel}>
                <PanelStyle>
                    {
                        customerTokenInfo.map((item, index) => {
                            return <div className={"panelOption"} key={index}
                                        onClick={() => {toggleTokenInfo(index, !item.show)}}>
                                <img src={item.show ? checkbox_selected : checkbox_default} className={"checkBoxIcon"} alt="" />
                                <span>{item.text}</span>
                            </div>
                        })
                    }
                    {/*<div className={"panelOption"}>
                        <img src={require("src/assets/images/icon_checkbox_default@2x.png")} className={"checkBoxIcon"} alt="" />
                        <span></span>
                    </div>*/}
                </PanelStyle>
            </Toggle>
        </SettingStyle>
    )
}
