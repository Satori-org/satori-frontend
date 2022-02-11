import styled from "styled-components";
import {colors} from "../../../styles/style";

export const HistoryStyle = styled.div`
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    .table{
        td{
            line-height: 54px;
        }
    }
`;

export const RecordHeader = styled.div`
    margin-bottom: 34px;
`;

export const RecordTab = styled.div`
    width: 294px;
    height: 48px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    overflow: hidden;
    .tabItem{
        height: 100%;
        text-align: center;
        border-radius: 6px;
        cursor:pointer;
        user-select: none;
        color: ${({theme}) => theme.colors.labelColor};
        &.active{
            background: ${({theme}) => theme.colors.filedColor};
            color: ${({theme}) => theme.colors.tabActiveColor};
        }
    }
`;

export const DropDown = styled.div`
    position: relative;
    width: 228px;
    height: 48px;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 6px;
    background: ${({theme}) => theme.colors.boxBgColor};
    margin-left: 28px;
    cursor:pointer;
    .icon{
        width: 8px;
        margin-left: 12px;
    }
`;

export const DropMenuContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 100%;
    z-index: 100;
    padding-top: 1px;
`;

export const DropMenu = styled.ul`
    list-style: none;
    font-size: 14px;
    text-align: center;
    color: ${({theme}) => theme.colors.labelColor};
    background: #121212;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    .label{
        height: 50px;
        padding-left: 24px;
        color: ${({theme}) => theme.colors.labelColor};
    }
    .menuItem{
        height: 50px;
        padding-left: 24px;
        cursor:pointer;
        color: ${({theme}) => theme.colors.modalTitle};
        &:hover{
            background: rgba(255, 255, 255, 0.04);
        }
    }
`;

export const DateContainer = styled.div`
    width: 228px;
    height: 48px;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 6px;
    background: ${({theme}) => theme.colors.boxBgColor};
    margin-left: 28px;
    .calendar{
        width: 20px;
        height: 20px;
        margin-left: 12px;
        vertical-align: middle;
    }
`;

export const Tag = styled.span`
    display: inline-block;
    min-width: 50px;
    padding: 0 6px;
    line-height: 24px;
    text-align: center;
    box-sizing: border-box;
    background: ${colors.longOpa};
    color: ${({theme}) => theme.colors.long};
    font-size: 12px;
    background: rgba(57, 172, 89, 0.1);
    border-radius: 2px;
    &.short{
        background: rgba(219, 87, 75, 0.1);
        color: ${({theme}) => theme.colors.short};
    }
`;

export const ThButton = styled.button`
    border: none;
    background: transparent;
    color: ${({theme}) => theme.colors.short};
    border-bottom: 1px dashed ${({theme}) => theme.colors.short};
    font-size: 14px;
`;
