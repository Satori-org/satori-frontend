import styled from "styled-components";
import {colors} from "../../styles/style";

export const DropDownStyle = styled.div`
    position: relative;
    .dropdownTrigger{
        color: ${colors.artContentColor};
        cursor:pointer;
    }
    .icon{
        width: 16px;
        height: 16px;
        margin-left: 6px;
    }
`;

export const Option = styled.ul`
    list-style: none;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    background: ${colors.inputBgColor};
    border-radius: 2px;
    padding: 6px 10px;
    text-align: center;
    line-height: 24px;
    white-space: nowrap;
    z-index: 100;
    .item{
        cursor:pointer;
        color: ${colors.baseColor};
        &.active{
            color: ${colors.activeColor};
        }
    }
`;
