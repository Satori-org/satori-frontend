import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

export const TokenInfoStyle = styled.div`
    position: relative;
    height: 90px;
    background: ${colors.backgroundColor};
    grid-column-start: 1;
    grid-column-end: 3;
`;


export const TokenData = styled.div`
    padding-left: 32px;
    white-space: nowrap;
    overflow: hidden;
    .dataGroup{
        &:not(:last-child){
            margin-right: 32px;
        }
        .label{
            font-size: ${fonts.h6};
            color: ${colors.labelColor};
            margin-bottom: 3px;
        }
        .long{
            color: ${colors.long};
        }
    }
`;

export const Price = styled.div`
    font-size: ${fonts.h2};
    font-weight: 500;
    color: ${colors.long};
    margin-right: 32px;
`;
