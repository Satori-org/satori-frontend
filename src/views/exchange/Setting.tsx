import React, {useEffect} from 'react';
import {PanelStyle, SettingStyle} from './styles/Setting.style';
import {useEffectState} from "src/hooks/useEffectState";
import {ICustomerToken, useCustomerTokenInfo} from "./useCustomerTokenInfo";
import {CSSTransition} from "react-transition-group";

const checkbox_default = require("src/assets/images/icon_checkbox_default@2x.png");
const checkbox_selected = require("src/assets/images/icon_checkbox_selected@2x.png");

type IProps = {
    onChange(customerTokens: ICustomerToken[]): void
}
export default function Setting(props: IProps) {
    const {customerTokenInfo, toggleTokenInfo} = useCustomerTokenInfo();
    const state = useEffectState({
        showPanel: false
    });

    useEffect(() => {
        props.onChange(customerTokenInfo);
    }, [customerTokenInfo]);

    return (
        <SettingStyle className={"flex-box"}>
            <img src={require("src/assets/images/settings.png")} className={"icon"} alt=""
                 onClick={() => state.showPanel = !state.showPanel}/>
                <CSSTransition in={state.showPanel} timeout={200} classNames={"my-slider-right"} unmountOnExit>
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
                    </PanelStyle>
                </CSSTransition>
        </SettingStyle>
    )
}
