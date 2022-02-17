import styled from "styled-components";

export const borderRadius = "0.16rem";
export const ExchangeStyle = styled.div`
    /*display: flex;*/
    /*height: calc(100vh - 0.48rem);*/
    
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 0.48rem);
    background: ${({theme}) => theme.colors.gapColor };
    padding: 0 0.08rem;
    .trade-box{
        display: grid;
        grid-template-columns: 1fr 3rem 3rem;
        grid-column-gap: 0.04rem;
        /*height: calc(100% - 35.3vh - 80px);*/
        /*flex: 1;
        height: 0;*/
        height: 5rem;
        margin-bottom: 1px;
        border-top-right-radius: ${borderRadius};
        border-top-left-radius: ${borderRadius};
        overflow: hidden;
        /*flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr 350px;
        grid-gap: 1px;*/
    }
    .bottom-box{
        display: grid;
        grid-template-columns: 1fr 3rem;
        grid-column-gap: 0.04rem;
        min-height: 3rem;
        overflow-y: hidden;
        flex-shrink: 0;
        margin-top: 0.04rem;
        border-bottom-right-radius: ${borderRadius};
        border-bottom-left-radius: ${borderRadius};
        /*flex-shrink: 0;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1px;*/
    }
`;

export const ConnectStatus = styled.div`
    margin: 0 0.08rem;
    padding: 0 0.16rem;
    height: 0.28rem;
    color: ${({theme}) => theme.colors.thColor};
    .statusIcon{
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        background: ${({theme}) => theme.colors.long};
        margin-right: 0.08rem;
    }
`;
