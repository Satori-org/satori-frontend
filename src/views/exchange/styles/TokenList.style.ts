import styled from "styled-components";
import {colors, fonts} from "src/styles/style";

export const TokenListStyle = styled.div`
    position: relative;
    height: 100%;
    padding: 0 0.16rem;
    text-align: center;
    font-size: ${fonts.h2};
    /*border-right: 1px solid ${({theme}) => theme.colors.borderColor};*/
    .icon{
        display: inline-block;
        width: 0.08rem;
        height: 0.0495rem;
        margin-left: 0.12rem;
        /*margin-top: 4px;
        border-top: 6px solid ${colors.baseColor};
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;*/
        transform: rotate(0deg);
        transition: transform 0.1s;
        &.active{
            transform: rotate(180deg);
        }
    }
`;

export const PanelStyle = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 800;
    transform: translateY(100%);
    width: 460px;
    padding: 16px 0;
    background: #121212;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    table{
        width: 100%;
        line-height: 28px;
        text-align: left;
        th{
            font-size: 12px;
            font-weight: 400;
            color: ${({theme}) => theme.colors.labelColor};
            padding-bottom: 8px;
            text-align: center;
            &:first-child{
                padding-left: 24px;
                text-align: left;
            }
            &:last-child{
                padding-right: 24px;
                text-align: right;
            }
        }
        td{
            font-size: 12px;
            text-align: center;
            &:first-child{
                text-align: left;
                padding-left: 24px;
            }
            &:last-child{
                padding-right: 24px;
                text-align: right;
            }
            .short{
                color: ${({theme}) => theme.colors.short};
            }
            .long{
                color: ${({theme}) => theme.colors.long};
            }
        }
        tbody>tr{
            cursor:pointer;
            &:hover{
                background: rgba(255, 255, 255, 0.04);
            }
        }
    }
`;
