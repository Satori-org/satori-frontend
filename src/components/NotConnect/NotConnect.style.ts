import styled from "styled-components";

export const NotConnectStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.4rem;
    font-size: 0.2rem;
    color: ${({theme}) => theme.colors.labelColor};
    &.center{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin-top: 0.4rem;
    }
    .walletIcon{
        width: 0.44rem;
        height: 0.44rem;
        margin-bottom: 0.2rem;
    }
    .label{
        font-size: 0.2rem;
        color: ${({theme}) => theme.colors.headerButtonColor}
    }
    .connectBtn{
        width: 1.44rem;
        height: 0.4rem;
        border-radius: 0.08rem;
        background: ${({theme}) => theme.colors.confirmBgColor};
        color: ${({theme}) => theme.colors.confirmColor};
        margin-top: 0.2rem;
        font-size: 0.12rem;
        font-weight: bold;
    }
`;
