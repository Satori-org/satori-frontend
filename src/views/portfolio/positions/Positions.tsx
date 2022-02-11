import React from 'react';
import { useTranslation } from 'react-i18next';
import Position from '../Position';
import {PositionsStyle} from './Positions.style';
import {Title} from "../styles/Portfolio.style";

export default function Positions() {
    const {t} = useTranslation();

    return (
        <PositionsStyle>
            {/*<Title>{t(`All Position`)}</Title>*/}
            <Position />
        </PositionsStyle>
    )
}
