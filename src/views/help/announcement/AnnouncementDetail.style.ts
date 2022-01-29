import styled from "styled-components";
import {colors} from "../../../styles/style";

export const AnnouncementDetailStyle = styled.div`
    padding: 24px 40px;
    background: #FFFFFF;
    flex: 1;
    box-sizing: border-box;
    .content{
        width: 855px;
    }
`;

export const Title = styled.h3`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
`;

export const Time = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #74777F;
`;

export const Content = styled.div`
    padding-top: 16px;
    margin-top: 8px;
    padding-bottom: 30px;
    margin-bottom: 32px;
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
`;

export const ButtonGroup = styled.div`
    grid-column-gap: 48px;
    .btnItem{
        padding: 11px 16px;
        border-radius: 16px;
        border: 1px solid #979797;
        cursor:pointer;
        .nextText{
            font-size: 14px;
            color: #74777F;
        }
        .title{
            font-size: 18px;
            font-weight: 500;
            color: #333;
            &:hover{
                color: ${colors.activeColor};
            }
        }
    }
`;
