import styled from "styled-components";

export const SortStyle = styled.div`
	.text{
		font-size: 12px;
		font-weight: 400;
		margin-right: 5px;
	}
	.triangleBox{
		flex-direction: column;
		.priceUp{
			border-right: 4px solid transparent;
			border-left: 4px solid transparent;
			border-bottom: 5px solid #6C727E;
			margin-bottom: 2px;
			cursor: pointer;
		}
		.priceDown{
			border-right: 4px solid transparent;
			border-left: 4px solid transparent;
			border-top: 5px solid #6C727E;
			cursor: pointer;
		}
	}
`;
