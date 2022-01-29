import styled from "styled-components";
import {colors, fonts} from "../../../../styles/style";

export const HeaderStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    background: ${colors.backgroundColor};
    .content{
        width: 1570px;
        height: 72px;
    }
    .link{
        font-size: ${fonts.h6};
        color: ${colors.activeColor};
        margin-left: 200px;
    }
`;
