import styled from "styled-components";
import {colors} from "src/styles/style";

export const MyChartStyle = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 56px);
	bottom: 0;
	z-index: 5;
	padding-bottom: 5px;
	background-color: ${colors.backgroundColor};
	visibility: hidden;
	&.active{
		visibility: visible;
	}
`;
