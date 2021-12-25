import styled from "styled-components";
import {colors} from "../../styles/style";

type Itab = {len: number};
export const TabStyle = styled.div<Itab>`
    display: grid;
    grid-template-columns: repeat(${(props: Itab) => props.len}, 1fr);
    border-bottom: 2px solid ${colors.auxiBgColor};
    text-align: center;
    position: relative;
    .item{
        padding: 7px 0;
        cursor:pointer;
        &.active{
            color: ${colors.activeColor};
        }
    }
    
`;

type ISlider = {
    len: number
}
export const TabSlider = styled.div<ISlider>`
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: ${(props: ISlider) => 100/props.len}%;
    transition: transform 0.35s ease;
    background: ${colors.activeColor};
`;
