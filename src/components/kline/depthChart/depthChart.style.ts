import styled from "styled-components";

export const MyChartStyle = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 20px);
	bottom: 0;
	z-index: 5;
	padding-bottom: 5px;
	background-color: #1c1c1c;
	visibility: hidden;
	&.active{
		visibility: visible;
	}
`;
