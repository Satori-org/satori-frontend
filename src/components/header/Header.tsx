import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import {HeaderStyle, Logo, Nav} from './Header.style';
import {RouterLink} from "../../react-router-perfect/Index";
import Network from "../network/Network";
import ConectWallet from "../connectWallet/ConectWallet";
import Msg from "../msg/Msg";
import Language from "../language/Language";

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
                    <RouterLink className={"item"} activeClassName={"active"} to={"/"} exact={true}>{t(`Perpetual Trade`)}</RouterLink>
                    <RouterLink className={"item"} activeClassName={"active"} to={"/portfolio"}>{t(`Portfolio`)}</RouterLink>
                    {/*<RouterLink className={"item"} activeClassName={"active"} to={"/Docs"}>{t(`Docs`)}</RouterLink>*/}
                    <a className={"item"} href="/help/document">{t(`Docs`)}</a>
                </Nav>
            </div>
            <div className={"flex-row"}>
                <Language style={{marginRight: "24px"}} />
                <Network />
                <ConectWallet style={{margin: "0 24px"}} />
                <Msg></Msg>
            </div>
        </HeaderStyle>
    )
}
