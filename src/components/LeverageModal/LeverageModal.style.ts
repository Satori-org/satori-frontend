import styled from "styled-components";
import {colors} from "../../styles/style";

export const LeverageModalStyle = styled.div`
    .label{
        color: ${({theme}) => theme.colors.explain};
    }
`;


export const Warn = styled.div`
    padding: 16px;
    background: ${({theme}) => theme.colors.warnBgColor};
    color: ${({theme}) => theme.colors.labelColor};
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    border-radius: 8px;
    margin-bottom: 32px;
    margin-top: 24px;
    line-height: 21px;
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 12px;
    margin-top: 28px;
    .cancel{
        background: #22352C;
        color: #F6F7F0;
    }
`;
