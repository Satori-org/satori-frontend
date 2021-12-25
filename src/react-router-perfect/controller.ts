import {Iroutes, LazyComponent} from "./types";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import {buildSearch, checkMatchModel, getRouteParams} from "./tools";

const history = window.history;
const location = window.location;

export type IRouteParams = {pathname: string, params?: Object, query?: Object};
class Controller {
    params: any = {};
    query: any = {};
    match: any = {};
    pathname = "/";
    hashModel = false;
    routes: Iroutes[] = [];
    showProgress = true;
    cacheKey = "routeData";
    constructor() {
        // this.getRouteData();
    }

    getRouteData() {
        let searchData = getRouteParams(location.search);
        let hashArr = /[^?](\?.+)$/g.exec(location.hash);
        let hashDataStr = (hashArr && hashArr[1]) || "";
        let hashData = getRouteParams(hashDataStr);
        this.query = Object.assign({}, hashData, searchData);
        let cacheStr = history.state;
        if (cacheStr) {
            this.params = JSON.parse(cacheStr);
        }
        this.buildMatchParams();
        return {query: this.query, params: this.params};
    }

    async push(data: IRouteParams, disabledProgress?: boolean) {
        this.resetRouteParams();
        this.handle(data, (pathname, routeData) => {
            history.pushState(routeData, "", pathname);
            //window.onPushState();
            let event = document.createEvent("HTMLEvents");
            //
            event.initEvent("pushState", false, true);
            // 触发自义事件
            window.dispatchEvent(event);
        }, disabledProgress)
    }
    async replace(data: IRouteParams) {
        this.resetRouteParams();
        this.handle(data, (pathname,routeData) => {
            history.replaceState(routeData, "", pathname);
        })
    }
    private async handle(data: IRouteParams, callback: (pathname: string, routeData: string) => void, disabledProgress?: boolean) {
        await this.loadComponent(data.pathname, disabledProgress);
        //this.resetRouteParams();
        let pathname = data.pathname;
        if (data.query) {
            this.query = data.query;
            let str = buildSearch(data.query);
            pathname = `${pathname}?${str}`
        }
        if (data.params) {
            this.params = data.params;
            //sessionStorage.setItem(this.cacheKey, JSON.stringify(data.params));
        }
        this.buildMatchParams();
        if (this.hashModel) {
            location.hash = pathname;
        } else {
            //history.pushState("", "", pathname);
            callback(pathname, JSON.stringify(this.params));
        }
    }
    loadComponent(browserPath:string, disabledProgress?: boolean) {
        return new Promise((resolve) => {
            this.routes.forEach((item) => {
                let isMatch = item.path === browserPath || (!item.exact && browserPath.indexOf(item.path) === 0);
                /* :xxx  */
                let { isMatchModel } = checkMatchModel(item.path, browserPath);
                if (isMatch || isMatchModel) {
                    if (this.showProgress && !disabledProgress) {
                        NProgress.configure({ showSpinner: false,trickleSpeed:100});
                        NProgress.start();
                    }
                    (item.component as LazyComponent)().then(() => {
                        this.showProgress && NProgress.done();
                        resolve("");
                    });
                }
            });
        });
    }

    buildMatchParams() {
        let pathname = location.pathname;
        this.routes.some((item) => {
            let {keys, values, isMatchModel} = checkMatchModel(item.path, pathname);
            if (!isMatchModel || !keys || !values) {
                return false;
            }
            keys.forEach((item, index) => {
                this.match[item] = values![index];
            });
            return true;
        })
    }

    goback() {
        history.back();
    }
    forward() {
        history.forward();
    }
    go(step: number) {
        history.go(step);
    }
    resetRouteParams() {
        //sessionStorage.removeItem(this.cacheKey);
        this.params = {};
    }
}

export default new Controller();
