import React from 'react';
import { useTranslation } from 'react-i18next';
import {BookContent, BookStyle, BookTab, LabelBox, Row, RowContainer, Spread} from './styles/Book.style';
import {colors} from "../../styles/style";

export default function Book() {
    const {t} = useTranslation();

    return (
        <BookStyle>
            <BookTab>
                <span className={"tabItem active"}>{t(`OrderBook`)}</span>
                <span className={"tabItem"}>{t(`Transaction`)}</span>
            </BookTab>
            <LabelBox>
                <span className={"labelItem"}>{t(`Price`)}</span>
                <span className={"labelItem"}>{t(`Amount(Cont)`)}</span>
                <span className={"labelItem"}>{t(`Time`)}</span>
            </LabelBox>
            <BookContent>
                <RowContainer className={"reverse"}>
                    {
                        new Array(8).fill("").map((item, index) => {
                            return <Row key={index}>
                                <span className={"short"}>62109.28</span>
                                <span>477.636</span>
                                <span>14:22:35</span>
                            </Row>
                        })
                    }
                </RowContainer>
                <Spread>
                    <span>{t(`Spread`)}</span>
                    <span style={{color: colors.labelColor}}>0.1</span>
                    <span>0.01%</span>
                </Spread>
                <RowContainer>
                    {
                        new Array(8).fill("").map((item, index) => {
                            return <Row key={index}>
                                <span className={"long"}>62109.28</span>
                                <span>477.636</span>
                                <span>14:22:35</span>
                            </Row>
                        })
                    }
                </RowContainer>
            </BookContent>
        </BookStyle>
    )
}
