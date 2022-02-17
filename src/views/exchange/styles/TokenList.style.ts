import styled from "styled-components";
import {colors, fonts} from "src/styles/style";

export const TokenListStyle = styled.div`
    position: relative;
    height: auto;
    align-self: stretch;
    padding: 0 0.16rem;
    text-align: center;
    font-size: 0.2rem;
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
    left: 0.16rem;
    bottom: 0;
    z-index: 800;
    transform: translateY(100%);
    width: 3.8rem;
    padding-top: 0.08rem;
    .panelContent{
        padding: 0.16rem 0;
        background: ${({theme}) => theme.colors.boxBgColor};
        box-shadow: 0 0.16rem 0.64rem ${({theme}) => theme.colors.backgroundColor};
        /*border: 1px solid ${({theme}) => theme.colors.modalBorderColor};*/
        box-sizing: border-box;
        border-radius: 0.08rem;
    }
    table{
        width: 100%;
        line-height: 28px;
        text-align: left;
        th{
            font-size: 0.1rem;
            font-weight: 400;
            color: ${({theme}) => theme.colors.labelColor};
            padding-bottom: 0.08rem;
            text-align: center;
            &:first-child{
                padding-left: 0.16rem;
                text-align: left;
            }
            &:last-child{
                padding-right: 0.16rem;
                text-align: right;
            }
        }
        td{
            font-size: 12px;
            text-align: center;
            &:first-child{
                text-align: left;
                padding-left: 0.16rem;
            }
            &:last-child{
                padding-right: 0.16rem;
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
