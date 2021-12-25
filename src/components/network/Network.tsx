import React from 'react';
import { NetworkStyle } from './Network.style';

export default function Network() {

    return (
        <NetworkStyle className={"flex-row"}>
            <img src={require("src/assets/images/clv_nav.png")} className={"icon"} alt=""/>
            <span>CLV</span>
        </NetworkStyle>
    )
}
