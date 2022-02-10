import styled from "styled-components";
import {colors} from "../../../styles/style";

export const AccountStyle = styled.div`
    .title{
        font-size: 36px;
        font-weight: bold;
        margin: 120px 0 34px;
    }
    .detail{
        
    }
    .userInfo{
        margin-bottom: 54px;
        .info{
            margin-right: 36px;
            color: ${({theme}) => theme.colors.filedColor};
            .label{
                margin-bottom: 8px;
            }
            .long{
                color: ${({theme}) => theme.colors.long};
            }
            .short{
                color: ${({theme}) => theme.colors.short};
            }
            .val{
                font-size: 36px;
            }
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
        .chartContainer{
            height: 260px;
            /*margin-top: 16px;*/
            border-radius: 8px;
        }
    }
`;

export const ChartTab = styled.div`
    display: flex;
    align-items: center;
    /*border-bottom: 1px solid ${({theme}) => theme.colors.boxBgColor};*/
    .tabItem{
        position: relative;
        margin-right: 28px;
        line-height: 36px;
        color: ${({theme}) => theme.colors.labelColor};
        padding-bottom: 8px;
        cursor:pointer;
        &.active{
            color: ${({theme}) => theme.colors.filedColor};
            /*&:after{
                content: "";
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.filedColor};
            }*/
        }
    }
`;
