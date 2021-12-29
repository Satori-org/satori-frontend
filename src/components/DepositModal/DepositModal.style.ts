import styled from "styled-components";
import {colors} from "../../styles/style";

export const DepositModalStyle = styled.div`
    
`;

export const AssetBox = styled.div`
    height: 48px;
    padding: 0 16px 0 12px;
    box-sizing: border-box;
    background: ${colors.inputBgColor};
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 14px;
    .label{
        color: ${colors.artContentColor};
    }
    .icon{
        width: 26px;
        height: 26px;
        margin-right: 7px;
    }
`;

export const RightBtn = styled.span`
    font-size: 14px;
    font-weight: 400;
    margin: 0 8px;
    color: ${colors.activeColor};
    cursor:pointer;
`;

export const BalanceBox = styled.div`
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 30px;
    .label{
        color: ${colors.labelColor};
    }
`;

export const Warn = styled.div`
    padding: 18px;
    background: ${colors.fail};
    border-radius: 8px;
    margin-bottom: 48px;
    line-height: 22px;
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }
`;

export const StickyBox = styled.div`
   height: 46px;
   margin-top: 10px;
   margin-bottom: -14px;
   padding: 0 16px 14px;
   background: ${colors.inputBgColor};
   border-top-left-radius: 24px;
   border-top-right-radius: 24px;color: ${colors.artContentColor};
   .label{
     color: ${colors.labelColor};
   }
`;
