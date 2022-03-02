import styled from "styled-components";

export const ClosePositionModalStyle = styled.div`
    .btnText{
        background: transparent;
        font-size: 0.12rem;
        color: ${({theme}) => theme.colors.baseColor};
    }
`;

export const ClosePositionModalContentStyle = styled.div`
    padding-top: 0.24rem;
`;

export const Group = styled.div`
    margin-bottom: 0.12rem;
    color: ${({theme}) => theme.colors.filedColor};
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const InputLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.12rem;
    margin-bottom: 0.08rem;
    .explain{
        margin-left: 0.12rem;
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 0.12rem;
    margin-top: 0.24rem;
    .cancel{
        background: ${({theme}) => theme.colors.cancelBgColor};
        font-weight: bold;
        color: ${({theme}) => theme.colors.cancelColor};
    }
`;
