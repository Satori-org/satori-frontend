import styled from "styled-components";

export const ThemeControlStyle = styled.div`
    width: 0.32rem;
    height: 0.32rem;
    position: relative;
    background: ${({theme}) => theme.colors.boxBgColor};
    color: ${({theme}) => theme.colors.headerButtonColor};
    cursor:pointer;
    .icon{
        width: 0.167rem;
        height: 0.167rem;
    }
`;
