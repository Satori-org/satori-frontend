import styled from "styled-components";
import {colors} from "../../styles/style";

export const ConectWalletStyle = styled.div`
    position: relative;
    min-width: 1.17rem;
    line-height: 0.32rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    color: ${({theme}) => theme.colors.headerButtonColor};
    padding: 0 16px;
    box-sizing: border-box;
    text-align: center;
    cursor:pointer;
    .arrow{
        width: 0.08rem;
        height: 0.0495rem;
        margin-left: 0.12rem;
    }
`;

export const DropMenuContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 100%;
    z-index: 100;
    padding-top: 14px;
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
    .menuItem{
        height: 50px;
        &.exit{
            color: ${({theme}) => theme.colors.short};
        }
        &:hover{
            background: rgba(255, 255, 255, 0.04);
        }
    }
`;
