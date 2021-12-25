import styled from "styled-components";
import {colors} from "../../styles/style";

export const TableStyle = styled.table`
    width: 100%;
    th{
        font-size: 12px;
        font-weight: 400;
        color: ${colors.labelColor};
        line-height: 36px;
    }
    td{
        font-size: 12px;
        font-weight: 400;
        line-height: 36px;
    }
`;
