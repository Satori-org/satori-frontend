import styled from "styled-components";
import {colors} from "../../../styles/style";

export const ContractDetailStyle = styled.div`
    padding: 0 24px 24px;
    background: ${colors.backgroundColor};
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;


export const Title = styled.div`
    margin-bottom: 16px;
`;

export const FieldLabel = styled.div`
    color: #B2B6BC;
    &:not(:last-child){
        margin-bottom: 10px;
    }
    .label{
        color: ${colors.labelColor};
    }
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 14px;
    margin-top: 15px;
    .button{
        height: 38px;
        background: ${colors.activeColor};
        color: ${colors.pageBgColor};
        border-radius: 8px;
        box-sizing: border-box;
        &.Withdraw{
            background: transparent;
            color: ${colors.activeColor};
            border: 1px solid ${colors.activeColor};
        }
    }
`;
