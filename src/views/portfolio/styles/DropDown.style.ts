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
        width: 8px;
        margin-left: 12px;
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
    font-size: 14px;
    text-align: center;
    color: ${({theme}) => theme.colors.labelColor};
    background: ${({theme}) => theme.colors.boxBgColor};
    border: 1px solid ${({theme}) => theme.colors.modalBorderColor};
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
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
