import styled from "styled-components";
import {colors, fonts} from "../../../styles/style";

const PADDING = "0 24px";

export const BookStyle = styled.div`
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    display: flex;
    flex-direction: column;
    background: ${colors.backgroundColor};
`;

export const BookTab = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 54px;
    text-align: center;
    align-items: center;
    .tabItem{
        &.active{
            font-weight: 600;
            color: ${colors.activeColor};
        }
    }
`;

export const LabelBox = styled.div`
    display: flex;
    padding: ${PADDING};
    box-sizing: border-box;
    font-size: ${fonts.h6};
    color: ${colors.labelColor};
    margin-bottom: 10px;
    text-align: right;
    .labelItem{
        flex: 1;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 106px;
        }
    }
`;

export const BookContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const RowContainer = styled.div`
    padding: ${PADDING};
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    &.reverse{
        justify-content: flex-end;
    }
`;

export const Row = styled.div`
    display: flex;
    line-height: 28px;
    font-size: ${fonts.h6};
    .long{
        color: ${colors.long};
    }
    .short{
        color: ${colors.short};
    }
    span{
        flex: 1;
        text-align: right;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 106px;
        }
    }
`;

export const Spread = styled.div`
    display: flex;
    padding: ${PADDING};
    border-bottom: 1px solid #1C1F2C;
    border-top: 1px solid #1C1F2C;
    color: #5F6165;
    line-height: 26px;
    box-sizing: border-box;
    span{
        flex: 1;
        text-align: right;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            min-width: 106px;
        }
    }
`;
