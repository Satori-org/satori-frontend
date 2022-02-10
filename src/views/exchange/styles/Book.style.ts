import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

const PADDING = "0 20px";

export const BookStyle = styled.div`
    /*grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;*/
    width: 360px;
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colors.backgroundColor};
    margin: 0 1px;
    flex-shrink: 0;
`;

export const ListContainer = styled.div`
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    /*height: calc(100% - 50px);*/
    overflow-y: auto;
    flex: 1;
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
    height: 50px;
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
    font-size: ${fonts.h5};
    color: ${({theme}) => theme.colors.labelColor};
    margin-bottom: 4px;
    text-align: right;
    .labelItem{
        line-height: 32px;
        flex: 1;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 106px;
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
    line-height: 28px;
    font-size: ${fonts.h5};
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
            min-width: 106px;
        }
    }
`;

export const Spread = styled.div`
    display: flex;
    /*border-bottom: 1px solid #1C1F2C;
    border-top: 1px solid #1C1F2C;*/
    font-size: 18px;
    padding: 10px 20px;
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.boxBgColor};
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
        width: 20px;
        height: 20px;
        /*margin-left: 6px;*/
    }
    .marketPrice{
        font-size: 14px;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
        margin-left: 4px;
    }
`;
