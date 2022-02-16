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
    font-size: 0.14rem;
    .riseIcon{
        display: inline-block;
        margin-right: 0.04rem;
        &.long{
            transform: rotate(180deg);
            border-left: 0.032rem solid transparent;
            border-right: 0.032rem solid transparent;
            border-top: 0.032rem solid ${({theme}) => theme.colors.long};
        }
        &.short{
            border-left: 0.032rem solid transparent;
            border-right: 0.032rem solid transparent;
            border-top: 0.032rem solid ${({theme}) => theme.colors.short};
        }
    }
    .dataGroup{
        padding: 0 0.16rem;
        box-sizing: border-box;
        border-left: 1px solid ${({theme}) => theme.colors.borderColor};
        &:not(:last-child){
            margin-right: 24px;
        }
        .label{
            font-size: 0.1rem;
            color: ${({theme}) => theme.colors.labelColor};
            /*padding-bottom: 2px;*/
            margin-bottom: 0.03rem;
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
    color: ${({theme}) => theme.colors.long};
    margin: 0 0.16rem;
    &.long{
        color: ${({theme}) => theme.colors.long};
    }
    &.short{
        color: ${({theme}) => theme.colors.short}
    }
`;
