import styled, {keyframes} from "styled-components";
import {colors} from "src/styles/style";


const loadingKeyframes = keyframes`
0% {
    opacity: 1;
  }
  80%{
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;
export const LdsRipple = styled.div`
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    transform: scale(0.7);
    div {
      transform-origin: 20px 20px;
      animation: ${loadingKeyframes} 1.2s linear infinite;
      
    }
    div:after {
      content: " ";
      display: block;
      position: absolute;
      top: 2px;
      left: 18px;
      width: 3px;
      height: 8px;
      border-radius: 20%;
      background: ${colors.activeColor};
    }
    ${(props: {num: number}) => {
        return new Array(props.num).fill(0).map((item, index) => {
            return  `
                div:nth-child(${index + 1}) {
                  transform: rotate(${index * 30}deg);
                  animation-delay: ${-1.1 + index * 0.1}s;
                }
            `
        });
    }}
`;
