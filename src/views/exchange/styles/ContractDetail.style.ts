import styled from "styled-components";
import {colors} from "../../../styles/style";

export const ContractDetailStyle = styled.div`
    padding: 24px 20px 32px 20px;
    background: ${({theme}) => theme.colors.backgroundColor};
    display: flex;
    flex-direction: column;
    width: 360px;
    margin-left: 1px;
    box-sizing: border-box;
`;


export const Title = styled.div`
    margin-bottom: 16px;
    font-size: 18px;
    color: ${({theme}) => theme.colors.labelColor};
`;

export const FieldLabel = styled.div`
    line-height: 24px;
    color: ${({theme}) => theme.colors.baseColor};
    &:not(:last-child){
        margin-bottom: 8px;
    }
    .label{
        font-size: 14px;
        color: ${({theme}) => theme.colors.labelColor};
        box-sizing: border-box;
        &.border{
            border-bottom: 1px dashed ${({theme}) => theme.colors.linkDefaultColor};
        }
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 14px;
    margin-top: 15px;
    .button{
        height: 42px;
        background: ${({theme}) => theme.colors.activeColor};
        color: ${({theme}) => theme.colors.backgroundColor};
        border-radius: 8px;
        box-sizing: border-box;
        font-size: 14px;
        &.Withdraw{
            background: ${({theme}) => theme.colors.boxBgColor};
            border: none;
            color: ${({theme}) => theme.colors.activeColor};
        }
        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`;
