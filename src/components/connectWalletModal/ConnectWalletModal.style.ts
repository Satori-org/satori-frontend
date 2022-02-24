import styled from "styled-components";

export const ConnectWalletModalStyle = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    height: 100vh;
    z-index: 888;
    background: rgb(13,13,13,0.7);
    .connectWalletContent{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 3.44rem;
        border-radius: 0.08rem;
        background: ${({theme}) => theme.colors.boxBgColor};
        padding: 0.32rem;
        box-sizing: border-box;
        color: ${({theme}) => theme.colors.baseColor};
        border: 1px solid ${({theme}) => theme.colors.modalBorderColor};
    }
`;
export const StepBox = styled.div`
    padding: 0 0.1rem;
    color: ${({theme}) => theme.colors.explain};
    .mark{
        justify-content: center;
        font-size: 0.12rem;
        margin-right: 0.1rem;
    }
    &.active{
        color: ${({theme}) => theme.colors.baseColor};
        justify-content: flex-start;
        .step{
            text-align: center;
            border: 4px solid ${({theme}) => theme.colors.stepBorderColor};
            box-sizing: border-box;
            background: transparent;
            color: ${({theme}) => theme.colors.baseColor};
        }
    }
    .step{
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        border: 0.04rem solid ${({theme}) => theme.colors.explain};
        background: ${({theme}) => theme.colors.modalBorderColor};
        color: ${({theme}) => theme.colors.explain};
        box-sizing: border-box;
    }
    .explain{
        margin-left: 0.42rem;   
    }
`;
export const Title = styled.h3`
    font-size: 0.24rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.modalTitle};
    margin-bottom: 0.2rem;
    padding: 0 0.1rem;
`;

export const Subtitle = styled.div`
    font-size: 0.12rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.subtitle};
    margin-bottom: 0.2rem;
    padding: 0.1rem;
`;

export const Process = styled.div`
    position: absolute;
    width: 0.02rem;
    transform: translateX(-50%);
    //background: ${({theme}) => theme.colors.modalTitle};
    background: #C4C4C4;
`;

export const ConnectButton = styled.button`
    width: 100%;
    height: 0.4rem;
    margin-top: 0.34rem;
    background: ${({theme}) => theme.colors.confirmBgColor};
    border-radius: 0.08rem;
    box-sizing: border-box;
    font-size: 0.12rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.confirmColor};
`;


export const WalletList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(0.16rem - 1px);
`;

export const WalletBox = styled.div`
    display: flex;
    align-items: center;
    min-width: 1.14rem;
    height: 0.4rem;
    padding: 0.08rem;
    border-radius: 0.08rem;
    background: ${({theme}) => theme.colors.walletBtnBgColor};
    color: ${({theme}) => theme.colors.walletBtnColor};
    font-size: 0.12rem;
    font-weight: bold;
    margin-bottom: 0.16rem;
    box-sizing: border-box;
    cursor:pointer;
    &:nth-child(odd){
        margin-right: 0.15rem;
    }
    &:last-child{
        margin-bottom: 0;
    }
    .icon{
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.08rem;
    }
`;
