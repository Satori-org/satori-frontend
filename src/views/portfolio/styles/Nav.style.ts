import styled from "styled-components";

export const NavStyle = styled.nav`
    display: flex;
    align-items: center;
    //flex-direction: column;
    //padding: 16px 24px;
    margin: 0.32rem 0.24rem 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
    /*padding: 0.16rem 0.24rem 0;
    background: ${({theme}) => theme.colors.boxBgColor};*/
    .item{
        /*width: 260px;
        line-height: 38px;
        padding-left: 14px;
        border-radius: 8px;*/
        position: relative;
        margin-right: 0.16rem;
        padding: 0.16rem 0;
        font-size: 0.12rem;
        font-weight: bold;
        color: ${({theme}) => theme.colors.labelColor};
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
            &:after{
                content: "";
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.activeColor};
            }
        }
        .iconWrap{
            display: inline-block; 
            min-width: 22px; 
            text-align: center;
            margin-right: 12px;
            padding-bottom: 2px;
        }
        .icon{
            vertical-align: middle;
        }
    }
`;
