import React, {useCallback, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import RouterLink from 'src/react-router-perfect/RouterLink';
import { NavStyle } from './Nav.style';
import {useEffectState} from "src/hooks/useEffectState";
import {useRouteChange} from "src/react-router-perfect/Index";

//const defaultBgImg = require("src/assets/images/nav_bg_1.png");

export default function Nav() {
    const {t} = useTranslation();
    const { pathname } = useRouteChange();
    const state = useEffectState({
        activeIndex: 0,
        bgImg: ""
    });

    const navs:any = useMemo(() => {
        return [];


    }, [t]);
    useEffect(() => {
        /*navs.some((item, index) => {
            if (item.path === pathname) {
                state.activeIndex = index;
                state.bgImg = item.bgImg;
                return true
            } else {
                return false
            }
        })*/
    }, [pathname]);

    const isActive = useCallback((index: number) => {
        return state.activeIndex === index;
    }, [state.activeIndex]);

    const showNav = useMemo(() => {
        const navRoute = ["/", "/blind", "/trade", "/user"];
        return navRoute.includes(pathname)
    }, [pathname]);

    return ( showNav
            ? <NavStyle bgImg={state.bgImg}>
                {

                }
              </NavStyle>
            : null
    )
}
