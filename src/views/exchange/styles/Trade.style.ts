import styled, {keyframes} from "styled-components";
import {colors} from "../../../styles/style";
import { borderRadius } from "./Exchange.style";

export const TradeStyle = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    background: ${({theme}) => theme.colors.boxBgColor};
    flex-shrink: 0;
    height: 100%;
    overflow-y: hidden;
    padding: 0 0.16rem;
    /*border-top-right-radius: ${borderRadius};*/
    /*border-bottom: 1px solid ${({theme}) => theme.colors.gapColor};*/
`;

export const LabelButton = styled.button`
    width: 100%;
    line-height: 32px;
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    font-size: 14px;
    color: ${({theme}) => theme.colors.baseColor};
`;

export const FontBtn = styled.span`
    margin: 0 8px;
    color:${({theme}) => theme.colors.activeColor};
    cursor:pointer;
`;

export const Direction = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.04rem;
    background: ${({theme}) => theme.colors.inputBgColor};
    .button{
        height: 0.32rem;
        font-weight: bold;
        color: ${({theme}) => theme.colors.tabColor};
        background: transparent;
        border-radius: 0.06rem;
        &.active{
            color: ${({theme}) => theme.colors.tabSelectedColor};
            background: ${({theme}) => theme.colors.tabActiveBgColor2};
            &.sell{
                color: ${({theme}) => theme.colors.short};
            }
        }
    }
`;

export const InputLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.12rem;
    margin-bottom: 0.08rem;
    .explain{
        margin-left: 0.12rem;
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

const loading_rotate = keyframes`
	0%,
    100% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
`;
export const Lever = styled.div`
    position: relative;
    width: 100%;
    height: 0.4rem;
    background: ${({theme}) => theme.colors.inputBgColor};
    color: ${({theme}) => theme.colors.baseColor};
    border-radius: 0.08rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    white-space: nowrap;
    .leverText{
        /*max-width: 0.68rem;*/
        margin-left: 1px;
        flex: 1;
        height: 0.12rem;
        color: ${({theme}) => theme.colors.baseColor};
        background: ${({theme}) => theme.colors.inputBgColor};
        /*&:focus{
            border-left: 1px solid ${({theme}) => theme.colors.baseColor};
            animation: ${loading_rotate} 1s infinite steps(1, start);
        }*/
        
    }
`;

export const LeverageBtn = styled.button`
    min-width: 0.34rem;
    height: 0.24rem;
    border-radius: 0.08rem;
    font-size: 0.12rem;
    font-weight: normal;
    color: ${({theme}) => theme.colors.inputBtnColor};
    background: ${({theme}) => theme.colors.inputBtnBgColor};
    margin-left: 0.04rem;
    &.active{
        color: ${({theme}) => theme.colors.baseColor};
        /*background: ${({theme}) => theme.colors.linkActiveBgColor};*/
    }
`;

export const BalanceBox = styled.div`
    margin: 20px 0 16px;
    color: ${({theme}) => theme.colors.labelColor};
    .label{
        margin-right: 8px;
    }
    .unit{
        margin-left: 4px;
    }
`;

export const FeeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.12rem;
    font-size: 0.12rem;
    color: ${({theme}) => theme.colors.baseColor};
    .label{
        color: ${({theme}) => theme.colors.labelColor};
        margin-right: 4px;
    }
`;

export const TotleAmount = styled.div`
    margin-bottom: 56px;
    line-height: 48px;
    background: ${({theme}) => theme.colors.boxBgColor};
    text-align: center;
    border-radius: 8px;
    &.disabled{
        color: ${colors.disabledFontColor};
    }
`;

export const Submit = styled.button`
    width: 100%;
    height: 0.4rem;
    background: ${({theme}) => theme.colors.confirmBgColor};
    color: ${({theme}) => theme.colors.confirmColor};
    font-weight: bold;
    margin-top: 0.12rem;
    &:disabled{
        background: ${({theme}) => theme.colors.inputBtnBgColor};
        color: ${({theme}) => theme.colors.btnNotAllow};
        cursor: not-allowed;
    }
    /*&.sell{
        background: ${({theme}) => theme.colors.short};
        &:disabled{
            background: ${({theme}) => theme.colors.disabledButtonBgColor};
            color: ${({theme}) => theme.colors.explain};
            cursor: not-allowed;
        }
    }*/
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 10px;
    margin-top: 50px;
    .btn{
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 400;
        color: ${({theme}) => theme.colors.baseColor};
        &.Long{
            background: ${({theme}) => theme.colors.long};
            /*&:active{
                transform: translateY(1px);
                background: ${colors.longOpa7};
            }*/
        }
        &.Short{
            background: ${({theme}) => theme.colors.short};
            /*&:active{
                transform: translateY(1px);
                background: ${colors.shortOpa7};
            }*/
        }
    }
`;
