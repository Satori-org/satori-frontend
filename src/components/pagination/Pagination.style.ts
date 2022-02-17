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
    width: 0.1rem;
    height: 0.1rem;
    padding: 0.06rem;
    cursor:pointer;
    background-origin: content-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.arrowLeft{
        margin-right: 0.04rem;
        background-image: url(${arrow_left});
        &:hover{
            background-image: url(${arrow_left_active});
        }
    }
    &.arrowRight{
        margin-left: 0.04rem;
        background-image: url(${arrow_right});
        &:hover{
            background-image: url(${arrow_right_active});
        }
    }
`;

export const PageItem = styled.span`
    display: inline-block;
    min-width: 0.28rem;
    line-height: 0.28rem;
    text-align: center;
    padding: 0 0.04rem;
    box-sizing: border-box;
    font-size: 0.12rem;
    font-weight: 400;
    cursor:pointer;
    color: ${({theme}) => theme.colors.borderColor};
    border-radius: 0.08rem;
    &.active{
        background: ${({theme}) => theme.colors.paginationBgColor};
        color: ${({theme}) => theme.colors.baseColor};
    }
    /*&:hover{
        color: ${colors.activeColor};
    }*/
    &:not(:last-child){
        margin-right: 0.04rem;
    }
`;

export const More = styled.span`
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    text-align: center;
    cursor:pointer;
    user-select: none;
`;
