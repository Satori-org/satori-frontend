import styled from "styled-components";

export const ExchangeStyle = styled.div`
    /*display: flex;*/
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colors.gapColor };
    .trade-box{
        display: flex;
        height: calc(100% - 35.3vh - 80px);
        margin-bottom: 1px;
        /*flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr 350px;
        grid-gap: 1px;*/
    }
    .bottom-box{
        display: flex;
        height: 35.3vh;
        overflow-y: hidden;
        flex-shrink: 0;
        /*flex-shrink: 0;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1px;*/
    }
`;
