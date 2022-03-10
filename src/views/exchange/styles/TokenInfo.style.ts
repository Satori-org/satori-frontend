import styled from "styled-components";
import {fonts} from "src/styles/style";

export const TokenInfoStyle = styled.div`
    position: relative;
    background: ${({theme}) => theme.colors.backgroundColor};
    height: 0.56rem;
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
            border-top: 0.032rem solid ${({theme}) => theme.colors.long2};
            color: ${({theme}) => theme.colors.long2};
        }
        &.short{
            border-left: 0.032rem solid transparent;
            border-right: 0.032rem solid transparent;
            border-top: 0.032rem solid ${({theme}) => theme.colors.short2};
            color: ${({theme}) => theme.colors.short2};
        }
    }
    .dataGroup{
        position: relative;
        min-width: 1.05rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 0.16rem;
        box-sizing: border-box;
        //border-left: 1px solid ${({theme}) => theme.colors.tokenBorderColor};
        line-height: 0.18rem;
        &:before{
            content: "";
            display: inline-block;
            height: 0.32rem;
            width: 1px;
            position: absolute;
            left: 0;
            top: 0;
            background: ${({theme}) => theme.colors.tokenBorderColor};
        }
        &:not(:last-child){
            /*margin-right: 24px;*/
        }
        .label{
            font-size: 0.1rem;
            line-height: 0.12rem;
            /*font-weight: bold;*/
            color: ${({theme}) => theme.colors.labelColor};
            /*padding-bottom: 2px;*/
            margin-bottom: 0.04rem;
            box-sizing: border-box;
            border-bottom: transparent;
            &.border{
                border-bottom: 1px dashed ${({theme}) => theme.colors.labelColor};
            }
        }
        .long{
            color: ${({theme}) => theme.colors.long2};
        }
        .short{
            color: ${({theme}) => theme.colors.short2}
        }
    }
`;

export const Price = styled.div`
    /*color: ${({theme}) => theme.colors.long2};*/
    margin: 0 0.199rem 0 0.16rem;
    &.long{
        color: ${({theme}) => theme.colors.long2};
    }
    &.short{
        color: ${({theme}) => theme.colors.short2}
    }
`;
