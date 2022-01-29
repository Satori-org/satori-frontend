import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentStyle, Title, Group } from './styles/Document.style';

export default function Document() {
    const {t} = useTranslation();

    return (
        <DocumentStyle>
            <Group>
                <Title>{t(`Introduction`)}</Title>
                <ul className={"list"}>
                    <li className={"listItem"}>
                        <h3 className={"title"}>Satori Protocol 平台介绍</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                    <li className={"listItem"}>
                        <h3 className={"title"}>Satori Protocol 平台介绍</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                    <li className={"listItem"}>
                        <h3 className={"title"}>Satori Protocol 平台介绍</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                </ul>
            </Group>
            <Group>
                <Title>{t(`Guide`)}</Title>
                <ul className={"list"}>
                    <li className={"listItem"}>
                        <h3 className={"title"}>Satori Protocol 平台介绍</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                </ul>
            </Group>
            <Group>
                <Title>{t(`Questions`)}</Title>
                <ul className={"list"}>
                    <li className={"listItem"}>
                        <h3 className={"title"}>Satori Protocol 平台介绍</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                </ul>
            </Group>
        </DocumentStyle>
    )
}
