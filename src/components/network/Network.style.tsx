import styled from "styled-components";

export const NetworkStyle = styled.div`
    width: 0.86rem;
    line-height: 0.32rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.boxBgColor};
    color: ${({theme}) => theme.colors.headerButtonColor};
    text-align: center;
    .icon{
        width: 0.12rem;
        height: 0.12rem;
        margin-right: 0.08rem;
    }
    .arrow{
        width: 0.08rem;
        height: 0.0495rem;
        margin-left: 0.12rem;
    }
`;
