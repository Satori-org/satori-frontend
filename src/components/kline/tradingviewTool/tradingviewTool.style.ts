import styled from "styled-components";
import {colors} from "../../../styles/style";

export const TradingviewToolStyle = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.backgroundColor};
    color: ${colors.baseColor};
    margin-bottom: 1px;
    .toolItem{
        display: inline-block;
        border-right: 1px solid transparent;
        font-size: 12px;
        padding: 0 10px;
        line-height: 20px;
        cursor: pointer;
        &.active{
            color: ${colors.activeColor};
        }
        &:hover{
            color: ${colors.activeColor};
        }
    }
    .reloadIcon{
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .fullscreenIcon{
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .toolRight{
        display: flex;
        align-items: center;
        .toolItem{
            border-left: 1px solid transparent;
        }
    }
`;
