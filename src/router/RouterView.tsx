import React from 'react';
import {ReactRouter} from 'src/react-router-perfect/Index';
import {Iroutes} from "../react-router-perfect/types";

const Home = () => import(/* webpackChunkName: "index" */"src/views/home/Home");
const Exchange = () => import(/* webpackChunkName: "exchange" */"src/views/exchange/Exchange");
const Portfolio = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/Portfolio");
//const DepthChartDemo = () => import(/* webpackChunkName: "DepthChartDemo" */"src/views/DepthChartDemo");
const Status = () => import(/* webpackChunkName: "status" */"src/views/status/Status");

export default function RouterView() {

    const routes: Iroutes[] = [
        {
            path: "/",
            component: Exchange,
            exact: true
        },
        /*{
            path: "/exchange",
            component: Exchange
        },*/
        {
            path: "/portfolio",
            component: Portfolio
        },
        /*{
            path: "/DepthChartDemo",
            component: DepthChartDemo
        },*/
        {
            path: "/doc/status",
            component: Status
        }
    ];

    return (
        <ReactRouter routes={routes} />
    )
}
