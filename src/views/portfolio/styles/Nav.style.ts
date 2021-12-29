import styled from "styled-components";
import {colors} from "../../../styles/style";

export const NavStyle = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    .item{
        width: 260px;
        line-height: 38px;
        padding-left: 14px;
        border-radius: 8px;
        &.active{
            background: ${colors.inputBgColor};
            color: ${colors.activeColor};
        }
    }
`;
