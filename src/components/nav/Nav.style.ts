import styled from "styled-components";
import nav_bg from 'src/assets/images/nav_bg_1.png';
import {colors} from "../../styles/style";

export const NavStyle = styled.nav`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 84px;
    background: url(${(props: {bgImg: string}) => {
        return props.bgImg;
    }});
    background-size: 100% 100%;
    z-index: 2000;
    backdrop-filter: blur(20px);
    .navItem{
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        text-align: center;
        flex-direction: column;
        .icon{
            height: 20px;
            margin-bottom: 3px;
        }
    }
    .text{
        &.active{
            color: #fff;
        }
    }
`;
