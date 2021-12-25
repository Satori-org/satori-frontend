import styled from "styled-components";
import {colors} from "../../../styles/style";

export const ExchangeStyle = styled.div`
    display: flex;
    background: ${colors.pageBgColor};
    padding-top: 1px;
    .left{
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr 350px;
        grid-gap: 1px;
    }
    .right{
        flex-shrink: 0;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1px;
    }
`;
