import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Price, TokenData, TokenInfoStyle} from './styles/TokenInfo.style';
import Setting from "./Setting";
import {useCustomerTokenInfo} from "./useCustomerTokenInfo";
import TokenList from "./TokenList";

export default function TokenInfo() {
    const {t} = useTranslation();
    const {customerTokenInfo} = useCustomerTokenInfo();

    useEffect(() => {
        console.log(customerTokenInfo)
    }, [customerTokenInfo])

    return (
        <TokenInfoStyle className={"flex-row"}>
            <TokenList />
            <TokenData className={"flex-row"}>
                <Price>62,479.15</Price>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`24h Change`)}</p>
                    <p className={"long"}>+585.32(1.07%)</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`Index Price`)}</p>
                    <p>$63590.22</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`Next funding`)}</p>
                    <p>30:02</p>
                </div>
                {
                    customerTokenInfo.filter((item) => item.show).map((item, index) => {
                        return <div className={"dataGroup"} key={index}>
                            <p className={"label"}>{item.text}</p>
                            <p>{item.value}</p>
                        </div>
                    })
                }
                {/*<div className={"dataGroup"}>
                    <p className={"label"}>{t(`24h High`)}</p>
                    <p>$63590.22</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`24h Low`)}</p>
                    <p>$63590.22</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`24h Volume(BTC)`)}</p>
                    <p>128,556</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`24h Volume(USDT)`)}</p>
                    <p>128,556</p>
                </div>*/}
            </TokenData>
            <Setting />
        </TokenInfoStyle>
    )
}
