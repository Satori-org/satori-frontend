import styled from "styled-components";

export const ToastStyle = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, 50%);
	min-width: 120px;
	min-height: 40px;
	padding: 0 12px;
	box-sizing: border-box;
	background-color: rgba(0,0,0,0.8);
	font-size: 12px;
	color: #fff;
	text-align: center;
	border-radius: 4px;
	z-index: 9999;
    word-break: break-word;
`;
