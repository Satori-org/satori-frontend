import styled from "styled-components";

export const RiseIconStyle = styled.span`
    display: inline-block;
    margin-right: 0.04rem;
    &.long{
        transform: rotate(180deg);
        border-left: 0.032rem solid transparent;
        border-right: 0.032rem solid transparent;
        border-top: 0.032rem solid ${({theme}) => theme.colors.long};
    }
    &.short{
        border-left: 0.032rem solid transparent;
        border-right: 0.032rem solid transparent;
        border-top: 0.032rem solid ${({theme}) => theme.colors.short};
    }
`;
