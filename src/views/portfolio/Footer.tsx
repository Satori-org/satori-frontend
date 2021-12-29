import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterStyle } from './styles/Footer.style';

export default function Footer() {
    const {t} = useTranslation();

    return (
        <FooterStyle>
            <ul className={"list"}>
                <li>
                    <span className={"label"}>{t(`Company`)}</span>
                    <ul className={"list-child"}>
                        <li><a href="#">{t(`About Us`)}</a></li>
                        <li><a href="#">{t(`Careers`)}</a></li>
                        <li><a href="#">{t(`Contuct Us`)}</a></li>
                    </ul>
                </li>
                <li>
                    <span className={"label"}>{t(`Know More`)}</span>
                    <ul className={"list-child"}>
                        <li><a href="#">{t(`Perpetual Trade`)}</a></li>
                    </ul>
                </li>
                <li>
                    <span className={"label"}>{t(`Account`)}</span>
                    <ul className={"list-child"}>
                        <li><a href="#">{t(`Portfolio`)}</a></li>
                    </ul>
                </li>
                <li>
                    <span className={"label"}>{t(`Community`)}</span>
                    <ul className={"list-child"}>
                        <li><a href="#">{t(`Portfolio`)}</a></li>
                    </ul>
                </li>
            </ul>
        </FooterStyle>
    )
}
