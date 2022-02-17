import styled from "styled-components";
import {colors} from "../../../styles/style";

export const TradingviewToolStyle = styled.div`
    /*width: 100%;*/
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme}) => theme.colors.baseColor};
    margin: 0 0.16rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
    
    .toolItem{
        display: inline-block;
        border-right: 1px solid transparent;
        padding: 0 10px;
        cursor: pointer;
        color: ${({theme}) => theme.colors.labelColor};
        font-size: 0.1rem;
        font-weight: 600;
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
        .typeItem{
            position: relative;
            height: 100%;
            font-size: 0.12rem;
            font-weight: bold;
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


export const FullImageIcon = styled.img`
    width: 0.093rem;
    height: 0.093rem;
    vertical-align: baseline;
    cursor:pointer;
    margin-right: 0.01rem;
`;
