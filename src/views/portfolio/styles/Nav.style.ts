import styled from "styled-components";
import {colors} from "src/styles/style";

export const NavStyle = styled.nav`
    display: flex;
    align-items: center;
    //flex-direction: column;
    //padding: 16px 24px;
    margin-top: 36px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${({theme}) => theme.colors.explain};
    .item{
        /*width: 260px;
        line-height: 38px;
        padding-left: 14px;
        border-radius: 8px;*/
        position: relative;
        margin-right: 32px;
        line-height: 36px;
        font-size: 18px;
        color: ${({theme}) => theme.colors.labelColor};
        padding-bottom: 8px;
        &.active{
            color: ${({theme}) => theme.colors.filedColor};
            &:after{
                content: "";
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.filedColor};
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
