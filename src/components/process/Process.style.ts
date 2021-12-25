import styled from "styled-components";
import {colors} from "../../styles/style";

export const ProcessStyle = styled.div`
    position: relative;
    background-color: #010101;
    height: 6px;
    border-radius: 5px;
    .val{
        position: absolute;
        left: 0;
        height: 100%;
        background-color: ${colors.activeColor};
        border-radius: 5px;
        transition: width 0.25s;
        &:after{
            content: "";
            position: absolute;
            top: 50%;;
            right: 0;
            width: 14px;
            height: 14px;
            transform: translate(50%, -50%);
            background: ${colors.baseColor};
            border: 4px solid ${colors.activeColor};
            border-radius: 50%;
            box-sizing: border-box;
        }
    }
`;
