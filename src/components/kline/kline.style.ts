import styled from "styled-components";

export const KlineBox = styled.div`
	height: 100%;
	position: relative;
	background: ${({theme}) => theme.colors.boxBgColor};
	border-radius: 0.16rem;
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

export const MyChartStyle = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 50px);
	bottom: 1px;
	z-index: 5;
	padding-bottom: 0;
	background-color: ${({theme}) => theme.colors.backgroundColor};
	visibility: hidden;
	&.active{
		visibility: visible;
	}
`;
