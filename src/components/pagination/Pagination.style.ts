import styled from "styled-components";
import {colors} from "../../styles/style";

const arrow_left = require("src/assets/images/arrow_left.png");
const arrow_left_active = require("src/assets/images/arrow_left_active.png");
const arrow_right = require("src/assets/images/arrow_right.png");
const arrow_right_active = require("src/assets/images/arrow_right_active.png");

export const PaginationStyle = styled.div`
    
`;

export const ArrowIcon = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    padding: 7px;
    cursor:pointer;
    background-origin: content-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.arrowLeft{
        margin-right: 4px;
        background-image: url(${arrow_left});
        &:hover{
            background-image: url(${arrow_left_active});
        }
    }
    &.arrowRight{
        margin-left: 4px;
        background-image: url(${arrow_right});
        &:hover{
            background-image: url(${arrow_right_active});
        }
    }
`;

export const PageItem = styled.span`
    display: inline-block;
    min-width: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0 4px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 400;
    cursor:pointer;
    &.active{
        background: ${({theme}) => theme.colors.filedColor};
        color: ${({theme}) => theme.colors.modalBgColor};
    }
    /*&:hover{
        color: ${colors.activeColor};
    }*/
    &:not(:last-child){
        margin-right: 4px;
    }
`;

export const More = styled.span`
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    cursor:pointer;
    user-select: none;
`;
