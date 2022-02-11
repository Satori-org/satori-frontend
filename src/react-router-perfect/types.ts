export type IRouteState =  {data: any, title: string, url?: string | null}

export type LazyComponent = () => Promise<any>;
export type ReactComponent = React.ComponentClass<any, any> | React.ComponentType<any>;
export interface Iroutes {
    path:string
    component?: ReactComponent | LazyComponent
    exact?:boolean
    render?():  ReactComponent | LazyComponent
    beforeRender?(): void
    meta?: any
}
