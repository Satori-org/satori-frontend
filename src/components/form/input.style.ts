import styled from "styled-components";
import {colors} from "../../styles/style";

const $height = "calc(0.32rem - 2px)";
export const InputBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.12rem;
    font-size: 0.12rem;
    height: ${$height};
    background: ${({theme}) => theme.colors.inputBgColor};
    border-radius: 0.08rem;
    border: 1px solid transparent;
    .label{
        display: inline-block;
        color: ${({theme}) => theme.colors.labelColor};
        text-align: left;
    }
    .input{
        flex: 1;
        background-color: transparent;
        font-size: 0.12rem;
        height: 100%;
        text-align: left;
        color: ${({theme}) => theme.colors.baseColor};
        padding-right: 0.04rem;
        box-sizing: border-box;
        &::-webkit-input-placeholder {
            color: ${({theme}) => theme.colors.baseColor};
        }
        
        &::-moz-input-placeholder {
            color: ${({theme}) => theme.colors.baseColor};
        }
        
        &::-ms-input-placeholder {
            color: ${({theme}) => theme.colors.baseColor};
        }
    }
    .inputWarn{
        display: inline-block;
        position: absolute;
        background-color: rgba(0,0,0,0.5);
        color: ${colors.baseColor};
        padding: 4px 6px;
        border-radius: 4px;
        bottom: ${$height};
        font-size: 14px;
        font-weight: normal;
        white-space: nowrap;
        pointer-events: none;
        &:after{
            content: "";
            display: inline-block;
            position: absolute;
            left: 10px;
            bottom: -6px;
            border-left: 6px solid transparent;
            border-top: 6px solid rgba(0,0,0,0.5);
            border-right: 6px solid transparent;
        }
    }
`;
