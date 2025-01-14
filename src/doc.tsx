import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { store } from './store';
import 'src/locales/i18n';
import { UseWalletProvider } from 'use-wallet';
import AppDoc from './AppDoc';

ReactDOM.render(
    <Provider store={store}>
        <UseWalletProvider chainId={store.getState().network.project.chainid}>
            <AppDoc  />
        </UseWalletProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
