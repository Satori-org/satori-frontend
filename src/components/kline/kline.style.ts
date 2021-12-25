import styled from "styled-components";

export const KlineBox = styled.div`
	height: 420px;
	position: relative;
	background-color: #1c1c1c;
	.depthChart{
		visibility: hidden;
		&.active{
			visibility: visible;
		}
	}
`;
export const TradeViewStyle = styled.div`
	position: relative;
	visibility: hidden;
	&.loaded{
        visibility: visible;
    }
`;
