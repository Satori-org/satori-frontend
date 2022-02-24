import styled from "styled-components";
import {colors} from "../../styles/style";

export const WaitingModalStyle = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3.54rem;
    padding: 0.18rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    color: ${({theme}) => theme.colors.baseColor};
    box-shadow: ${({theme}) => theme.colors.boxShadow};
    /*border: 1px solid ${({theme}) => theme.colors.modalBorderColor};*/
    box-sizing: border-box;
    border-radius: 0.08rem;
    .title{
        font-size: 0.16rem;
        font-weight: 600;
        color: ${({theme}) => theme.colors.baseColor};
        margin-bottom: 0.04rem;
    }
    .icon{
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.14rem;
    }
    .content{
        font-size: 0.14rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.headerButtonColor};
        line-height: 150%;
        margin-bottom: 0.12rem;
        padding-left: 0.34rem;
    }
    /*.label{
        color: ${colors.labelColor};
    }*/
`;

export const ProgressBar = styled.div`
    position: relative;
    height: 0.08rem;
    background: ${({theme}) => theme.colors.backgroundColor};
    border-radius: 0.08rem;
    overflow: hidden;
    margin-top: 0.12rem;
    margin-left: 0.34rem;
    .progress{
        height: 100%;
        background: ${({theme}) => theme.colors.baseColor};
        border-radius: 0.08rem;
        transition: width 0.25s;
    }
`;
