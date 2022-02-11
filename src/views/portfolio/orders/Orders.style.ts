import { colors } from "src/styles/style";
import styled from "styled-components";

export const OrdersStyle = styled.div`
    .long{
        color: ${colors.long};
    }
    .short{
        color: ${colors.short};
    }
    .table{
        th{
            &:last-child{
                text-align: center;
            }
        }
        td{
            line-height: 54px;
            &:last-child{
                text-align: center;
            }
        }
    }
`;

