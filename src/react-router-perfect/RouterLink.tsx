import React, {useCallback, ReactNode, useMemo, useEffect} from 'react';
import { NavLinkProps, LinkProps } from 'react-router-dom';
import {$router} from "./Index";
import {useRouteChange} from "./useRouteChange";
import styled from "styled-components";
import {Anchor, colors, fonts} from "../styles/style";

interface ItoAsObject {
    pathname: string,
    search?: string,
    hash?: string,
    state?: any
}
interface ILazyLink extends NavLinkProps {
    to:string|ItoAsObject
    children?:ReactNode,
    callback?():void
    className?: string
    beforeOnClick?(): Promise<any>
    activeCallback?(active: boolean): void
}

export default function RouterLink(props:ILazyLink) {
    const { pathname } = useRouteChange();
    const anchorPath = typeof props.to === "string"? props.to:props.to.pathname;
    //const pathname = typeof props.to === "string"? props.to:props.to.pathname;
    async function handNav(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        let routePath = event.currentTarget.getAttribute("href") || "";
        let params = typeof props.to === "string"? {}:props.to.state;
        /*pushState(routePath).then(() => {
            history.push(props.to);
            props.callback && props.callback();
        });*/
        props.beforeOnClick ? await props.beforeOnClick() : await Promise.resolve();
        $router.push({pathname: routePath, params: params});
        props.callback && props.callback();
    }

    const activeClassName = useMemo(() => {
        if (!props.activeClassName) {
            return '';
        }
        let execArr = /\/([^\?]*)/g.exec(anchorPath) || [];
        let targetPath = execArr[0];
        if (props.exact && pathname === targetPath) {
            return props.activeClassName;
        } else if (!props.exact && pathname.indexOf(targetPath) === 0) {
            return props.activeClassName;
        }
        return '';
    }, [pathname, anchorPath, props.activeClassName, props.exact]);

    useEffect(() => {
        props.activeCallback && props.activeCallback(!!activeClassName);
    }, [activeClassName]);


    /*useEffect(() => {
        return () => {
            //timer && clearInterval(timer);
            NProgress.done();
        };
    }, []);*/

    return (
        <Anchor href={anchorPath}
           style={Object.assign({}, {textDecoration: "none"}, props.style) }
           className={`${props.className || ""} ${activeClassName}`}
           onClick={handNav}>{props.children}</Anchor>
    )
}

