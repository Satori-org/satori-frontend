import styled from "styled-components";

export const EmptyDataStyle = styled.div`
    text-align: center;
    .emptyIcon{
        width: 0.44rem;
        height: 0.36rem;
        margin-bottom: 0.2rem;
    }
    .emptyText{
        font-size: 0.2rem;
        color: ${({theme}) => theme.colors.emptyTextColor};
    }
`;
