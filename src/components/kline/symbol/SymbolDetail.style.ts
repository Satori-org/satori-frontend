import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

export const SymbolDetailStyle = styled.div`
    position: absolute;
    width: 100%;
	height: calc(100% - 58px);
	bottom: 1px;
    background: ${({theme}) => theme.colors.backgroundColor};
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    .icon{
        width: 26px;
        height: 26px;
        margin-right: 6px;
    }
`;

export const Content = styled.article`
    margin: 18px 0 12px 0;
    font-size: ${fonts.h6};
    font-weight: 400;
    color: ${colors.baseColor};
`;

export const Explain = styled.article`
    font-size: ${fonts.h6};
    font-weight: 400;
    color: ${colors.labelColor};
`;

export const ButtonGroup = styled.div`
    margin-top: 20px;
    .btnItem{
        background: ${colors.activeColor};
        font-size: 14px;
        font-weight: 400;
        line-height: 38px;
        color: ${colors.buttonTextColor};
        padding: 0 18px;
        border-radius: 8px;
        &:not(:last-child){
            margin-right: 44px;
        }
    }
    .icon{
        width: 14px;
        height: 14px;
        margin-left: 4px;
    }
`;
