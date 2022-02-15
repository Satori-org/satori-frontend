import styled from "styled-components";

type Itab = {len: number};
export const Tab2Style = styled.div<Itab>`
    display: grid;
    grid-template-columns: repeat(${(props: Itab) => props.len}, 1fr);
    padding: 0.04rem;
    background: ${({theme}) => theme.colors.inputBgColor};
    .button{
        height: 0.24rem;
        font-size: 0.12rem;
        font-weight: bold;
        color: ${({theme}) => theme.colors.tabColor};
        background: transparent;
        border-radius: 0.06rem;
        &.active{
            color: ${({theme}) => theme.colors.tabSelectedColor};
            background: ${({theme}) => theme.colors.tabSelectedBColor};
        }
    }
`;
