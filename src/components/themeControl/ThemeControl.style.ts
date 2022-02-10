import styled from "styled-components";

export const ThemeControlStyle = styled.div`
    width: 36px;
    height: 36px;
    position: relative;
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    cursor:pointer;
    .icon{
        width: 19px;
        height: 19px;
    }
`;
