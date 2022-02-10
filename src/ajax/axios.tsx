import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import IAjax from './types';
import {Toast} from 'src/components/toast/Toast';
import { service_api } from 'src/config';
import { store } from 'src/store';
import { $router } from 'src/react-router-perfect/Index';
import PubSub from "pubsub-js";
import OpenMessageBox from "../components/messageBox/MessageBox";
import {showMessage} from "../common/utilTools";

axios.defaults.baseURL = service_api;
//=>Set the request header
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30*1000;
interface myConfig extends AxiosRequestConfig {
    userConfig?:any
}
// =>Setting up request interceptors
axios.interceptors.request.use((config:myConfig) => {
        if (config.headers && config.headers.common) {
            let token = sessionStorage.getItem('token') || "";
            if (token) {
                config.headers.common['Authorization'] = token;
            }
            let language = $router.query.lang || store.getState().lang;
            config.headers.common['Accept-Language'] = language.replace("_", "-");
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// =>Setting up response interceptors
axios.interceptors.response.use((response:AxiosResponse<IAjax>):Promise<any> => {
        if (response.status === 200) {
            if (response.data) {
                if (response.data.error) {
                    showMessage(response.data.msg);
                    /*token expiration exit*/
                    if (response.data.code === 4003) {
                        PubSub.publish("wallet.logout");
                    }
                    return Promise.reject(response.data);
                } else {
                    return Promise.resolve(response.data);
                }
            } else {
                return Promise.reject("server error!")
            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        showMessage(error.toString());
        return Promise.reject(error);
    }
);

export  {
    axios
}
