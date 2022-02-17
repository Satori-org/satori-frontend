import styled from "styled-components";
import {colors} from "../../../styles/style";

export const RecordStyle = styled.div`
    /*grid-column-end: span 3;*/
    flex: 1;
    /*min-height: 338px;*/
    padding: 0 0.16rem 0.2rem;
    background: ${({theme}) => theme.colors.boxBgColor};
`;

export const RecordHeader = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
    margin-bottom: 16px;
`;

export const RecordTab = styled.div`
    height: 0.4rem;
    /*padding: 0 20px;*/
    .tabItem{
        position: relative;
        height: 100%;
        margin-right: 24px;
        cursor:pointer;
        user-select: none;
        font-weight: bold;
        color: ${({theme}) => theme.colors.labelColor};
        &:hover{
            color: ${({theme}) => theme.colors.activeColor};
        }
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
            &:after{
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.activeColor};
            }
        }
    }
`;

export const DisplayCtroll = styled.div`
    color: ${({theme}) => theme.colors.labelColor};
    cursor:pointer;
    .checkbox{
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.08rem;
        border-radius: 0.04rem;
        border: 1px solid ${({theme}) => theme.colors.confirmBgColor};
    }
    .checkIcon{
        width: 0.1rem;
        height: 0.08rem;
    }
`;
