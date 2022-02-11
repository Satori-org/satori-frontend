import styled from "styled-components";
import {colors} from "../../styles/style";

type Itab = {len: number};
export const TabStyle = styled.div<Itab>`
    display: flex;
    align-items: center;
    height: 0.4rem;
    text-align: center;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor2};
    position: relative;
    /*padding: 0 20px;*/
    box-sizing: border-box;
    .item{
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        cursor:pointer;
        color: ${({theme}) => theme.colors.labelColor};
        &:hover{
            color: ${({theme}) => theme.colors.activeColor};
        }
        &.active{
            color: ${({theme}) => theme.colors.activeColor};
            &:after{
                content: "";
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: ${({theme}) => theme.colors.activeColor};
                transform: translateY(50%);
            }
        }
        &:not(:last-child){
            margin-right: 24px;
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
