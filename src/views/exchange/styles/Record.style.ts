import styled from "styled-components";
import {colors} from "../../../styles/style";

export const RecordStyle = styled.div`
    grid-column-end: span 3;
    min-height: 320px;
    padding: 16px 24px;
    background: ${colors.backgroundColor};
`;

export const RecordTab = styled.div`
    margin-bottom: 20px;
    .tabItem{
        margin-right: 32px;
        cursor:pointer;
        user-select: none;
        &.active{
            color: ${colors.activeColor};
        }
    }
`;
