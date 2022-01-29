import React from 'react';
import { useTranslation } from 'react-i18next';
import {BookContent, LabelBox, ListContainer, Row, RowContainer} from "./styles/Book.style";
import {ITrade} from "src/ajax/contract/contract";

type IProps = {
    data: ITrade[]
}
export default function Transaction(props: IProps) {
    const {t} = useTranslation();

    return (
        <ListContainer>
            <LabelBox>
                <span className={"labelItem"}>{t(`Price(USDT)`)}</span>
                <span className={"labelItem"}>{t(`Amount(BTC)`)}</span>
                <span className={"labelItem"}>{t(`Time`)}</span>
            </LabelBox>
            <BookContent>
                <RowContainer>
                    {
                        props.data.map((item, index) => {
                            return <Row key={index}>
                                <span className={`${item.isLong ? 'long' : 'short'}`}>{item.price}</span>
                                <span>{item.quantity}</span>
                                <span>{item.time}</span>
                            </Row>
                        })
                    }
                </RowContainer>
            </BookContent>
        </ListContainer>
    )
}
