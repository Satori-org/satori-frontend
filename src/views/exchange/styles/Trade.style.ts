import styled from "styled-components";
import {colors} from "../../../styles/style";

export const TradeStyle = styled.div`
    padding: 20px 24px;
    background: ${colors.tradeBgColor};
`;

export const LabelButton = styled.button`
    line-height: 32px;
    background: ${colors.auxiBgColor};
    border-radius: 4px;
    color: ${colors.baseColor};
`;

export const FontBtn = styled.span`
    margin: 0 8px;
    color: ${colors.activeColor};
    cursor:pointer;
`;

export const BalanceBox = styled.div`
    margin: 26px 0 8px;
    color: ${colors.labelColor};
`;

export const FeeBox = styled.div`
    margin: 20px 0 18px;
    color: ${colors.labelColor};
`;

export const TotleAmount = styled.div`
    margin-bottom: 56px;
    line-height: 48px;
    background: ${colors.inputBgColor};
    text-align: center;
    border-radius: 8px;
    &.disabled{
        color: ${colors.disabledFontColor};
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 10px;
    .Long{
        background: ${colors.long};
    }
    .Short{
        background: ${colors.short};
    }
`;
