import styled from "styled-components";
import {colors} from "../../../styles/style";

export const PortfolioStyle = styled.div`
    /*display: grid;
    grid-template-columns: 320px 1fr;
    grid-gap: 1px;*/
    min-height: calc(100vh - 72px);
    background: ${({theme}) => theme.colors.backgroundColor};
    padding-top: 1px;
    box-sizing: border-box;
    .left{
        background: ${colors.tradeBgColor};
    }
   
    .container{
        min-width: 1200px;
        width: 11.36rem;
        margin: 0.48rem auto 0;
        padding-bottom: 40px;
    }
    .title{
        font-size: 0.24rem;
        font-weight: 600;
    }
    .content{
        margin-top: 0.32rem;
        padding-top: 0.17rem;
        border-radius: 0.16rem;
        background: ${({theme}) => theme.colors.boxBgColor};
    }
`;

export const Title = styled.h3`
    font-size: 0.24rem;
    font-weight: 600;
    margin-bottom: 0.12rem;
`;
