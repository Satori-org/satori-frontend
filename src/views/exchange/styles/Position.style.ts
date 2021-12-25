import styled from "styled-components";
import {colors} from "../../../styles/style";

export const PositionStyle = styled.div`
    .tokenIcon{
        width: 16px;
        height: 16px;
    }
    .name{
        margin: 0 6px;
    }
    .Leverage{
        display: inline-block;
        min-width: 36px;
        line-height: 18px;
        border-radius: 4px;
        border: 1px solid #979797;
        text-align: center;
    }
    .long{
        color: ${colors.long};
    }
    .short{
        color: ${colors.short};
    }
    .closeBtn{
        background: transparent;
        color: ${colors.activeColor};
    }
    .input{
        width: 88px;
        height: 28px;
        border-radius: 8px;
        background: ${colors.inputBgColor};
        margin-left: 8px;
        padding-left: 8px;
        box-sizing: border-box;
        color: ${colors.baseColor};
        &:focus{
            border: 1px solid ${colors.activeColor};
        }
    }
`;


export const PercentStyle = styled.div`
    position: absolute;
    bottom: -2px;
    left: 0;
    z-index: 10;
    transform: translateY(100%);
    width: 186px;
    line-height: 32px;
    background: #202531;
    border-radius: 2px;
    border: 1px solid #2E3643;
    padding: 0 8px;
    box-sizing: border-box;
    .percentItem{
        cursor:pointer;
        &.active{
            color: ${colors.activeColor};
        }
        &:not(:last-child){
            margin-right: 8px;
        }
    }
`;
