import styled from "styled-components";

export const SearchBoxStyle = styled.div`
	display: flex;
	align-items: center;
	min-width: 180px;
	height: 36px;
	position: relative;
	//border: 1px solid rgba(242,242,247,1);
	background-color: #EDEDED;
	border-radius: 18px;
	color: #333;
	padding-left: 24px;
	box-sizing: border-box;
	/*&.active{
		border: 1px solid $activeColor;
	}*/
	.searchText{
		background-color: transparent;
		height: 100%;
		width: 100%;
		border: none;
		font-size: 12px;
		box-sizing: border-box;
		/*padding-top: 4px;*/
		padding-left: 6px;
		line-height: 32px;
		outline: none;
		&::-webkit-input-placeholder{
			color: #999;
		}
		&::-moz-input-placeholder{
			color: #999;
		}
		&::-ms-input-placeholder{
			color: #999;
		}
	}
	.clearIcon{
		width: 12px;
		cursor: pointer;
	}
	.searchIcon{
		width: 24px;
		height: 24px;
	}
`;
