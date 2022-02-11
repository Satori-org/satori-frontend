import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderStyle } from './styles/Header.style';
import {RouterLink} from "src/react-router-perfect/Index";
import {Logo} from "src/components/header/Header.style";
import SearchBox from "src/components/search/SearchBox";
import Language from 'src/components/language/Language';

export default function Header() {
    const {t} = useTranslation();

    return (
        <HeaderStyle>
            <div className={"content flex-row"}>
                <div className={"flex-row"}>
                    <a href={"/"}>
                        <Logo src={require("src/assets/images/logo_dark.png")} />
                    </a>
                    <a href="/" className={"link"}>{t(`Go to the official website`)}</a>
                </div>
                <div className={"flex-row"} style={{marginLeft: "420px"}}>
                    <SearchBox placeholder={t(`Search`)} onSearch={(key) => console.log(key) }></SearchBox>
                    <Language style={{marginLeft: "16px"}} />
                </div>
            </div>
        </HeaderStyle>
    )
}
