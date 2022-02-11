import styled from "styled-components";
import {colors} from "src/styles/style";

export const ModalBox = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    height: 100vh;
    z-index: 888;
    background: rgb(13,13,13,0.7);
    .content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 384px;
        border-radius: 16px;
        background: #000;
        padding: 32px;
        box-sizing: border-box;
        color: #F6F7F0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        .close{
            /*position: absolute;
            right: 0;
            top: 0;
            padding: 15px;*/
            .closeIcon{
                width: 32px;
                height: 32px;
                cursor:pointer;
                vertical-align: initial;
            }
        }
    }
    .title{
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        color: ${({theme}) => theme.colors.modalTitle};
    }
`;
