import styled from "styled-components";

export const NetworkStyle = styled.div`
    min-width: 0.86rem;
    padding: 0 0.12rem;
    position: relative;
    line-height: 0.32rem;
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.boxBgColor};
    /*color: ${({theme}) => theme.colors.linkDefaultColor};*/
    text-align: center;
    .icon{
        width: 0.12rem;
        height: 0.12rem;
        margin-right: 0.08rem;
    }
    .arrow{
        width: 0.08rem;
        height: 0.0495rem;
        margin-left: 0.12rem;
    }
`;

export const NetworkList = styled.div`
    min-width: 1.84rem;
    position: absolute;
    right: -0.08rem;
    bottom: 0;
    transform: translateY(100%);
    padding-top: 8px;
    z-index: 1000;
`;
export const NetworkPanel = styled.ul`
    padding: 0.24rem;
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.boxBgColor};
    box-shadow: ${({theme}) => theme.colors.boxShadow};
    border-radius: 0.08rem;
`;

export const NetworkItem = styled.li`
    height: 0.4rem;
    padding: 0.08rem;
    box-sizing: border-box;
    border-radius: 0.06rem;
    font-size: 0.16rem;
    color: ${({theme}) => theme.colors.baseColor};
    font-weight: normal;
    cursor:pointer;
    &.active{
        background: ${({theme}) => theme.colors.networkBgColor};
    }
    .icon{
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.08rem;
    }
`;
