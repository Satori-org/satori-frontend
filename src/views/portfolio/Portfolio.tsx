import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from './Nav';
import { PortfolioStyle } from './styles/Portfolio.style';
import {routes} from "../../router/portfolioRoute";
import {LazyComponent} from "../../react-router-perfect/types";
import Switch from "../../react-router-perfect/Switch";
import Redirect from "../../react-router-perfect/Redirect";
import Footer from './Footer';

export default function Portfolio() {
    const {t} = useTranslation();

    return (
        <PortfolioStyle>
            <div className="left">
                <Nav />
            </div>
            <div className="right">
                <div style={{flex: 1}}>
                    <Switch>
                        {
                            routes.map((item) => {
                                // let Component = item.isLazy ? React.lazy(item.component as LazyComponent) : item.component;
                                let Component = React.lazy(item.component as LazyComponent);
                                // @ts-ignore
                                return <Component path={item.path} key={item.path} exact={item.exact} beforeRender={item.beforeRender}></Component>
                            })
                        }
                        <Redirect to={routes[0].path} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </PortfolioStyle>
    )
}
