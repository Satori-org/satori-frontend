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
    top: 0;
    right: 0;
    width: 386px;
    height: 100%;
    background: ${colors.tradeBgColor};
`;

export const Title = styled.h3`
    padding-left: 24px;
    line-height: 80px;
    border-bottom: 1px solid ${colors.pageBgColor};
`;

export const List = styled.div`
    padding: 15px 24px;
    .item{
        margin-bottom: 16px;
    }
    .itemTitle{
        margin-bottom: 14px;
        .titleIcon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
    }
    .content{
        color: ${colors.artContentColor};
        line-height: 24px;
    }
    .time{
        font-size: 12px;
        color: ${colors.labelColor};
    }
`;
