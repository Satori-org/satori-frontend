import React from 'react';
import {NetworkItem, NetworkList, NetworkPanel, NetworkStyle} from './Network.style';
import {useThemeManager} from "src/hooks/useThemeManager";
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";
import {CHAINS} from "../../contract/config";
import {NavChild} from "../header/Header.style";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {mapDispatchToProps} from "../../store/connect";

export default function Network() {
    const { isDark } = useThemeManager();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const state = useEffectState({
        showPanel: false
    });

    return (
        <NetworkStyle className={"flex-box borderRadius"} onMouseOver={() => state.showPanel = true} onMouseLeave={() => state.showPanel = false}>
            <img src={storeData.network.icon} className={"icon"} alt=""/>
            <span>{storeData.network.name}</span>
            <img src={isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")} className={"arrow"} alt=""/>
            <Toggle vIf={state.showPanel}>
                <NetworkList>
                    <NetworkPanel>
                        {
                            Object.values(CHAINS).map((item, index) => {
                                return <NetworkItem
                                    key={index}
                                    className={`flex-row ${storeData.network.name === item.name ? 'active' : ''}`}
                                    onClick={() => {
                                        dispatch.setNetwork(item);
                                        state.showPanel = false;
                                    }}>
                                    <img src={item.icon} className={"icon"} alt=""/>
                                    <span>{item.name}</span>
                                </NetworkItem>
                            })
                        }
                    </NetworkPanel>
                </NetworkList>
            </Toggle>
        </NetworkStyle>
    )
}
