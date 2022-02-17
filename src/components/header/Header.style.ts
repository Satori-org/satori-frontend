import styled from "styled-components";
import {colors} from "../../styles/style";

export const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    height: 0.48rem;
    position: relative;
    padding-left: 0.24rem;
    padding-right: 0.08rem;
`;

export const Logo = styled.img`
    width: 0.78rem;
    height: 0.16rem;
`;

export const Nav = styled.nav`
    height: 100%;
    margin-left: 0.24rem;
    .item{
        font-weight: bold;
        color: ${({theme}) => theme.colors.linkDefaultColor};
        cursor:pointer;
        padding: 0.08rem;
        border-radius: 0.08rem;
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
            background: ${({theme}) => theme.colors.linkActiveBgColor};
        }
        &:hover{
            color: ${({theme}) => theme.colors.activeColor};
        }
        &:not(:last-child){
            margin-right: 0.08rem;
        }
    }
`;

export const NavChild = styled.ul`
    position: relative;
    list-style: none;
    &:hover{
        .navMenu{
            //display: inline-block;
        }
        .menuLabel{
            font-weight: bold;
            color: ${({theme}) => theme.colors.activeColor};
        }
    }
    .menuLabel{
        height: 100%;
        font-weight: bold;
        color: ${({theme}) => theme.colors.linkDefaultColor};
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
        }
    }
`;

export const NavMenuContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 1rem;
    z-index: 1000;
`;

export const NavMenu = styled.nav`
    line-height: 0.32rem;
    background: ${({theme}) => theme.colors.boxBgColor};
    border: 1px solid ${({theme}) => theme.colors.modalBorderColor};
    box-sizing: border-box;
    border-radius: 0.08rem;
    .menuItem{
        font-size: 0.12rem;
        text-align: center;
        color: ${({theme}) => theme.colors.labelColor};
        &:hover{
            color: ${({theme}) => theme.colors.baseColor};
            background: rgba(255, 255, 255, 0.04);
        }
    }
`;
