import styled from "styled-components";
import {colors} from "../../styles/style";

export const DepthChartStyle = styled.div`
    position: relative;
`;

export const ChartContainer = styled.canvas`
    &.point{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

export const ToolTip = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    display: none;
    min-width: 206px;
    background: ${({theme}) => theme.colors.boxBgColor};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 4px;
    font-size: 12px;
    line-height: 24px;
    padding: 5px 16px;
    box-sizing: border-box;
    pointer-events: none;
    transition: left 0.5s, top 0.5s;
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;
