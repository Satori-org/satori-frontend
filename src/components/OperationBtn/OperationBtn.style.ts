import styled from "styled-components";
import {colors} from "../../styles/style";

export const OperationBtnStyle = styled.button`
    min-width: 0.55rem;
    height: 0.24rem;
    background: ${({theme}) => theme.colors.borderColor2};
    font-size: 0.12rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.headerButtonColor};
    border-radius: 0.08rem;
`;
