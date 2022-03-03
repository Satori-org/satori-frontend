import React from 'react';
import './App.css';
import './assets/css/animate.css';
import RouterView from "./router/RouterView";
import {AppStyle} from "./styles/App.style";
import connect, {IConnectProps} from "./store/connect";
import {ethers} from "ethers";
import {withTranslation, WithTranslation} from "react-i18next";
import Header from "./components/header/Header";
import {generateNonce, getUserToken} from "./ajax/auth/auth";
import {signString} from "./contract/wallet";
import {ThemeProviderWrapper} from "./ThemeProviderWrapper";
import {awaitWrap, showMessage} from "./common/utilTools";

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
        /*plusReady(() => {
            this.addEventListener();
        });*/
        this.checkLoginStatus();
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.redux.wallet_info?.plugin && prevProps.redux.wallet_info?.plugin !== this.props.redux.wallet_info?.plugin) {
            // @ts-ignore
            this.removeListener(window[prevProps.redux.wallet_info?.plugin]);
        }
        if (this.props.redux.wallet_info?.plugin && prevProps.redux.wallet_info?.plugin !== this.props.redux.wallet_info?.plugin) {
            this.addEventListener();
        }
        /*if (!prevProps.redux.address && this.props.redux.address) {
            this.checkLoginStatus();
        }*/
    }

    addEventListener() {
        // @ts-ignore
        let provider = window[this.props.redux.wallet_info?.plugin];
        let ethersProvider = new ethers.providers.Web3Provider(provider);
        ethersProvider.getNetwork().then((res:any) => {
            this.checkNetwork(res.chainId);
        });
        provider.on('chainChanged',  (accounts:any) => {
            console.log(accounts);
            console.log(parseInt(accounts, 16));
            let chainID = parseInt(accounts, 16);
            this.checkNetwork(chainID);
        });
        provider.on('accountsChanged',  (accounts:string[]) => {
            if (accounts && accounts[0]) {
                const address = accounts[0];
                this.logout();
                if (this.props.redux.address) {
                    this.getGenerateNonce(address);
                }
                this.props.setWalletAddress(address);
            }
        });
    }

    removeListener(provider: any) {
        if (provider) {
            provider.removeAllListeners();
        }
    }

    checkNetwork(ID:number) {
        if (ID !== this.props.redux.network.project.chainid) {
            showMessage(this.props.t(`Please connect to the correct network`));
        }
    }

    checkLoginStatus() {
        let token = sessionStorage.getItem("token");
        if (this.props.redux.address && !token) {
            this.getGenerateNonce(this.props.redux.address);
        }
    }

    async getGenerateNonce(address: string) {
        if (!address) {
            return ;
        }
        // @ts-ignore
        const provider = window[this.props.redux.wallet_info?.plugin];
        const [nonceInfo, error] = await awaitWrap(generateNonce(address));
        if (nonceInfo) {
            const [signData, error2] = await awaitWrap(signString(nonceInfo.data.nonce, address, provider));
            if (signData) {
                this.login(address, signData.signatrue);
            }
        }
        /*const nonceInfo = await generateNonce(address);
        const signStr = await getWallet().signMessage(nonceInfo.data.nonce);
        this.login(address, signStr);*/
    }

    async login(address: string, signStr: string) {
        const userInfo = await getUserToken(address, signStr);
        this.props.setToken(userInfo.data);
    }

    logout() {
        this.props.setToken("");
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <ThemeProviderWrapper>
                <AppStyle className="App font12">
                    <Header />
                    <RouterView></RouterView>
                </AppStyle>
            </ThemeProviderWrapper>
        );
    }
}

export default withTranslation()(connect(App));
