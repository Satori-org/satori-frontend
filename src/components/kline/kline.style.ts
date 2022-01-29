import styled from "styled-components";

export const KlineBox = styled.div`
	height: 596px;
	position: relative;
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
