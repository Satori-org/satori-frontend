import styled, {keyframes} from "styled-components";

const loading_rotate = keyframes`
	to {
		transform: rotate(1turn)
	}
`;

const loading_dash = keyframes`
	0% {
	stroke-dasharray: 1,200;
	stroke-dashoffset: 0
	}

	50% {
	stroke-dasharray: 90,150;
	stroke-dashoffset: -40px
	}

	to {
	stroke-dasharray: 90,150;
	stroke-dashoffset: -120px
	}
`;

export const LoadingMask = styled.div`
	position: absolute;
	z-index: 2000;
	margin: 0;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transition: opacity .3s;
	&.inline{
		position: initial;
		background-color: unset;
	}
`
export const LoadingSpinner = styled.div`
	top: 50%;
	width: 100%;
	text-align: center;
	position: absolute;
	transform: translateY(-50%);
	&.inline{
		position: initial;
		transform: none;
	}
`

export const Circular = styled.svg`
	height: 40px;
	width: 40px;
	animation: ${loading_rotate} 2s linear infinite;
	vertical-align: middle;
`
export const Path = styled.circle`
	animation: ${loading_dash} 1.5s ease-in-out infinite;
	stroke-dasharray: 90,150;
	stroke-dashoffset: 0;
	stroke-width: 2;
	stroke: #5E72EC;
	stroke-linecap: round;
`


const loadingKeyframes = keyframes`
0% {
    opacity: 1;
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
      top: 3px;
      left: 18px;
      width: 3px;
      height: 9px;
      border-radius: 20%;
      background: #000;
    }
    div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -1.1s;
    }
    div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -1s;
    }
    div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.9s;
    }
    div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.8s;
    }
    div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.7s;
    }
    div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.6s;
    }
    div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.5s;
    }
    div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.4s;
    }
    div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.3s;
    }
    div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.2s;
    }
    div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.1s;
    }
    div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
`;
