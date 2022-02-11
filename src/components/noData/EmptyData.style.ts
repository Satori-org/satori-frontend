import styled from "styled-components";

export const EmptyDataStyle = styled.div`
    text-align: center;
    .emptyIcon{
        width: 54px;
        height: 45px;
        margin-bottom: 24px;
    }
    .emptyText{
        font-size: 20px;
        color: ${({theme}) => theme.colors.emptyTextColor};
    }
`;
