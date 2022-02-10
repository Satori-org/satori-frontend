import styled from "styled-components";
import {colors} from "../../styles/style";

export const WaitingModalStyle = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    padding: 20px;
    background: #121212;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    .title{
        font-size: 18px;
        font-weight: 400;
        color: #fff;
        margin-bottom: 8px;
    }
    .icon{
        width: 22px;
        height: 22px;
        margin-right: 12px;
    }
    .content{
        font-size: 14px;
        font-weight: 400;
        color: #999897;
        line-height: 150%;
        margin-bottom: 12px;
        padding-left: 34px;
    }
    /*.label{
        color: ${colors.labelColor};
    }*/
`;

export const ProgressBar = styled.div`
    position: relative;
    height: 8px;
    background: #525150;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 34px;
    .progress{
        height: 100%;
        background: #fff;
        border-radius: 8px;
        transition: width 0.25s;
    }
`;
