import styled from "styled-components";
import {colors} from "src/styles/style";

export const PositionStyle = styled.div`
    position: relative;
    min-height: 2rem;
    padding-bottom: 0.28rem;
    box-sizing: border-box;
    .tokenIcon{
        width: 16px;
        height: 16px;
    }
    
    .Leverage{
        display: inline-block;
        min-width: 36px;
        line-height: 18px;
        border-radius: 4px;
        border: 1px solid #979797;
        text-align: center;
    }
    .long{
        color: ${({theme}) => theme.colors.long};
    }
    .short{
        color: ${({theme}) => theme.colors.short};
    }
    .table{
        td{
            line-height: 54px;
        }
    }
`;
