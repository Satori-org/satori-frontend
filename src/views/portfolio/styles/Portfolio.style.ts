import styled from "styled-components";
import {colors} from "../../../styles/style";

export const PortfolioStyle = styled.div`
    display: grid;
    grid-template-columns: 320px 1fr;
    grid-gap: 1px;
    min-height: calc(100vh - 72px);
    background: ${colors.pageBgColor};
    padding-top: 1px;
    box-sizing: border-box;
    .left{
        background: ${colors.tradeBgColor};
    }
    .right{
        display: flex;
        flex-direction: column;
        padding: 24px 30px;
        background: ${colors.backgroundColor};
    }
`;

export const Title = styled.h3`
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 18px;
`;
