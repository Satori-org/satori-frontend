import styled from "styled-components";
import {colors} from "../../styles/style";

export const TableStyle = styled.table`
    width: 100%;
    th{
        font-size: 0.1rem;
        font-weight: 600;
        color: ${({theme}) => theme.colors.thColor};
        line-height: 0.28rem;
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
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.28rem;
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
