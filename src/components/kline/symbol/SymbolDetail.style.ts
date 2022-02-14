import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

export const SymbolDetailStyle = styled.div`
    position: absolute;
    width: 100%;
	height: calc(100% - 58px);
	bottom: 1px;
    background: ${({theme}) => theme.colors.boxBgColor};
`;

export const Title = styled.div`
    font-size: 0.12rem;
    font-weight: 600;
    .icon{
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.06rem;
    }
`;

export const Content = styled.article`
    margin: 18px 0 12px 0;
    font-size: 0.1rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.baseColor};
`;

export const Explain = styled.article`
    font-size: 0.1rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.labelColor};
`;

export const ButtonGroup = styled.div`
    margin-top: 20px;
    .btnItem{
        background: ${({theme}) => theme.colors.activeColor};
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.28rem;
        color: ${({theme}) => theme.colors.confirmColor};
        padding: 0 0.12rem;
        border-radius: 0.08rem;
        &.light{
            background: ${({theme}) => theme.colors.borderColor2};
            color: ${({theme}) => theme.colors.headerButtonColor};
        }
        &:not(:last-child){
            margin-right: 0.32rem;
        }
    }
    .icon{
        width: 0.12rem;
        height: 0.12rem;
        margin-left: 0.04rem;
    }
`;
