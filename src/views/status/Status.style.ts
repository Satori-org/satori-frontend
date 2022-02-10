import styled from "styled-components";

export const StatusStyle = styled.div`
    min-height: calc(100vh - 60px);
    padding: 38px 0;
    background: #0D0D0D;
    .content{
        width: 933px;
        margin: auto;
    }
`;

export const StatusTitle = styled.h3`
    font-size: 36px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.filedColor};
    margin-bottom: 24px;
`;



export const StatusList = styled.ul`
    list-style: none;
`;
export const StatusItemStyle = styled.li`
    position: relative;
    padding: 46px 32px 38px 32px;
    margin-bottom: 24px;
    background: #000000;
    border-radius: 6px;
    .title{
        font-size: 24px;
        font-weight: normal;
        color: ${({theme}) => theme.colors.articleColor};
        margin-bottom: 16px;
    }
    .date{
        font-size: 18px;
        font-weight: 400;
        color: ${({theme}) => theme.colors.labelColor};
    }
    .statusContent{
        padding-top: 8px;
        margin-top: 8px;
        font-size: 14px;
        color: ${({theme}) => theme.colors.articleColor};
        border-top: 1px solid ${({theme}) => theme.colors.articleHrColor};
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
