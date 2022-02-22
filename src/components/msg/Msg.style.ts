import styled from "styled-components";

export const MsgStyle = styled.div`
    position: relative;
    width: 0.32rem;
    height: 0.32rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    color: ${({theme}) => theme.colors.linkDefaultColor};
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
