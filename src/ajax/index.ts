import {useState, useEffect, useCallback} from 'react';
import {axios} from './axios';
import IAjax, {IResArr} from './types';
import {awaitWrap, stringify} from 'src/common/utilTools';
export interface reqConfig {
    postType?: string,
    headers?: any
}

export function fetchPost<R extends Object>(url:string, data = {}, config:reqConfig = {}):Promise<IAjax<R>> {
    if (data instanceof FormData) {
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

export function useFetchPost<T>(url: string, params = {}, require: any[] = []) {
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    const reload = useCallback(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    async function loadData() {
        if (require.every((item) => !!item)) {
            setLoading(true);
            const [res, error] = await awaitWrap(fetchPost<T>(url, params));
            if (res) {
                setData(res.data);
            }
            setLoading(false);
        }
    }

    return {data, loading, reload};
}

export function useFetchPostPage<T>(url: string, params = {}, require: any[] = []) {
    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    const reload = useCallback(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    async function loadData() {
        if (require.every((item) => !!item)) {
            setLoading(true);
            let res: IAjax<IResArr<T>>;
            let error: any;
            [res, error] = await awaitWrap(fetchPost<IResArr<T>>(url, params));
            if (res) {
                setData(res.data.records);
                setTotal(res.data.total);
            }
            setLoading(false);
        }
    }

    return {data, loading, total, reload};
}

export function useFetchPostArr<T>(url: string, params = {}, require: any[] = []) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    const reload = useCallback(() => {
        loadData();
    }, [...Object.values(params).concat(require)]);

    async function loadData() {
        if (require.every((item) => !!item)) {
            setLoading(true);
            let res: IAjax<T[]>;
            let error: any;
            [res, error] = await awaitWrap(fetchPost<T[]>(url, params));
            if (res) {
                setData(res.data);
            }
            setLoading(false);
        }
    }

    return {data, loading, reload};
}
