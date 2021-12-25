import styled, {keyframes} from "styled-components";
import {colors} from "../../styles/style";


const  loadingRotate = keyframes`
	to {
		transform: rotate(1turn)
	}
`;
const loadingDash = keyframes`
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
	//background-color: hsla(0,0%,100%,.8);
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
	.circular{
		height: 40px;
		width: 40px;
		animation: ${loadingRotate} 2s linear infinite;
		vertical-align: middle;
	}
	.path{
		animation: ${loadingDash} 1.5s ease-in-out infinite;
		stroke-dasharray: 90,150;
		stroke-dashoffset: 0;
		stroke-width: 2;
		stroke: ${colors.activeColor};
		stroke-linecap: round;
	}
`;

