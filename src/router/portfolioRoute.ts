import {Iroutes} from "../react-router-perfect/types";
const Account = () => import(/* webpackChunkName: "portfolio" */"src/views/portfolio/account/Account");


export const routes: Iroutes[] = [
    {
        path: "/portfolio/account",
        component: Account
    }
];
