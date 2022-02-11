import React, {ReactNode, useEffect} from 'react';
import {$router, useRouteChange} from "./Index";
import {useEffectState} from "../hooks/useEffectState";
import {checkMatchModel} from "./tools";

type IProps = {
    children: ReactNode
}
export default function Switch(props: IProps) {
    const { pathname } = useRouteChange();
    const state = useEffectState({
        element: null as any,
    });
    useEffect(() => {
        let match = false;
        document.documentElement.scrollTop = 0;
        React.Children.forEach( props.children ,async (item: any) => {
            let matchPath = item.props.path === pathname || (!item.props.exact && pathname.startsWith(item.props.path));
            /* :xxx Pattern Matching Routing */
            let { isMatchModel } = checkMatchModel(item.props.path, pathname);
            if (!match && (matchPath || isMatchModel)) {
                match = true;
                $router.meta = item.props.meta || {};
                if (item.props.beforeRender) {
                    await item.props.beforeRender();
                }
                state.element = item;
            }
            if (!match && item.props.to) {
                state.element = item;
            }
        })
    }, [pathname]);

    return <>
        {state.element ? React.cloneElement(state.element) : null }
    </>
}
