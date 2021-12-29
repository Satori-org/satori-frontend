import styled from "styled-components";
import {colors} from "src/styles/style";

export const Submit = styled.button`
	width: 100%;
	//min-width: 303px;
	height: 44px;
	font-size: 14px;
	font-weight: bold;
	border-radius: 8px;
	color: ${colors.buttonTextColor};
	cursor: pointer;
	background: ${colors.activeColor};
	&:disabled{
		/*background: #DBDBDB;
		color: #999999;*/
		opacity: 0.5;
	}
`;
export const Loading = styled.div`
	/*opacity: 0.8;
	cursor: not-allowed;*/
`;
