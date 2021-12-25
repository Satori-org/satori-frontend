import styled from "styled-components";
import {colors} from "src/styles/style";

export const ModalBox = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    height: 100vh;
    z-index: 888;
    .content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 342px;
        border-radius: 12px;
        background-color: transparent;
        padding: 24px 16px 32px 16px;
        box-sizing: border-box;
        color: #fff;
        backdrop-filter: blur(20px);
        .close{
            /*position: absolute;
            right: 0;
            top: 0;
            padding: 15px;*/
            .closeIcon{
                width: 20px;
                vertical-align: initial;
            }
        }
    }
    .title{
        font-size: 18px;
        font-weight: bold;
        text-align: left;
    }
`;
