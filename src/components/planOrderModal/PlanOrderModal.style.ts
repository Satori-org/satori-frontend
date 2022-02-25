import styled from "styled-components";

export const PlanOrderModalStyle = styled.div`
    
`;

export const PlanFieldStyle = styled.div`
    display: flex;
`;

export const FieldGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.24rem;
    font-size: 0.12rem;
    line-height: 0.16rem;
    color: ${({theme}) => theme.colors.baseColor};
    .label{
        color: #57625C;
    }
    .long{
        color: ${({theme}) => theme.colors.long};
    }
`;

export const DropDown = styled.div`
    position: relative;
    background: ${({theme}) => theme.colors.inputBgColor};
    border-radius: 0.08rem;
    margin-left: 0.08rem;
    padding: 0 0.12rem;
    color: ${({theme}) => theme.colors.labelColor};
    cursor:pointer;
    .arrow{
        width: 0.08rem;
        height: 0.0494rem;
        margin-left: 0.04rem;
    }
    .container{
        position: absolute;
        padding-top: 0.04rem;
    }
    .panel{
        border-radius: 0.08rem;
    }
`;

export const DropMenuContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 100%;
    z-index: 100;
    padding-top: 0.04rem;
`;

export const DropMenu = styled.ul`
    list-style: none;
    text-align: center;
    color: ${({theme}) => theme.colors.baseColor};
    background: ${({theme}) => theme.colors.boxBgColor};
    //border: 1px solid ${({theme}) => theme.colors.borderColor};
    box-sizing: border-box;
    border-radius: 0.08rem;
    overflow: hidden;
    .menuItem{
        height: 0.36rem;
        &.exit{
            color: ${({theme}) => theme.colors.short};
        }
        &:hover{
            background: rgba(255, 255, 255, 0.04);
        }
    }
`;


export const ExplainText = styled.div`
    font-size: 0.12rem;
    color: #57625C;
    line-height: 0.16rem;
    margin-top: 0.04rem;
    .value{
        color: ${({theme}) => theme.colors.baseColor};
    }
`;
