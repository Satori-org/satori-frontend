import React from 'react';
import { HomeStyle } from './style/home.style';
import Header from "src/components/header/Header";
import {useStore} from "react-redux";
import {RouterLink} from "../../react-router-perfect/Index";
import Kline from "src/components/kline/Kline";

export default function Home() {
    const store = useStore();
    const storeData = store.getState();
    return (
        <HomeStyle>
            {/*<Kline symbol={""}   />*/}
            {/*<img src={require("src/assets/images/sk.jpg")} alt=""/>*/}
            <RouterLink to={"/test/xiaoli"}>
                Click Me
            </RouterLink>
        </HomeStyle>
    )
}
