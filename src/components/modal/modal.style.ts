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
        width: 3.44rem;
        background: ${({theme}) => theme.colors.boxBgColor};
        padding: 0.32rem;
        box-sizing: border-box;
        color: ${({theme}) => theme.colors.baseColor};
        border-radius: 0.16rem;
       /* border: 1px solid ${({theme}) => theme.colors.modalBorderColor};*/
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
        font-size: 0.24rem;
        font-weight: 600;
        text-align: left;
        color: ${({theme}) => theme.colors.modalTitle};
    }
`;
