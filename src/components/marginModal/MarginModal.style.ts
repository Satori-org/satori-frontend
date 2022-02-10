import styled from "styled-components";
import {colors} from "../../styles/style";

export const MarginModalStyle  = styled.div`
    .label{
        color: ${({theme}) => theme.colors.labelColor};
    }
`;

export const Tab = styled.div`
    height: 42px;
    border: 1px solid ${({theme}) => theme.colors.boxBgColor};
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    .item{
        border-radius: 6px;
        cursor:pointer;
        &.active{
            background: ${({theme}) => theme.colors.boxBgColor};
        }
    }
`;

export const RightBtn = styled.button`
    min-width: 50px;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    color: ${({theme}) => theme.colors.labelColor};
    background: rgba(255,255,255,.08);
    border-radius: 8px;
    margin-left: 8px;
`;

export const Group = styled.div`
    margin-bottom: 16px;
`;
