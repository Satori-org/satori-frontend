import styled from "styled-components";
import {colors} from "../../styles/style";

export const LineChartStyle = styled.div`
    position: relative;
`;

export const ChartTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`;

export const ChartContainer = styled.canvas`
    
`;

export const ActiveLabel = styled.span`
    position: absolute;
    top: 0;
    min-width: 80px;
    line-height: 28px;
    padding: 0 8px;
    box-sizing: border-box;
    background: ${colors.activeColor};
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.buttonTextColor};
    text-align: center;
    transform: translateX(-50%);
    pointer-events: none;
`;
