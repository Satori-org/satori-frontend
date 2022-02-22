import styled from "styled-components";

export const GuideStyle = styled.div`
    font-weight: bold;
    color: ${({theme}) => theme.colors.linkDefaultColor};
    .icon{
        width: 0.133rem;
        height: 0.133rem;
        margin-right: 0.0533rem;
    }
`;
