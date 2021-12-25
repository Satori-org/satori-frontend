import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import IAjax from './types';
import {Toast} from 'src/components/toast/Toast';
import { service_api } from 'src/config';
import { store } from 'src/store';
import { $router } from 'src/react-router-perfect/Index';
//Pre-release environment
axios.defaults.baseURL = service_api;
//=>Set the request header
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30*1000;
interface myConfig extends AxiosRequestConfig {
    userConfig?:any
}
// =>Set up the request interceptor
axios.interceptors.request.use((config:myConfig) => {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || "{}");
        let showLoading = true;
        if (config.headers && config.headers.common) {
            let token = userInfo.token || sessionStorage.getItem('token');
            if (token) {
                config.headers.common['token'] = token;
            }
            let language = $router.query.lang || store.getState().lang;
            config.headers.common['Accept-Language'] = language.replace("_", "-");
        }

        if (config.userConfig && config.userConfig.showLoading === false) {
            showLoading = false;
        }
        //Loading multiple times will cause an error
        if (showLoading && document.getElementsByClassName('loading-box').length === 0) {
            /*loadingInstance = Loading.loading({
                text: config.userConfig && config.userConfig.loadText || 'loading...'
            });*/
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// =>Set up the response interceptor
axios.interceptors.response.use((response:AxiosResponse<IAjax>):Promise<any> => {
        if (response.status === 200) {
            if (response.data && !response.data.success) {
                Toast(response.data.message);
                /*Log back in*/
                if (response.data.code === 3) {
                    /*let dispatchData = mapDispatchToProps(store.dispatch);
                    dispatchData.clearnLoginStatus();*/
                }
                return Promise.reject(response.data);
            }
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        Toast(error.toString());
        return Promise.reject(error);
    }
);

export  {
    axios
}
