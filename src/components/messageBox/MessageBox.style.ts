import styled from "styled-components";
import {colors} from "../../styles/style";

export const MessageBoxStyle = styled.div`
    /*position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);*/
    width: 360px;
    padding: 20px;
    background: ${colors.tradeBgColor};
    border-radius: 8px;
    margin-top: 20px;
    background: #121212;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    &.bottomRight{
        left: initial;
        top: initial;
        transform: none;
    }
    .title{
        font-size: 18px;
        font-weight: 400;
        line-height: 130%;
        color: #fff;
        word-break: break-word;
    }
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
    .content{
        font-size: 14px;
        font-weight: 400;
        color: ${colors.artContentColor};
        line-height: 24px;
        padding-left: 28px;
        margin-top: 10px;
        word-break: break-word;
        max-height: 70vh;
        overflow-y: hidden;
    }
    .label{
        color: ${colors.labelColor};
    }
`;


export const BtnGroup = styled.div`
    grid-column-gap: 14px;
    margin-top: 24px;
    .btn{
        font-weight: 400;
    }
    .cancel{
        background: transparent;
        border: 1px solid ${colors.activeColor};
        color: ${colors.activeColor};
    }
`;
