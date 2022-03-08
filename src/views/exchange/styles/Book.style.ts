import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

const PADDING = "0";

export const BookStyle = styled.div`
    /*grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;*/
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colors.boxBgColor};
    /*margin: 0 1px;*/
    flex-shrink: 0;
    height: 100%;
    overflow-y: hidden;
    padding: 0 0.16rem;
`;

export const ListContainer = styled.div`
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    /*height: calc(100% - 50px);*/
    height: calc(100% - 0.4rem);
    overflow-y: hidden;
    padding-top: 0.1rem;
    &::-webkit-scrollbar-thumb{
      border-radius: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
`;

export const BookTab = styled.div`
    display: flex;
    align-items: center;
    height: 0.4rem;
    flex-shrink: 0;
    text-align: center;
    padding-left: 20px;
    border-bottom: 1px solid ${({theme}) => theme.colors.gapColor};
    .tabItem{
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        cursor:pointer;
        color: ${({theme}) => theme.colors.labelColor};
        &.active{
            font-weight: 400;
            color: ${({theme}) => theme.colors.activeColor};
            &:after{
                content: "";
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.labelColor};
                transform: translateY(50%);
            }
        }
        &:not(:last-child){
            margin-right: 24px;
        }
    }
`;

export const LabelBox = styled.div`
    display: flex;
    padding: ${PADDING};
    box-sizing: border-box;
    font-weight: 600;
    color: ${({theme}) => theme.colors.thColor};
    text-align: right;
    .labelItem{
        line-height: 0.22rem;
        flex: 1;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 1.07rem;
        }
    }
`;

export const BookContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 36px);
`;

export const RowContainer = styled.div`
    padding: ${PADDING};
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.reverse{
        justify-content: flex-end;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
`;

export const Row = styled.div`
    display: flex;
    line-height: 0.18rem;
    font-size: 0.12rem;
    &:not(:last-child){
        margin-bottom: 0.06rem;
    }
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    span{
        flex: 1;
        text-align: right;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 1.07rem;
        }
    }
`;

export const Spread = styled.div`
    /*border-bottom: 1px solid #1C1F2C;
    border-top: 1px solid #1C1F2C;*/
    font-size: 0.14rem;
    padding: 0.08rem 0;
    box-sizing: border-box;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor2};
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
    margin: 0.08rem 0;
    span{
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 106px;
        }
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .arrow{
        width: 0.06rem;
        height: 0.08rem;
        margin-left: 0.07rem;
        vertical-align: baseline;
        /*margin-left: 6px;*/
    }
    .marketPrice{
        font-size: 0.12rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
        margin-left: 0.11rem;
    }
`;
