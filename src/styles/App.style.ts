import styled from "styled-components";
import {colors} from "./style";

export const AppStyle = styled.div`
    min-height: 100vh;
    font-weight: 400;
    color: ${colors.baseColor};
    background: ${colors.backgroundColor};
    text-align: left;
    box-sizing: border-box;
    a{
        color: ${colors.baseColor};
        text-decoration: none;
    }
`;
