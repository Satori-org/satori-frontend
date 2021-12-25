import styled from "styled-components";
import {colors} from "../../styles/style";

export const SliderStyle = styled.div`
    position: relative;
    height: 8px;
    background:  linear-gradient(90deg, ${colors.activeColor} 0,${colors.activeColor} 55px,${colors.inputBgColor} 55px,${colors.inputBgColor} 110px);
    margin: 0 4px;
    .step{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: ${colors.activeColor};
        position: absolute;
        top: 50%;
        left: -8px;
        transform: translate(0, -50%);
        cursor: pointer;
        &.disabled{
            filter: grayscale(1);
            cursor: not-allowed;
        }
        &.hover{
            box-shadow: 0 0 0 5px rgb(66,72,94,0.7);
        }
        // &.down{
        //     background-color: ${colors.short};
        //     &.hover{
        //     box-shadow: 0 0 0 5px rgba(255, 70, 70, 0.12);
        //     }
        // }
        .tip{
            display: inline-block;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -30px);
            /*background-color: rgba(0,0,0,0.5);*/
            color: #B2B6BC;
            /*padding: 2px 10px;*/
            &:after{
                content: "";
                display: inline-block;
                position: absolute;
                bottom: -4px;
                left: 50%;
                transform: translateX(-50%);
                /*border-top: 4px solid rgba(0,0,0,0.5);
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;*/
            }
        }
    }
`;

type ISlider = {
    borderColor?: string
}
export const StepItem = styled.div<ISlider>`
    display: inline-block;
    width: 11px;
    height: 11px;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #5F6165;
    border-radius: 50%;
    border: 1px solid ${(props: ISlider) => props.borderColor ?? colors.tradeBgColor}};
    &.active{
        background-color: ${colors.activeColor};
    }
`;
