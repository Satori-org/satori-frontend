import styled from "styled-components";

export const DropDownStyle = styled.div`
    position: relative;
    width: 228px;
    height: 0.32rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    border-radius: 0.06rem;
    background: ${({theme}) => theme.colors.inputBgColor};
    margin-left: 28px;
    cursor:pointer;
    .icon{
        width: 0.08rem;
        height: 0.05rem;
        margin-left: 0.12rem;
    }
    .selected-text{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const DropMenuContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 100%;
    z-index: 100;
    padding-top: 1px;
`;

export const DropMenu = styled.ul`
    list-style: none;
    font-size: 0.12rem;
    text-align: center;
    color: ${({theme}) => theme.colors.labelColor};
    background: ${({theme}) => theme.colors.boxBgColor};
    border: 1px solid ${({theme}) => theme.colors.modalBorderColor};
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 0.08rem;
    .label{
        height: 50px;
        padding-left: 24px;
        color: ${({theme}) => theme.colors.labelColor};
    }
    .menuItem{
        height: 50px;
        padding-left: 24px;
        cursor:pointer;
        color: ${({theme}) => theme.colors.modalTitle};
        &:hover{
            background: rgba(255, 255, 255, 0.04);
        }
    }
`;
