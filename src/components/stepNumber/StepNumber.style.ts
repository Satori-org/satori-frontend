import styled from "styled-components";
import {colors} from "../../styles/style";

export const StepNumberStyle = styled.div`
    display: flex;
    padding: 3px;
    background: ${colors.inputBgColor};
    text-align: center;
    .value{
        display: inline-block;
        padding: 0 8px;
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        background: transparent;
        color: ${colors.baseColor};
    }
    .stepBtn{
        width: 48px;
        height: 36px;
        background: ${colors.auxiBgColor};
        border-radius: 4px;
        font-size: 24px;
        color: ${colors.activeColor};
    }
`;
