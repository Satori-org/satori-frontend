import styled from "styled-components";
import {colors} from "../../styles/style";

export const StepNumberStyle = styled.div`
    display: flex;
    padding: 9px 16px;
    width: 100%;
    background: ${({theme}) => theme.colors.boxBgColor};
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    .value{
        display: inline-block;
        padding: 0 8px;
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        flex-shrink: 0;
        width: 60px;
        background: transparent;
        font-size: 16px;
        color: ${({theme}) => theme.colors.filedColor};
    }
    .stepBtn{
        flex-shrink: 0;
        width: 48px;
        height: 30px;
        background: rgba(255,255,255,0.08);
        border-radius: 8px;
        font-size: 24px;
        color: ${colors.activeColor};
    }
`;
