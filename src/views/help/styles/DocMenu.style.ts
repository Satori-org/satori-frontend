import styled from "styled-components";
import {colors} from "../../../styles/style";

export const DocMenuStyle = styled.div`
    min-width: 300px;
    white-space: nowrap;
    padding-top: 38px;
    margin-right: 2px;
    .title{
        font-size: 24px;
        font-weight: 500;
        color: #333;
        margin-bottom: 36px;
    }
    ul{
        list-style: none;
        .parentLabel{
            font-weight: 500;
        }
    }
`;

export const RowStyle = styled.li`
    line-height: 50px;
    box-sizing: border-box;
    .menuParent{
        padding: 0 20px 0 24px;
        cursor:pointer;
        &.active{
            background: #FDFDFD;
            color: ${colors.activeColor};
        }
    }
    .icon{
        width: 10px;
        height: 10px;
        &.active{
            transform: rotate(90deg);
        }
    }
    .childrenBox{
        .child{
            height: 100%;
            flex: 1;
            padding-left: 44px;
            &.activeItem{
                background: #FDFDFD;
                color: ${colors.activeColor};
            }
            &:hover{
                background: #E8E7E7;
            }
        }
        
    }
`;
