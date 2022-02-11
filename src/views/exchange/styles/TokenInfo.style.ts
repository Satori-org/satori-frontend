import styled from "styled-components";
import {fonts} from "src/styles/style";

export const TokenInfoStyle = styled.div`
    position: relative;
    background: ${({theme}) => theme.colors.backgroundColor};
    margin-top: 0.22rem;
    margin-bottom: 0.18rem;
`;

export const Hr = styled.hr`
    width: 1px;
    height: 48px;
    background: ${({theme}) => theme.colors.gapColor};
    border: none;
`;

export const TokenData = styled.div`
    height: 100%;
    white-space: nowrap;
    /*overflow: hidden;*/
    overflow-x: auto;
    padding-left: 24px;
    font-size: 14px;
    .dataGroup{
        &:not(:last-child){
            margin-right: 24px;
        }
        .label{
            font-size: 10px;
            color: ${({theme}) => theme.colors.labelColor};
            padding-bottom: 2px;
            margin-bottom: 6px;
            box-sizing: border-box;
            border-bottom: transparent;
            &.border{
                border-bottom: 1px dashed ${({theme}) => theme.colors.labelColor};
            }
        }
        .long{
            color: ${({theme}) => theme.colors.long};
        }
        .short{
            color: ${({theme}) => theme.colors.short}
        }
    }
`;

export const Price = styled.div`
    font-size: ${fonts.h2};
    font-weight: bold;
    color: ${({theme}) => theme.colors.long};
    margin-right: 24px;
    &.long{
        color: ${({theme}) => theme.colors.long};
    }
    &.short{
        color: ${({theme}) => theme.colors.short}
    }
`;
