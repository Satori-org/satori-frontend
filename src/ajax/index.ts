import {useState, useEffect} from 'react';
import {axios} from './axios';
import IAjax from './types';
import { stringify } from 'src/common/utilTools';
const qs = require('qs');
export interface reqConfig {
    postType?: string,
    headers?: any
}

export function fetchPost<R extends Object>(url:string, data = {}, config:reqConfig = {}):Promise<IAjax<R>> {
    if (data instanceof FormData) {     //Currently used to upload pictures
        return axios.post(url, data, config);
    } else {
        if (!config.headers) {
            config.headers = {};
        }
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        }
        return axios.post(url, JSON.stringify(data), config);
    }
}

export function fetchGet<R extends Object>(url:string, data?:object, config?:object):Promise<IAjax<R>> {
    let reqURL = data?`${url}?${stringify(data)}`:url;
    return axios.get(reqURL, config);
}

interface IusePost {
    url:string,
    params?:Object,
    config?:Object,
    depend?:any[]
}
export function usePostArr<R>(params:IusePost):{data: R[],loading:boolean,error:string,total:number} {
    const [data, setData] = useState<R[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            setLoading(true);
            let {data, success, message} = await fetchPost<R[]>(params.url, params.params, params.config);
            setData(data);
            setLoading(false);
            setTotal(total);
            if (!success) {
                setError(message)
            }
        })();
    },[...Object.values(params.depend || params.params || [])]);

    return {data, loading, error, total};
}


export function usePost<R>(params:IusePost):{data: R,loading:boolean,error:string,total:number} {
    const [data, setData] = useState<R>({} as R);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            setLoading(true);
            let {data, success, message} = await fetchPost<R>(params.url, params.params, params.config);
            setData(data);
            setLoading(false);
            setTotal(total);
            if (!success) {
                setError(message)
            }
        })();
    },[...Object.values(params.depend || params.params || [])]);

    return {data, loading, error, total};
}
