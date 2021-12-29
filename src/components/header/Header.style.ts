import styled from "styled-components";
import {colors} from "../../styles/style";

export const HeaderStyle = styled.div`
    height: 72px;
    position: relative;
    padding: 0 20px;
`;

export const Logo = styled.img`
    width: 117px;
    height: 37px;
`;

export const Nav = styled.nav`
    margin-left: 90px;
    .item{
        &.active{
            color: ${colors.activeColor};
        }
        &:not(:last-child){
            margin-right: 32px;
        }
    }
`;