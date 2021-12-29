import styled from "styled-components";
import {colors} from "../../styles/style";

export const WaitingModalStyle = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 386px;
    padding: 66px 24px 40px 24px;
    background: ${colors.tradeBgColor};
    border-radius: 24px;
    .title{
        font-size: 18px;
        font-weight: bold;
        color: ${colors.baseColor};
        margin-bottom: 34px;
    }
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
    .content{
        font-size: 14px;
        font-weight: 400;
        color: ${colors.artContentColor};
        line-height: 24px;
        margin-bottom: 30px;
    }
    .label{
        color: ${colors.labelColor};
    }
`;

export const ProgressBar = styled.div`
    position: relative;
    height: 8px;
    background: ${colors.inputBgColor};
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
    .progress{
        height: 100%;
        background: ${colors.activeColor};
        border-radius: 12px;
    }
`;
