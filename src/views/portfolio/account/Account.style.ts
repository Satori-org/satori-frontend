import styled from "styled-components";
import {colors} from "../../../styles/style";

export const AccountStyle = styled.div`
    margin-top: 0.24rem;
    .title{
        font-size: 0.12rem;
        font-weight: bold;
        padding: 0.16rem 0;
        border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};
    }
    .detail{
        border-bottom: 0.04rem solid ${({theme}) => theme.colors.backgroundColor};
        padding-bottom: 0.16rem;
    }
    .userInfo{
        padding: 0 0.24rem;
        .info{
            margin-right: 0.48rem;
            .label{
                font-size: 0.1rem;
                font-weight: 600;
                color: ${({theme}) => theme.colors.labelColor};
                margin-bottom: 8px;
            }
            .long{
                color: ${({theme}) => theme.colors.long};
            }
            .short{
                color: ${({theme}) => theme.colors.short};
            }
            .val{
                font-size: 0.2rem;
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
        margin-top: 0.24rem;
        .chartContainer{
            /*height: 2rem;*/
            /*height: 260px;*/
            /*margin-top: 16px;*/
            /*border-radius: 8px;*/
        }
    }
    .listContainer{
        padding: 0 0.24rem 0.2rem;
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
