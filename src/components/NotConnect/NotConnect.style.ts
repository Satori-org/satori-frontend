import styled from "styled-components";

export const NotConnectStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    .walletIcon{
        width: 54px;
        height: 54px;
        margin-bottom: 20px;
    }
    .label{
        font-size: 24px;
    }
    .connectBtn{
        width: 148px;
        height: 42px;
        border-radius: 6px;
        background: ${({theme}) => theme.colors.modalTitle};
        margin-top: 24px;
        font-size: 14px;
    }
`;
