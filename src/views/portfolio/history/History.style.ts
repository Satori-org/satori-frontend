import styled from "styled-components";
import {colors} from "../../../styles/style";

export const HistoryStyle = styled.div`
    
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

export const Tag = styled.span`
    display: inline-block;
    min-width: 70px;
    padding: 0 6px;
    line-height: 24px;
    box-sizing: border-box;
    background: ${colors.longOpa};
    color: ${colors.long};
    font-size: 12px;
    border-radius: 8px;
    &.short{
        background: ${colors.shortOpa};
        color: ${colors.short};
    }
`;
