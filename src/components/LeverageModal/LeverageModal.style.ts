import styled from "styled-components";
import {colors} from "../../styles/style";

export const LeverageModalStyle = styled.div`
    .label{
        color: ${colors.labelColor};
    }
`;


export const Warn = styled.div`
    padding: 18px;
    background: ${colors.fail};
    border-radius: 8px;
    margin-bottom: 16px;
    margin-top: 24px;
    line-height: 22px;
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }
`;
