import styled from "styled-components";

export const RecordDatePickerStyle = styled.div`
    font-size: 0.12rem;
`;

export const DateTab = styled.div`
    .tabItem{
        margin-right: 0.12rem;
        line-height: 0.26rem;
        text-align: center;
        font-size: 0.12rem;
        color: ${({theme}) => theme.colors.labelColor};
        cursor:pointer;
        &.active{
            display: inline-block;
            min-width: 0.48rem;
            padding: 0 0.06rem;
            box-sizing: border-box;
            border-radius: 0.06rem;
            background: ${({theme}) => theme.colors.confirmBgColor};
            color: ${({theme}) => theme.colors.confirmColor};
        }
    }
`;


export const DateContainer = styled.div`
    .dateField{
        color: ${({theme}) => theme.colors.labelColor};
        &.active{
            color: ${({theme}) => theme.colors.baseColor};
        }
    }
    .calendar{
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.12rem;
        vertical-align: middle;
    }
`;

export const Search = styled.button`
    min-width: 0.64rem;
    height: 0.26rem;
    border-radius: 0.06rem;
    font-size: 0.12rem;
    background: ${({theme}) => theme.colors.confirmBgColor};
    color: ${({theme}) => theme.colors.confirmColor};
    margin-left: 0.12rem;
`;
