import styled from "styled-components";

export const TradingviewToolStyle = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-bottom: 4px;
    background-color: #1c1c1c;
    color: #8193B8;
    .toolItem{
        display: inline-block;
        border-right: 1px solid transparent;
        font-size: 12px;
        padding: 0 10px;
        line-height: 20px;
        cursor: pointer;
        &.active{
            color: blue;
        }
        &:hover{
            color: blue;
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
