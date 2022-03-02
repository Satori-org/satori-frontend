import styled from "styled-components";

export const Submit = styled.button`
	width: 100%;
	//min-width: 303px;
	height: 0.4rem;
	font-size: 0.12rem;
	font-weight: bold;
	border-radius: 0.08rem;
	color: ${({theme}) => theme.colors.confirmColor};
	cursor: pointer;
	background: ${({theme}) => theme.colors.confirmBgColor};
	&:disabled{
		/*background: #DBDBDB;
		color: #999999;*/
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
export const Loading = styled.div`
	/*opacity: 0.8;
	cursor: not-allowed;*/
`;
