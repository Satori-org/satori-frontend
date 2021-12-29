import styled from "styled-components";

export const MsgStyle = styled.div`
    width: 36px;
    height: 36px;
    position: relative;
    background: #1A1D27;
    border-radius: 50%;
    cursor:pointer;
    .icon{
        width: 16px;
        height: 16px;
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
