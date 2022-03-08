import React, {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderStyle, Logo, Nav, NavChild, NavMenu, NavMenuContainer} from './Header.style';
import {RouterLink} from "../../react-router-perfect/Index";
import Network from "../network/Network";
import ConectWallet from "../connectWallet/ConectWallet";
import Msg from "../msg/Msg";
import ThemeControl from "../themeControl/ThemeControl";
import Guide from "../guide/Guide";
import {showMessage} from "../../common/utilTools";
import {MsgStatus} from "../../common/enum";
import Toggle from "../toggle/Toggle";
import {useEffectState} from "../../hooks/useEffectState";
import {useThemeManager} from "../../hooks/useThemeManager";
import useTheme from "../../hooks/useTheme";

type IProps = {
    style?: CSSProperties
}
export default function Header(props: IProps) {
    const {t, i18n} = useTranslation();
    const {isDark} = useThemeManager();
    const { theme } = useTheme();
    const state = useEffectState({
        showDrop: false
    });

    function showWait() {
        showMessage(t(`Coming soon`), MsgStatus.warn)
    }

    return (
        <HeaderStyle style={props.style}>
            <div className={"flex-row"}>
                <RouterLink to={"/"}>
                    <Logo src={isDark?require("src/assets/images/logo_dark.png"):require("src/assets/images/logo_light.png")} />
                </RouterLink>
                {/*<RouterLink to={"/"} className={"logoName"}>Satori</RouterLink>*/}
                <Nav className={"flex-row"}>
                    <RouterLink className={"item flex-box font12"} activeClassName={"active"} to={"/"} exact={true}>{t(`Perpetual Trade`)}</RouterLink>
                    <RouterLink className={"item flex-box font12"} activeClassName={"active"} to={"/portfolio"}>{t(`Portfolio`)}</RouterLink>
                    <NavChild className={"item font12"} onMouseOver={() => state.showDrop = true} onMouseLeave={() => state.showDrop = false}>
                        <RouterLink className={"flex-box menuLabel font12"}
                                    activeClassName={"active"}
                                    beforeOnClick={() => Promise.reject()}
                                    to="/doc">{t(`Developers`)}</RouterLink>
                        <Toggle vIf={state.showDrop}>
                            <NavMenuContainer>
                                <NavMenu className={"navMenu font12"}>
                                    <RouterLink className={"menuItem flex-box"} activeClassName={"active"} to={"/doc/status"} beforeOnClick={() => {
                                        state.showDrop = false;
                                        return Promise.resolve()
                                    }}>{t(`Status`)}</RouterLink>
                                    <a className={"menuItem flex-box"} href="https://docs.satori.finance/#introduction" target={"_blank"}>{t(`Document`)}</a>
                                </NavMenu>
                            </NavMenuContainer>
                        </Toggle>
                    </NavChild>
                    <a className={"item flex-box"} onClick={showWait}>{t(`Ranking`)}</a>
                    <a className={"item flex-box"} onClick={showWait}>{t(`Rewards`)}</a>
                    <a className={"item flex-box"} onClick={showWait}>{t(`DAO`)}</a>
                    <a className={"item flex-box"} onClick={showWait}>{t(`Forum`)}</a>
                    {/*<RouterLink className={"item"} activeClassName={"active"} to={"/Docs"}>{t(`Docs`)}</RouterLink>*/}
                </Nav>
            </div>
            <div className={"flex-row font12"} style={{color: theme.colors.headerRightColor}}>
                <Guide style={{marginRight: "0.34rem"}} />
                {/*<Language style={{marginRight: "24px"}} />*/}
                <Network />
                <ConectWallet style={{margin: "0 0.14rem 0 0.1rem"}} />
                <Msg />
                <ThemeControl style={{marginLeft: "0.08rem"}} />
            </div>
        </HeaderStyle>
    )
}
