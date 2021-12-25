import styled from "styled-components";
import {colors} from "../../../styles/style";

export const SettingStyle = styled.div`
   position: absolute;
   right: 0;
   top: 0;
   bottom: 0;
   padding: 0 24px;
   background: ${colors.backgroundColor};
   z-index: 10;
   .icon{
        width: 28px;
        height: 28px;
        cursor:pointer;
   }
`;

export const PanelStyle = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 185px;
    padding: 14px 16px 20px;
    border-radius: 2px;
    background: ${colors.tradeBgColor};
    .title{
        font-size: 12px;
        font-weight: 400;
        color: ${colors.labelColor};
    }
    .checkBoxIcon{
        width: 16px;
        height: 16px;
        margin-right: 16px;
    }
    .panelOption{
        cursor:pointer;
        &:not(:last-child){
            margin-bottom: 14px;
        }
    }
`;
