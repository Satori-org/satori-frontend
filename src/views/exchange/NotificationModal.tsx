import React, {CSSProperties, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {List, NotificationContent, NotificationModalStyle, Title} from './styles/NotificationModal.style';
import ReactDOM from "react-dom";
import {useEffectState} from "../../hooks/useEffectState";
import { CSSTransition } from 'react-transition-group';


interface INotification {
    className?: string,
    style?: CSSProperties,
    destoryComponent():void,
}
function NotificationModal(props: INotification) {
    const {t} = useTranslation();
    const state = useEffectState({
       active: false
    });

    useEffect(() => {
        state.active = true;
    }, []);

    const list = [
        {icon: require("src/assets/images/n_buy.png"), title: t(`Deposit`), content: t(`300.00BNB has been successfully depositted.`), createTime: "2021-11-22 23:00:00"},
        {icon: require("src/assets/images/n_sell.png"), title: t(`Deposit`), content: t(`300.00BNB has been successfully depositted.`), createTime: "2021-11-22 23:00:00"}
    ];

    return (
        <NotificationModalStyle onClick={() => {
            state.active = false;

        }}>
            <CSSTransition in={state.active} timeout={200} classNames={"my-slider-right"} unmountOnExit onExited={() => {
                props.destoryComponent();
            }}>
                <NotificationContent>
                    <Title>{t(`Notifications`)}</Title>
                    <List>
                        {
                            list.map((item, index) => {
                                return <div className={"item"} key={index}>
                                    <div className={"flex-row itemTitle"}>
                                        <img src={item.icon} className={"titleIcon"} alt="" />
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={"content"}>{item.content} </div>
                                    <div className={"time"}>{item.createTime}</div>
                                </div>
                            })
                        }
                    </List>
                </NotificationContent>
            </CSSTransition>
        </NotificationModalStyle>
    )
}


export default function OpenNotificationModal() {
    let id = "notification-box";
    let toastBox = document.getElementById(id);
    if (!toastBox) {
        toastBox = document.createElement("div");
        toastBox.id = id;
        document.body.appendChild(toastBox);
    }
    const destoryComponent = () => {
        if (toastBox) {
            ReactDOM.unmountComponentAtNode(toastBox);
        }
    };
    ReactDOM.render(<NotificationModal destoryComponent={destoryComponent}></NotificationModal>, toastBox);
}
