import styled from "styled-components";

type IProps = {
    length: number
}
export const PercentStyle = styled.div<IProps>`
    display: grid;
    grid-template-columns: repeat(${(props: IProps) => props.length}, 1fr);
    grid-column-gap: 0.18rem;
    margin-top: 0.12rem;
    .percentItem{
        height: 0.24rem;
        text-align: center;
        background: ${({theme}) => theme.colors.inputBtnBgColor};
        color: ${({theme}) => theme.colors.inputBtnColor};
        /*border: 1px solid #525150;*/
        border-radius: 0.08rem;
        box-sizing: border-box;
        cursor:pointer;
        /*&.active{
            background: ${({theme}) => theme.colors.boxBgColor};
            border: none;
        }*/
    }
`;
