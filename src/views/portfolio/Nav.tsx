import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavStyle } from './styles/Nav.style';
import {RouterLink} from "../../react-router-perfect/Index";

export default function Nav() {
    const {t} = useTranslation();

    return (
        <NavStyle>
            <RouterLink className={"item"} activeClassName={"active"} to={"/portfolio/account"}>
                <img src={""} alt=""/>
                <span>{t(`Account`)}</span>
            </RouterLink>
            <RouterLink className={"item"} activeClassName={"active"} to={"/portfolio/positions"}>
                <img src={""} alt=""/>
                <span>{t(`Positions`)}</span>
            </RouterLink>
            <RouterLink className={"item"} activeClassName={"active"} to={"/portfolio/orders"}>
                <img src={""} alt=""/>
                <span>{t(`Orders`)}</span>
            </RouterLink>
            <RouterLink className={"item"} activeClassName={"active"} to={"/portfolio/history"}>
                <img src={""} alt=""/>
                <span>{t(`History`)}</span>
            </RouterLink>
        </NavStyle>
    )
}
