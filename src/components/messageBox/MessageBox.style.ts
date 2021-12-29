import styled from "styled-components";
import {colors} from "../../styles/style";

export const MessageBoxStyle = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 386px;
    padding: 32px 22px;
    background: ${colors.tradeBgColor};
    border-radius: 24px;
    .title{
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        color: ${colors.baseColor};
        margin-bottom: 10px;
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
