import styled from "styled-components";
import {colors} from "../../../styles/style";

export const TradingviewToolStyle = styled.div`
    width: 100%;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme}) => theme.colors.baseColor};
    margin-bottom: 1px;
    .toolItem{
        display: inline-block;
        border-right: 1px solid transparent;
        font-size: 16px;
        padding: 0 10px;
        line-height: 20px;
        cursor: pointer;
        color: ${({theme}) => theme.colors.labelColor};
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
        }
        &:hover{
            color: ${({theme}) => theme.colors.activeColor};
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
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 20px;
        .typeItem{
            position: relative;
            height: 100%;
            color: ${({theme}) => theme.colors.labelColor};
            cursor:pointer;
            &.active{
                color: ${({theme}) => theme.colors.activeColor};
                &:after{
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 2px;
                    transform: translateY(50%);
                    background: ${({theme}) => theme.colors.activeColor};
                }
            }
            &:hover{
                color: ${({theme}) => theme.colors.activeColor};
            }
        }
    }
`;
