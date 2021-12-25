import React from 'react';
import {ReactRouter} from 'src/react-router-perfect/Index';
import {Iroutes} from "../react-router-perfect/types";

const Home = () => import(/* webpackChunkName: "index" */"src/views/home/Home");
const Exchange = () => import(/* webpackChunkName: "exchange" */"src/views/exchange/Exchange");

export default function RouterView() {

    const routes: Iroutes[] = [
        {
            path: "/",
            component: Home,
            exact: true
        },
        {
            path: "/exchange",
            component: Exchange
        }
    ];

    return (
        <ReactRouter routes={routes} />
    )
}
