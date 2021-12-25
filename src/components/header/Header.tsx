import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import {HeaderStyle, Logo, Nav} from './Header.style';
import {RouterLink} from "../../react-router-perfect/Index";
import Network from "../network/Network";
import ConectWallet from "../connectWallet/ConectWallet";
import Msg from "../msg/Msg";

type IProps = {
    style?: CSSProperties
}
export default function Header(props: IProps) {
    const {t, i18n} = useTranslation();

    return (
        <HeaderStyle className={"flex-sb"} style={props.style}>
            <div className={"flex-row"}>
                <RouterLink to={"/"}>
                    <Logo src={require("src/assets/images/logo.png")} />
                </RouterLink>
                <Nav>
                    <RouterLink className={"item"} to={"/trade"}>{t(`Perpetual Trade`)}</RouterLink>
                    <RouterLink className={"item"} to={"/Portfolio"}>{t(`Portfolio`)}</RouterLink>
                    <RouterLink className={"item"} to={"/Docs"}>{t(`Docs`)}</RouterLink>
                </Nav>
            </div>
            <div className={"flex-row"}>
                <Network />
                <ConectWallet style={{margin: "0 24px"}} />
                <Msg></Msg>
            </div>
        </HeaderStyle>
    )
}
