import { colors } from "src/styles/style";
import styled from "styled-components";

export const OrdersStyle = styled.div`
    position: relative;
    min-height: 2rem;
    margin-top: 0.08rem;
    padding: 0 0.24rem 0.28rem;
    box-sizing: border-box;
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
            line-height: 0.4rem;
            &:last-child{
                text-align: center;
            }
        }
    }
`;

