import styled from "styled-components";

export const SettlementModalStyle = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 100;
    flex-direction: column;
    line-height: 20px;
    background: rgba(32,37,49,0.6);
    backdrop-filter: blur(8px);
    .icon{
        width: 34px;
        height: 34px;
        margin-bottom: 2px;
    }
`;
