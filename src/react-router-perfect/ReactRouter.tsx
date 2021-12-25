import React, {Suspense, useEffect} from 'react';
import {Iroutes, LazyComponent} from './types';
import $router from './controller';
import Switch from 'src/react-router-perfect/Switch';

interface IProps {
    hashModel?: boolean,
    routes: Iroutes[],
    showProgress?: boolean
}

export default function ReactRouter(props: IProps) {
    useEffect(() => {
        initRouteConfig();
    }, [props.hashModel, props.routes.length]);

    function initRouteConfig() {
        $router.hashModel = props.hashModel || false;
        $router.routes = props.routes;
        $router.showProgress = props.showProgress ?? true;
        $router.getRouteData();
    }

    return (
        <Suspense fallback={null}>
            <Switch>
                {
                    props.routes.map((item) => {
                        // let Component = item.isLazy ? React.lazy(item.component as LazyComponent) : item.component;
                        let Component = React.lazy(item.component as LazyComponent);
                        // @ts-ignore
                        return <Component path={item.path} key={item.path} exact={item.exact} beforeRender={item.beforeRender}></Component>
                    })
                }
            </Switch>
        </Suspense>
    )
}
