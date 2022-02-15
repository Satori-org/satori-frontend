import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import Nav from './Nav';
import { PortfolioStyle } from './styles/Portfolio.style';
import {routes} from "../../router/portfolioRoute";
import {LazyComponent} from "../../react-router-perfect/types";
import Switch from "../../react-router-perfect/Switch";
import Redirect from "../../react-router-perfect/Redirect";
import Footer from './Footer';
import {$router, useRouteChange} from "../../react-router-perfect/Index";

export default function Portfolio() {
    const {t} = useTranslation();
    const { meta } = useRouteChange();
    return (
        <PortfolioStyle>
            {/*<div className="left">
                <Nav />
            </div>*/}
            <div className="container">
                <h2 className={"title"}>{t(meta.title)}</h2>
                <div className={"content"}>
                    <Nav />
                    <div style={{flex: 1}}>
                        <Switch>
                            {
                                routes.map((item) => {
                                    // let Component = item.isLazy ? React.lazy(item.component as LazyComponent) : item.component;
                                    let Component = React.lazy(item.component as LazyComponent);
                                    // @ts-ignore
                                    return <Component path={item.path} key={item.path} exact={item.exact} beforeRender={item.beforeRender} meta={item.meta}></Component>
                                })
                            }
                            <Redirect to={routes[0].path} />
                        </Switch>
                    </div>
                </div>
                {/*<Footer />*/}
            </div>
        </PortfolioStyle>
    )
}
