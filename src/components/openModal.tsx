import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store";
import {ThemeProviderWrapper} from "../ThemeProviderWrapper";
import React, {ComponentType} from "react";

export interface IOpenModal {
    destoryComponent(): void
}

export default function openModal<T>(ModalComponent: ComponentType<T & IOpenModal>, params: T) {
    let modalBox = document.createElement("div");
    document.body.appendChild(modalBox);
    const destoryComponent = () => {
        if (modalBox) {
            ReactDOM.unmountComponentAtNode(modalBox);
        }
        return;
    };
    ReactDOM.render( <Provider store={store}>
        <ThemeProviderWrapper>
            <ModalComponent destoryComponent={destoryComponent} {...params} />
        </ThemeProviderWrapper>
    </Provider>, modalBox);
}
