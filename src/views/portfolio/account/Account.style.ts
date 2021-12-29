import styled from "styled-components";
import {colors} from "../../../styles/style";

export const AccountStyle = styled.div`
    .title{
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        margin: 48px 0 20px;
    }
    .detail{
        display: grid;
        grid-template-columns: 416px 1fr;
        grid-column-gap: 32px;
    }
    .userInfo{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16px;
        .label{
            font-size: 12px;
            color: ${colors.labelColor};
            line-height: 24px;
        }
        .balanceBox{
            grid-column-start: 1;
            grid-column-end: 3;
            background: ${colors.tradeBgColor};
            border-radius: 20px;
            padding: 24px;
            .balance{
                font-size: 24px;
                line-height: 28px;
                margin: 10px 0 8px;
            }
            .rise{
                color: ${colors.long};
                line-height: 24px;
            }
        }
        .group{
            padding: 8px 24px 12px;
            border-radius: 20px;
            border: 1px solid ${colors.tradeBgColor};
            .balance{
                font-size: 16px;
                line-height: 28px;
                margin: 2px 0 6px;
            }
            .rise{
                color: ${colors.long};
            }
        }
    }
    .Trend{
        display: flex;
        flex-direction: column;
        .chartContainer{
            margin-top: 16px;
            flex: 1;
            border-radius: 8px;
            border: 1px solid ${colors.tradeBgColor};
        }
    }
`;
