import { colors } from "src/styles/style";
import styled from "styled-components";

export const CancelButton = styled.button`
    min-width: 0.51rem;
    height: 0.24rem;
    background: ${({theme}) => theme.colors.borderColor2};
    font-size: 0.12rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.headerButtonColor};
    border-radius: 0.08rem;
`;

export const RowStyle = styled.tr`
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    .split{
        color: ${({theme}) => theme.colors.inputBtnColor};
    }
`;

export const CloseBtn = styled.button`
    min-width: 0.49rem;
    height: 0.24rem;
    background: ${({theme}) => theme.colors.inputBtnBgColor};
    font-size: 0.12rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.inputBtnColor};
    border-radius: 0.08rem;
`;

export const RecordListStyle = styled.div`
    position: relative;
    min-height: 1.8rem;
`;

export const PointerItem = styled.div`
    display: inline-block;
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.levDefaultBgColor};
    margin-left: 0.02rem;
    cursor:pointer;
    &.lev1{
        background: ${({theme}) => theme.colors.lev1BgColor};
    }
    &.lev2{
        background: ${({theme}) => theme.colors.lev2BgColor};
    }
    &.lev3{
        background: ${({theme}) => theme.colors.lev3BgColor};
    }
    &.lev4{
        background: ${({theme}) => theme.colors.lev4BgColor};
    }
    &.lev5{
        background: ${({theme}) => theme.colors.lev5BgColor};
    }
`;
