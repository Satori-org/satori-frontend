import { colors } from "src/styles/style";
import styled from "styled-components";

export const CancelButton = styled.button`
    width: 71px;
    height: 28px;
    background: ${colors.auxiBgColor};
    border-radius: 8px;
    color: ${colors.baseColor};
    &:hover{
        color: ${colors.activeColor};
    }
`;

export const RowStyle = styled.tr`
    .long{
        color: ${colors.long};
    }
    .short{
        color: ${colors.short};
    }
`;

export const RecordListStyle = styled.div`
    position: relative;
    padding: 0 24px;
    min-height: 200px;
`;
