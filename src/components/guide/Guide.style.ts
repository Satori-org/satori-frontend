import styled from "styled-components";

export const GuideStyle = styled.div`
    height: 36px;
    color: ${({theme}) => theme.colors.labelColor};
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }
`;
