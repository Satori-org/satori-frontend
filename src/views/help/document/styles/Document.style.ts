import styled from "styled-components";

export const DocumentStyle = styled.div`
    padding: 24px 40px;
    background: #FFFFFF;
    flex: 1;
`;

export const Group = styled.div`
    width: 855px;
    .list{
        margin-bottom: 30px;
        .listItem{
            border-bottom: 1px solid #ECECEC;
            padding-top: 16px;
            padding-bottom: 8px;
            cursor:pointer;
            .title{
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 6px;
            }
            .time{
                font-size: 14px;
                font-weight: 400;
                color: #74777F;
            }
        }
        
    }
`;

export const Title = styled.h3`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;
