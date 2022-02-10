import React, {useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import { NavStyle } from './styles/Nav.style';
import {RouterLink, useRouteChange} from "../../react-router-perfect/Index";

export default function Nav() {
    const {t} = useTranslation();
    const {pathname}  = useRouteChange();

    const navLinks = useMemo(() => {
        return [
            {
                to: "/portfolio/account",
                text: t(`Account`),
                icon: require("src/assets/images/portfolio/account.png"),
                activeIcon: require("src/assets/images/portfolio/account_active.png"),
                iconStyle: { width: "19px", height: "22px" }
            },
            {
                to: "/portfolio/positions",
                text: t(`Positions`),
                icon: require("src/assets/images/portfolio/position.png"),
                activeIcon: require("src/assets/images/portfolio/position_active.png"),
                iconStyle: { width: "22px", height: "22px" }
            },
            {
                to: "/portfolio/orders",
                text: t(`Orders`),
                icon: require("src/assets/images/portfolio/order.png"),
                activeIcon: require("src/assets/images/portfolio/order_active.png"),
                iconStyle: { width: "19px", height: "22px" }
            },
            {
                to: "/portfolio/history",
                text: t(`History`),
                icon: require("src/assets/images/portfolio/history.png"),
                activeIcon: require("src/assets/images/portfolio/history_active.png"),
                iconStyle: { width: "22px", height: "21px" }
            }
        ];
    }, [t]);

    return (
        <NavStyle>
            {
                navLinks.map((item, indx) => {
                    return <RouterLink className={"item flex-row"} activeClassName={"active"} to={item.to} key={indx}>
                        {/*<span className={"iconWrap"}>
                            <img src={pathname === item.to ? item.activeIcon : item.icon} style={item.iconStyle} className={"icon"} alt=""/>
                        </span>*/}
                        <span>{item.text}</span>
                    </RouterLink>
                })
            }
        </NavStyle>
    )
}
