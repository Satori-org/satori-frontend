import styled from "styled-components";
import {colors} from "../../styles/style";

export const MarginModalStyle  = styled.div`
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const Tab = styled.div`
    height: 42px;
    border: 1px solid ${({theme}) => theme.colors.boxBgColor};
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    .item{
        border-radius: 6px;
        cursor:pointer;
        &.active{
            background: ${({theme}) => theme.colors.boxBgColor};
        }
    }
`;

export const RightBtn = styled.button`
    min-width: 0.36rem;
    height: 0.24rem;
    padding: 0 0.06rem;
    box-sizing: border-box;
    color: ${({theme}) => theme.colors.inputBtnColor};
    background: ${({theme}) => theme.colors.inputBtnBgColor};
    border-radius: 0.08rem;
    margin-left:  0.08rem;
    font-weight: normal;
`;

export const Group = styled.div`
    margin-bottom: 0.12rem;
    .label{
        color: ${({theme}) => theme.colors.borderColor};
        margin-right: 0.1rem;
    }
`;
