import styled from "styled-components";

export const AppStyle = styled.div`
    min-height: 100vh;
    font-weight: 400;
    color: ${({theme}) => theme.colors.baseColor};
    background: ${({theme}) => theme.colors.backgroundColor};
    text-align: left;
    box-sizing: border-box;
    a{
        color: ${({theme}) => theme.colors.baseColor};
        text-decoration: none;
    }
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
`;
