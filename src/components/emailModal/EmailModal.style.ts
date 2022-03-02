import styled from "styled-components";

export const EmailModalStyle = styled.div`
    
`;

export const RightBtn = styled.button`
    min-width: 0.36rem;
    height: 0.24rem;
    padding: 0 0.06rem;
    box-sizing: border-box;
    color: ${({theme}) => theme.colors.inputBtnColor};
    background: ${({theme}) => theme.colors.inputBtnBgColor};
    border-radius: 0.08rem;
    margin-left:  0.08rem;
    font-weight: normal;
    &:disabled{
        color: ${({theme}) => theme.colors.inputBtnDisableColor};
        cursor: not-allowed;
    }
`;

export const Submit = styled.button`
    width: 100%;
    height: 0.4rem;
    border-radius: 0.08rem;
    background: ${({theme}) => theme.colors.confirmBgColor};
    color: ${({theme}) => theme.colors.confirmColor};
    font-size: 0.12rem;
    font-weight: bold;
    margin-top: 0.24rem;
`;
