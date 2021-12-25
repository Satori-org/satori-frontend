import React, {CSSProperties, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import{ToastStyle} from './toast.style';

interface IToast {
    message: string,
    duration?: number,
    className?: string,
    style?: CSSProperties,
    destoryComponent?():void,
}

function ToastBox(props:IToast) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            props.destoryComponent && props.destoryComponent();
        }, props.duration || 3000);
    }, []);

    return visible?(
        <ToastStyle className={`flex-box ${props.className || ''}`}
            style={props.style} dangerouslySetInnerHTML={{__html: props.message}}></ToastStyle>
    ):null
}

export const Toast = (msg:IToast|string) => {
    let toastBox = document.getElementById("toast-box");
    if (!toastBox) {
        toastBox = document.createElement("div");
        toastBox.id = "toast-box";
        document.body.appendChild(toastBox);
    }
    const destoryComponent = () => {
        if (toastBox) {
            ReactDOM.unmountComponentAtNode(toastBox);
        }
    };
    ReactDOM.render(typeof msg === "string"?<ToastBox message={msg} destoryComponent={destoryComponent}></ToastBox>:(
        <ToastBox {...msg} destoryComponent={destoryComponent}></ToastBox>
    ), toastBox);
};
