import React from 'react';
import './App.css';
import './assets/css/animate.css';
import connect, {IConnectProps} from "./store/connect";
import {withTranslation, WithTranslation} from "react-i18next";
import Header from "./views/help/header/Header";
import {AppDocStyle, ContentBox, NavContainer} from "./styles/AppDoc.style";
import HelpRouterView from "./router/HelpRouterView";
import DocMenu from "./views/help/DocMenu";

interface IProps extends IConnectProps, WithTranslation{

}
class AppDoc extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            showNav: false
        }
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <AppDocStyle className="App">
                <Header></Header>
                <div className={"container"}>
                    <ContentBox>
                        <DocMenu />
                        <HelpRouterView />
                    </ContentBox>
                </div>
            </AppDocStyle>
        );
    }
}

export default withTranslation()(connect(AppDoc));
