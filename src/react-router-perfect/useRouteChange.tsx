import {useEffect, useRef, useState} from "react";
import {$router} from "./Index";
import {deepCompare} from "./tools";

const location = window.location;

export function useRouteChange(hashModel?: boolean) {
    const [pathname, setPathname] = useState(initPathname());
    const [routeData, setRouteData] = useState<any>($router.params);
    const [routeQuery, setRouteQuery] = useState<any>($router.query);
    const pathRef = useRef(pathname);
    /*const state: any = useEffectState({
        pathname: initPathname(),
        routeData: $router.params,
        routeQuery: $router.query
    });*/

    useEffect(() => {
        if (hashModel) {
            addHashListener();
        } else {
            addHistoryListener();
        }

        return () => {
            window.removeEventListener("popstate", callback);
            window.removeEventListener("pushState", callback);
            window.removeEventListener("hashchange", callback);
        }
    }, [hashModel]);

    useEffect(() => {
        pathRef.current = pathname;
    }, [pathname]);

    function initPathname() {
        if (hashModel) {
            return getHashPath(location.hash);
        } else {
            return location.pathname;
        }
    }

    function addHistoryListener() {
        window.addEventListener("popstate", callback);
        window.addEventListener("pushState", callback);
    }

    function addHashListener() {
        window.addEventListener("hashchange", callback);
    }

    function callback() {
        let path = hashModel ? getHashPath(location.hash) : location.pathname;
        if (pathRef.current !== path) {
            setPathname(path)
        }
        effectRouteData();
    }

    function effectRouteData() {
        let { query, params } = $router.getRouteData();
        if (!deepCompare(params, routeData)) {
            setRouteData(params)
        }
        if (!deepCompare(query, routeQuery)) {
            setRouteQuery(query)
        }
    }

    function getHashPath(hash: string) {
        return hash.replace(/(#)(\/.+)([\?\/]).+/g, function(a,b,c){return c})
    }

    return {pathname, routeData, routeQuery};
}
