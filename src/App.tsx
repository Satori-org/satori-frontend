import React from 'react';
import './App.css';
import RouterView from "./router/RouterView";
import {AppStyle} from "./styles/App.style";
import connect, {IConnectProps} from "./store/connect";
import plusReady from "./contract/plusReady";
import {ethers} from "ethers";
import {chainID} from "./contract/config";
import {Toast} from "./components/toast/Toast";
import {withTranslation, WithTranslation} from "react-i18next";
import {PROVIDER} from "./config";
import Header from "./components/header/Header";

interface IProps extends IConnectProps, WithTranslation{

}
class App extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            showNav: false
        }
    }

    componentDidMount(): void {
        plusReady(() => {
            this.addEventListener();
        })
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any): void {

    }

    addEventListener() {
        let ethersProvider = new ethers.providers.Web3Provider(PROVIDER);
        ethersProvider.getNetwork().then((res:any) => {
            this.checkNetwork(res.chainId);
        });
        window['ethereum'].on('chainChanged',  (accounts:any) => {
            console.log(accounts);
            console.log(parseInt(accounts, 16));
            let chainID = parseInt(accounts, 16);
            this.checkNetwork(chainID);
        });
        window['ethereum'].on('accountsChanged',  (accounts:string[]) => {
            if (accounts && accounts[0]) {
                this.props.setWalletAddress(accounts[0]);
            }
        });
    }

    checkNetwork(ID:number) {
        if (ID !== chainID) {
            Toast(this.props.t(`Please connect to the correct network`));
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <AppStyle className="App">
                <Header />
                <RouterView></RouterView>
            </AppStyle>
        );
    }
}

export default withTranslation()(connect(App));
