import {Iroutes} from "../react-router-perfect/types";
const Account = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/account/Account");
const Positions = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/positions/Positions");
const Orders = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/orders/Orders");
const History = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/history/History");

export const routes: Iroutes[] = [
    {
        path: "/portfolio/account",
        component: Account
    },
    {
        path: "/portfolio/positions",
        component: Positions
    },
    {
        path: "/portfolio/orders",
        component: Orders
    },
    {
        path: "/portfolio/history",
        component: History
    }
];
