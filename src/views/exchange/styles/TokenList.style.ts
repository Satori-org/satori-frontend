import styled from "styled-components";
import {colors, fonts} from "src/styles/style";

export const TokenListStyle = styled.div`
    position: relative;
    height: 100%;
    padding: 0 24px;
    text-align: center;
    font-size: ${fonts.h2};
    border-right: 1px solid ${colors.pageBgColor};
    .icon{
        display: inline-block;
        margin-left: 12px;
        margin-top: 4px;
        border-top: 6px solid ${colors.baseColor};
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        transform: rotate(0deg);
        transition: transform 0.1s;
        &.active{
            transform: rotate(180deg);
        }
    }
`;

export const PanelStyle = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 350px;
    padding: 14px 16px 20px;
    box-sizing: border-box;
    border-radius: 2px;
    background: ${colors.tradeBgColor};
    table{
        width: 100%;
        line-height: 28px;
        text-align: left;
        th{
            font-size: 12px;
            font-weight: 400;
            color: ${colors.labelColor};
            padding-bottom: 8px;
        }
        td{
            font-size: 12px;
            .short{
                color: ${colors.short};
            }
            .long{
                color: ${colors.long};
            }
        }
    }
`;
