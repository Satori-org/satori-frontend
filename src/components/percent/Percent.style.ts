import styled from "styled-components";

type IProps = {
    length: number
}
export const PercentStyle = styled.div<IProps>`
    display: grid;
    grid-template-columns: repeat(${(props: IProps) => props.length}, 1fr);
    grid-column-gap: 8px;
    margin-top: 20px;
    .percentItem{
        height: 32px;
        text-align: center;
        border: 1px solid #525150;
        border-radius: 6px;
        box-sizing: border-box;
        cursor:pointer;
        &.active{
            background: ${({theme}) => theme.colors.boxBgColor};
            border: none;
        }
    }
`;
