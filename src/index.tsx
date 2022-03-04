import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { store } from './store';
import 'src/locales/i18n';
import { UseWalletProvider } from 'use-wallet';
import { Decimal } from 'decimal.js';

Decimal.set({
    precision: 30
})

ReactDOM.render(
    <Provider store={store}>
        <App  />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
