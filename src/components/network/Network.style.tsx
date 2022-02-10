import styled from "styled-components";

export const NetworkStyle = styled.div`
    min-width: 80px;
    line-height: 36px;
    padding: 0 12px;
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    .icon{
        width: 12px;
        height: 12px;
        margin-right: 11px;
    }
`;
