import styled from "styled-components";

export const SplitNumberStyle = styled.div`
    display: inline-block;
    .decimal{
        font-size: 0.14rem;
        color: ${({theme}) => theme.colors.labelColor};
    }
`;
