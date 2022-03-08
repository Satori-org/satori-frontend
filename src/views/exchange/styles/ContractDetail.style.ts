import styled from "styled-components";
import {colors} from "../../../styles/style";

export const ContractDetailStyle = styled.div`
    position: relative;
    padding: 0 0.16rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const ContractDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 0.16rem;
    box-sizing: border-box;
`;

export const ConnectModal = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({theme}) => theme.colors.inputBtnBgColor};
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.24rem;
    padding: 0 0.36rem;
    .button{
        width: 1.34rem;
        height: 0.4rem;
        border-radius: 0.08rem;
        font-size: 0.12rem;
        font-weight: bold;
        background: ${({theme}) => theme.colors.cancelBgColor};
        color: ${({theme}) => theme.colors.cancelColor};
        margin-top: 0.24rem;
    }
`;

export const Title = styled.div`
    margin-bottom: 0.16rem;
    font-weight: bold;
    line-height: 0.4rem;
    color: ${({theme}) => theme.colors.baseColor};
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
`;

export const FieldLabel = styled.div`
    font-size: 0.12rem;
    line-height: 0.28rem;
    color: ${({theme}) => theme.colors.baseColor};
    &:not(:last-child){
        /*margin-bottom: 8px;*/
    }
    .label{
        font-size: 0.12rem;
        color: ${({theme}) => theme.colors.borderColor};
        box-sizing: border-box;
        &.border{
            /*border-bottom: 1px dashed ${({theme}) => theme.colors.linkDefaultColor};*/
        }
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 0.12rem;
    margin-top: 0.16rem;
    .button{
        height: 0.4rem;
        background: ${({theme}) => theme.colors.confirmBgColor};
        color: ${({theme}) => theme.colors.confirmColor};
        border-radius: 0.08rem;
        box-sizing: border-box;
        font-size: 0.12rem;
        font-weight: bold;
        &.deposit{
            background: ${({theme}) => theme.colors.cancelBgColor};
            border: none;
            color: ${({theme}) => theme.colors.cancelColor};
        }
        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`;
