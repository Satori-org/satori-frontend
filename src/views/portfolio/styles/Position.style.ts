import styled from "styled-components";
import {colors} from "src/styles/style";

export const PositionStyle = styled.div`
    .tokenIcon{
        width: 16px;
        height: 16px;
    }
    .name{
        margin: 0 6px;
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
        color: ${colors.long};
    }
    .short{
        color: ${colors.short};
    }
`;
