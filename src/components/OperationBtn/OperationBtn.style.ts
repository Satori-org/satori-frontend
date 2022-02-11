import styled from "styled-components";
import {colors} from "../../styles/style";

export const OperationBtnStyle = styled.button`
    width: 62px;
    height: 28px;
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.baseColor};
    background: ${colors.auxiBgColor};
    border-radius: 8px;
`;
