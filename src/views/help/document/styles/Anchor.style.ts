import styled from "styled-components";
import {colors} from "../../../../styles/style";

export const AnchorStyle = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(130%);
    display: flex;
    flex-direction: column;
    padding-left: 6px;
    border-left: 1px solid #ECECEC;
    line-height: 24px;
    color: #74777F;
    .item{
        cursor:pointer;
        &.active{
            color: ${colors.activeColor};
        }
    }
`;
