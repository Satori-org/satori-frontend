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
        color: ${({theme}) => theme.colors.labelColor};
        &:hover{
            color: ${({theme}) => theme.colors.activeColor};
        }
        &.active{
            font-weight: bold;
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
    margin-right: 20px;
    color: ${({theme}) => theme.colors.labelColor};
    cursor:pointer;
    .checkIcon{
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
`;
