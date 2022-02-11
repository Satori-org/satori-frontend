import React from 'react';
import { NetworkStyle } from './Network.style';
import {useThemeManager} from "src/hooks/useThemeManager";

export default function Network() {
    const { isDark } = useThemeManager();

    return (
        <NetworkStyle className={"flex-box borderRadius"}>
            <img src={require("src/assets/images/clv_nav.png")} className={"icon"} alt=""/>
            <span>CLV</span>
            <img src={isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")} className={"arrow"} alt=""/>
        </NetworkStyle>
    )
}
