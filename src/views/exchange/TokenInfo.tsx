import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Price, TokenData, TokenInfoStyle} from './styles/TokenInfo.style';
import Setting from "./Setting";
import {ICustomerToken} from "./useCustomerTokenInfo";
import TokenList from "./TokenList";

export default function TokenInfo() {
    const {t} = useTranslation();
    const [customerToken, setCustomerToken] = useState<ICustomerToken[]>([]);

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
                    <p className={"label"}>{t(`Oracle Price`)}</p>
                    <p>30:02</p>
                </div>
                <div className={"dataGroup"}>
                    <p className={"label"}>{t(`Next funding`)}</p>
                    <p>0.0100% 30:22</p>
                </div>
                {
                    customerToken.filter((item) => item.show).map((item, index) => {
                        return <div className={"dataGroup"} key={index}>
                            <p className={"label"}>{item.text}</p>
                            <p>{item.value}</p>
                        </div>
                    })
                }
            </TokenData>
            <Setting onChange={(customerTokens) => setCustomerToken(customerTokens)} />
        </TokenInfoStyle>
    )
}
