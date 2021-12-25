import styled from "styled-components";
import {colors, fonts} from "../../styles/style";

export const InputStyle = styled.div`
    position: relative;
    margin-bottom: 12px;
    margin-top: 32px;
    font-size: 12px;
    .unit{
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .text{
        width: 100%;
        height: 48px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        padding-left: 18px;
        box-sizing: border-box;
        outline: none;
    }
`;
