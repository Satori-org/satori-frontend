import styled from "styled-components";

export const Dividerstyle = styled.div`
	display: flex;
	align-items: center;
	color: ${({theme}) => theme.colors.labelColor};
	.text{
		margin: 0 0.04rem;
	}
	.line{
		display: inline-block;
		flex: 1;
		height: 1px;
		background-color: ${({theme}) => theme.colors.borderColor2};
	}
`;
