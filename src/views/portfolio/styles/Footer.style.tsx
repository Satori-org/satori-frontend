import styled from "styled-components";
import {colors} from "../../../styles/style";

export const FooterStyle = styled.div`
    ul{
        list-style: none;
    }
    .list{
        display: flex;
        li{
            margin-right: 42px;
        }
    }
    .list-child{
        margin-top: 16px;
        a{  
            font-size: 12px;
            font-weight: 400;
            line-height: 24px;
            color: ${colors.labelColor};
            &:hover{
                color: ${colors.activeColor};
            }
        }
    }
`;
