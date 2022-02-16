import styled from "styled-components";
import {colors} from "../../../styles/style";

export const HistoryStyle = styled.div`
    position: relative;
    margin-top: 0.08rem;
    /*padding: 0 0.24rem 0.28rem;*/
    box-sizing: border-box;
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    .listContainer{
        position: relative;
        min-height: 2rem;
        padding: 0.08rem 0.24rem 0.28rem;
        box-sizing: border-box;
        border-top: 0.04rem solid ${({theme}) => theme.colors.backgroundColor};
    }
    /*.table{
        th{
        
        }
        td{
            line-height: 0.28rem;
        }
    }*/
`;

export const RecordHeader = styled.div`
    margin: 0.16rem 0;
    padding: 0 0.24rem;
`;

export const RecordTab = styled.div`
    width: 2.66rem;
    height: 0.32rem;
    /*display: grid;
    grid-template-columns: repeat(3, 1fr);*/
    background: ${({theme}) => theme.colors.boxBgColor};
    /*border-radius: 6px;*/
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
    width: 2.66rem;
    height: 0.32rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    border-radius: 0.06rem;
    background: ${({theme}) => theme.colors.inputBgColor};
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
