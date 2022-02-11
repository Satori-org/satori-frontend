import styled from "styled-components";
import {colors} from "../../styles/style";

export const TableStyle = styled.table`
    width: 100%;
    th{
        font-size: 14px;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
        line-height: 36px;
        &.left{
            text-align: left;
        }
        &.right{
            text-align: right;
        }
        &.center{
            text-align: center;
        }
    }
    td{
        font-size: 16px;
        font-weight: 400;
        line-height: 36px;
        &.left{
            text-align: left;
        }
        &.right{
            text-align: right;
        }
        &.center{
            text-align: center;
        }
    }
    .dashedBorder{
        border-bottom: 1px dashed ${({theme}) => theme.colors.baseColor};
    }
`;
