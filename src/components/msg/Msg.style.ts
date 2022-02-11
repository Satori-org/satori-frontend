import styled from "styled-components";

export const MsgStyle = styled.div`
    position: relative;
    width: 36px;
    height: 36px;
    position: relative;
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    cursor:pointer;
    .icon{
        width: 15px;
        height: 20px;
    }
    .tag{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #F02929;
    }
`;
