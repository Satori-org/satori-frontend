import styled from "styled-components";

export const ClosePositionModalStyle = styled.div`
    .btnText{
        background: transparent;
        font-size: 16px;
        color: ${({theme}) => theme.colors.baseColor};
    }
`;

export const ClosePositionModalContentStyle = styled.div`
    padding: 28px 32px 32px 32px;
`;

export const Group = styled.div`
    margin-bottom: 16px;
    color: ${({theme}) => theme.colors.filedColor};
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 12px;
    margin-top: 26px;
    .cancel{
        background: ${({theme}) => theme.colors.boxBgColor};
        color: ${({theme}) => theme.colors.baseColor};
    }
`;
