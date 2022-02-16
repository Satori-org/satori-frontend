import styled from "styled-components";

export const StatusStyle = styled.div`
    min-height: calc(100vh - 0.48rem);
    padding: 38px 0;
    background: ${({theme}) => theme.colors.backgroundColor};
    .content{
        width: 933px;
        margin: auto;
    }
`;

export const StatusTitle = styled.h3`
    font-size: 0.24rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.baseColor};
    margin-bottom: 0.16rem;
`;



export const StatusList = styled.ul`
    list-style: none;
`;
export const StatusItemStyle = styled.li`
    position: relative;
    padding: 46px 32px 38px 32px;
    margin-bottom: 24px;
    background: ${({theme}) => theme.colors.boxBgColor};
    border-radius: 6px;
    .title{
        font-size: 0.18rem;
        font-weight: normal;
        color: ${({theme}) => theme.colors.baseColor};
        margin-bottom: 16px;
    }
    .date{
        font-size: 0.14rem;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
    }
    .statusContent{
        padding-top: 8px;
        margin-top: 8px;
        font-size: 0.12rem;
        color: ${({theme}) => theme.colors.baseColor};
        border-top: 1px solid ${({theme}) => theme.colors.borderColor};
        img{
            width: 100%;
        }
    }
`;

export const Collapse = styled.div`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    margin-left: 34px;
    background: ${({theme}) => theme.colors.boxBgColor};
    box-sizing: border-box;
    border-radius: 6px;
    cursor:pointer;
    user-select: none;
    .icon{
        width: 16px;
        transition: all 0.35s;
    }
    &.active{
        .icon{
            transform: rotate(180deg);
        }
    }
`;
