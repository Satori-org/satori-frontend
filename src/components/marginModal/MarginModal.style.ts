import styled from "styled-components";
import {colors} from "../../styles/style";

export const MarginModalStyle  = styled.div`
    .label{
        font-size: 12px;
        color: ${colors.labelColor};
    }
`;

export const RightBtn = styled.span`
    font-size: 14px;
    font-weight: 400;
    margin: 0 8px;
    color: ${colors.activeColor};
    cursor:pointer;
`;
