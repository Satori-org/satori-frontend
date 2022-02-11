import styled from "styled-components";
import {colors} from "../../../styles/style";

export const NotificationModalStyle = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 500;
    background: rgba(32,37,49,0.6);
    backdrop-filter: blur(0px);
    color: ${colors.baseColor};
    transition: backdrop-filter 0.15s ease-in;
    &.active{
        backdrop-filter: blur(8px);
    }
`;

export const NotificationContent = styled.div`
    position: absolute;
    bottom: -12px;
    right: -30px;
    width: 360px;
    height: 512px;
    transform: translateY(100%);
    background: ${({theme}) => theme.colors.warnBgColor };
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    z-index: 1000;
`;

export const Title = styled.h3`
    padding-left: 24px;
    line-height: 80px;
    border-bottom: 1px solid ${colors.pageBgColor};
`;

export const List = styled.div`
    padding: 32px 20px;
    .item{
        margin-bottom: 20px;
    }
    .itemTitle{
        margin-bottom: 6px;
        color: #F6F7F0;
        .titleIcon{
            width: 22px;
            height: 22px;
            margin-right: 12px;
        }
    }
    .content{
        color: ${colors.artContentColor};
        line-height: 24px;
        margin-bottom: 4px;
        margin-left: 34px;
    }
    .time{
        font-size: 14px;
        color: ${colors.labelColor};
        margin-left: 34px;
    }
`;
