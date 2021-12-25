import React from 'react';
import { notification } from 'antd';
import {colors} from "src/styles/style";
import styled from "styled-components";

export enum MsgType {
    Info,
    Warn,
    Err
}

function ext(type: MsgType) {
    switch (type) {
        case MsgType.Info:
            return "Info";
        case MsgType.Warn:
            return "Warn";
        case MsgType.Err:
            return "Error";
    }
}

const Title = styled.h1`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
`;
/*const success = require("src/assets/images/success.png");
const fail = require("src/assets/images/fail.png");*/

export default function MsgNotification(type: MsgType, msg: string) {
    notification.open({
        message: <Title className={"flex-row"}>
            {/*<img src={type === MsgType.Info ? success :  fail} style={{width: "26px", marginRight: "10px"}} alt="" />*/}
            <p>{ext(type)}</p>
        </Title>,
        description: <div>

        </div>,
        onClick: () => {
            console.log('Notification Clicked!');
        },
        closeIcon: <img src={require("src/assets/images/close.png")} style={{width: "16px"}} alt="" />,
        style: {borderRadius: "14px"}
    })

}
