import styled from "styled-components";

export const RecordDatePickerStyle = styled.div`
    font-size: 12px;
`;

export const DateTab = styled.div`
    .tabItem{
        
        margin-right: 12px;
        line-height: 26px;
        text-align: center;
        color: ${({theme}) => theme.colors.labelColor};
        cursor:pointer;
        &.active{
            display: inline-block;
            min-width: 48px;
            padding: 0 5px;
            box-sizing: border-box;
            border-radius: 6px;
            background: ${({theme}) => theme.colors.gapColor};
            color: ${({theme}) => theme.colors.modalTitle};
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
        width: 20px;
        height: 20px;
        margin-left: 12px;
        vertical-align: middle;
    }
`;

export const Search = styled.button`
    min-width: 64px;
    height: 26px;
    border-radius: 6px;
    background: ${({theme}) => theme.colors.gapColor};
    font-size: 12px;
    color: ${({theme}) => theme.colors.modalTitle};
    margin-left: 12px;
`;
