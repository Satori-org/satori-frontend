import styled from "styled-components";
import {colors} from "../../styles/style";

const $height = "48px";
export const InputBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    height: ${$height};
    background: ${colors.inputBgColor};
    border-radius: 8px;
    .label{
        display: inline-block;
        color: #B2B6BC;
        text-align: left;
    }
    .input{
        flex: 1;
        background-color: transparent;
        font-size: 14px;
        height: 100%;
        text-align: right;
        color: ${colors.baseColor};
        padding: 0 0 0 8px;
        box-sizing: border-box;
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
