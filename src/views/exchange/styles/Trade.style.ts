import styled from "styled-components";
import {colors} from "../../../styles/style";

export const TradeStyle = styled.div`
    position: relative;
    background: ${({theme}) => theme.colors.boxBgColor};
    flex-shrink: 0;
    height: 100%;
    overflow-y: hidden;
    padding: 0 0.16rem;
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
    // margin: 20px 0 18px;
    margin-bottom: 12px;
    font-size: 12px;
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
