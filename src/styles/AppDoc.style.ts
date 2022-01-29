import styled from "styled-components";
import {colors} from "./style";

export const AppDocStyle = styled.div`
    min-height: 100vh;
    font-weight: 400;
    color: #333333;
    text-align: left;
    box-sizing: border-box;
    background: #F2F2F2;
    a{
        color: #333333;
        text-decoration: none;
    }
    .container{
        display: flex;
        justify-content: flex-end;
    }
`;

export const ContentBox = styled.div`
    width: 1570px;
    min-height: calc(100vh - 72px);
    position: relative;
    display: flex;
`;

export const NavContainer = styled.div`
    min-width: 300px;
    white-space: nowrap;
    .title{
        font-size: 24px;
        font-weight: 500;
        color: #333;
        margin-bottom: 36px;
    }
`;
