import styled from "styled-components";

export const DatePickerStyle = styled.div`
    display: inline-block;
`;

export const DatePickerPanel = styled.div`
    position: fixed;
    z-index: 1000;
    width: 2.54rem;
    border-radius: 0.08rem;
    background: ${({theme}) => theme.colors.pickerBgColor};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    padding-bottom: 0.08rem;
    opacity: 0;
`;

export const PickerTitle = styled.div`
    padding: 0.12rem 0.1rem 0.04rem;
    font-size: 0.14rem;
    font-weight: normal;
    color: ${({theme}) => theme.colors.activeColor};
    .icon{
        width: 0.1rem;
        height: 0.08rem;
        cursor: pointer;
        &.right{
            transform: rotate(180deg);
        }
    }
`;
export const RowItem = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.34rem;
    height: 0.34rem;
    margin-bottom: 0.02rem;
    background: transparent;
    font-size: 0.14rem;
    color: ${({theme}) => theme.colors.baseColor};
    &.header{
        font-size: 0.1rem;
        font-weight: normal;
        color: ${({theme}) => theme.colors.pickerThColor};
    }
    &:disabled{
        color: ${({theme}) => theme.colors.pickerNotAllow};
        cursor: not-allowed;
    }
    &.start_date{
        background: ${({theme}) => theme.colors.pickerOnSelect};
        border-radius: 0.04rem 0 0 0.04rem;
        color: #fff;
    }
    &.end_date{
        background: ${({theme}) => theme.colors.pickerOnSelect};
        border-radius: 0 0.04rem 0.04rem 0;
        color: #fff;
    }
    &.range{
        background: ${({theme}) => theme.colors.pickerRangeBgColor};
        color: #fff;
        &:hover{
            //border-radius: 0 0.04rem 0.04rem 0;
        }
    }
`;
export const PickerHeader = styled.div`
    display: flex;
    justify-content: center;
`;

export const DateContent = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

