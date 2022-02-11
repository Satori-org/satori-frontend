import styled from "styled-components";

export const ConnectWalletModalStyle = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    height: 100vh;
    z-index: 888;
    background: rgb(13,13,13,0.7);
    .connectWaaletContent{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 360px;
        border-radius: 8px;
        background: ${({theme}) => theme.colors.modalBgColor};
        padding: 32px;
        box-sizing: border-box;
        color: ${({theme}) => theme.colors.baseColor};
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
`;
export const StepBox = styled.div`
    color: ${({theme}) => theme.colors.explain};
    .mark{
        min-width: 50px;
        justify-content: center;
        font-size: 14px;
        margin-right: 6px;
    }
    &.active{
        color: ${({theme}) => theme.colors.baseColor};
        justify-content: flex-start;
        .step{
            width: 38px;
            height: 38px;
            text-align: center;
            border: 4px solid ${({theme}) => theme.colors.stepBorderColor};
            box-sizing: border-box;
            background: transparent;
            color: ${({theme}) => theme.colors.baseColor};
        }
    }
    .step{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: ${({theme}) => theme.colors.modalTitle};
        color: ${({theme}) => theme.colors.stepColor};
    }
    .explain{
        margin-left: 56px;   
    }
`;
export const Title = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.modalTitle};
`;

export const Subtitle = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.subtitle};
    margin: 6px 0 32px;
`;

export const Process = styled.div`
    position: absolute;
    width: 3px;
    transform: translateX(-50%);
    background: ${({theme}) => theme.colors.modalTitle};
`;

export const ConnectButton = styled.button`
    width: 100%;
    height: 42px;
    margin-top: 32px;
    background: ${({theme}) => theme.colors.baseColor};
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    color: ${({theme}) => theme.colors.modalBgColor};
`;
