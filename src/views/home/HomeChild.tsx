import React from 'react';
import {useRouteChange} from "src/react-router-perfect/useRouteChange";

export default function HomeChild() {
    const {pathname, routeQuery} = useRouteChange();
    return (
        <div>{routeQuery.id}</div>
    )
}
