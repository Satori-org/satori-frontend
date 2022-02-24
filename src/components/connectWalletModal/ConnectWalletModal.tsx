import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
    ConnectButton,
    ConnectWalletModalStyle,
    Process,
    StepBox,
    Subtitle,
    Title,
    WalletBox,
    WalletList
} from './ConnectWalletModal.style';
import {useWallet} from "use-wallet";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {mapDispatchToProps} from "../../store/connect";
import {generateNonce, getUserToken} from "../../ajax/auth/auth";
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";
import Spin from "../Spin/Spin";
import {awaitWrap, showMessage} from "../../common/utilTools";
import useTheme from "../../hooks/useTheme";
import Modal from '../modal/Modal';
import {usePluginModel} from "../../hooks/usePluginModel";
import {IWallet} from "../../contract/config";

type IProps = {
    onClose(): void
    onSuccess(): void
}
export default function ConnectWalletModal(props: IProps) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const { account, connect, reset } = useWallet();
    const step1Ref = useRef<HTMLDivElement | null>(null);
    const step2Ref = useRef<HTMLDivElement | null>(null);
    const [processStyle, setProcessStyle] = useState<CSSProperties>({});
    const { theme } = useTheme();
    const { signString, Provider } = usePluginModel();
    const state = useEffectState({
        stepNum: 1,
        loading: false,
        chain: ""
    });

    useEffect(() => {
        getProcessStyle();
    }, [step1Ref]);
    useEffect(() => {
        if (account) {
            dispatch.setWalletAddress(account);
        }
    }, [account]);
    useEffect(() => {
        getGenerateNonce(storeData.address);
    }, [storeData.address]);

    function getProcessStyle() {
        if (step1Ref.current && step2Ref.current) {
            const _top = step1Ref.current!.offsetTop + step1Ref.current!.offsetHeight + "px";
            const height = step2Ref.current!.offsetTop - step1Ref.current!.offsetTop - step1Ref.current!.offsetHeight + "px";
            const left = step1Ref.current!.offsetLeft + step1Ref.current!.offsetWidth/2;
            setProcessStyle({top: _top, left, height});
        }
    }

    async function connectWallet() {
        console.log(Provider)
        const accounts = await Provider.request({ method: 'eth_requestAccounts' });
        console.log('accounts:', accounts);
        dispatch.setWalletAddress(accounts[0]);
        /*let web3js = new Web3(getWalletProvider());//web3js is the web3 example you need
        web3js.eth.getAccounts(function (error, result) {
            /!* alert(result[0]);*!/
            if (result.length !== 0) {
                dispatch.setWalletAddress(result[0]);
            } else {
                connect('injected')
            }

            if (!error)
                console.log(result)//After successful authorization, result can get the account normally
        });*/
    }

    async function getGenerateNonce(address: string) {
        if (!address || state.loading) {
            return ;
        }
        state.stepNum = 2;
        state.loading = true;
        setTimeout(() => {
            getProcessStyle();
        }, 0);
        const [nonceInfo, error] = await awaitWrap(generateNonce(address));
        if (nonceInfo) {
            const [signData, error] = await awaitWrap(signString(nonceInfo.data.nonce, storeData.address));
            if (signData) {
                login(storeData.address, signData.signatrue);
            } else {
                console.error(error);
                state.loading = false;
            }
            /*let web3Provider = new Web3(getWalletProvider());
            web3Provider.eth.personal.sign(nonceInfo.data.nonce, storeData.address, "", (err: any, res: any) => {
                if (!err) {
                    login(storeData.address, res);
                } else {
                    state.loading = false;
                }
            })*/
            /*let walletProvider = getWallet();
            console.log(walletProvider)
            walletProvider.signMessage(nonceInfo.data.nonce).then((res) => {
                console.log("message", res);
            }).catch((error3) => {
                console.log(error3)
            })*/
            /*const [signStr, error2] = await awaitWrap(getWallet().signMessage(nonceInfo.data.nonce));
            console.log("==2", signStr, error2)
            if (signStr) {
                login(address, signStr);
            } else {
                console.log("error2", error2)
                state.loading = false;
            }*/
        } else {
            console.log("error", error)
            state.loading = false;
        }
    }

    async function login(address: string, signStr: string) {
        const [userInfo, error] = await awaitWrap(getUserToken(address, signStr));
        if (userInfo) {
            dispatch.setToken(userInfo.data);
            props.onSuccess();
            state.stepNum = 1;
        }
        state.loading = false;
    }

    function onSelect(wallet_info: IWallet) {
        // @ts-ignore
        if (!window[wallet_info.plugin]) {
            showMessage(t(`No Plugin was found`));
            return;
        }
        dispatch.setWallet(wallet_info)
    }

    return (
        <Modal title={t(`Connect Wallet`)} handleClick={props.onClose}>
            <Toggle vIf={!!storeData.wallet_info}>
                <div>
                    <Subtitle>{t(`You will receive two signature requests.Signing is free and will not send a transaction.`)}</Subtitle>
                    <StepBox className={`${state.stepNum === 1 ?'active':''}`}>
                        <div className={"flex-row"}>
                            <div className={"mark flex-row"}>
                                <div className={"step flex-box"} id={"step1"} ref={step1Ref}>
                                    <Toggle vIf={state.stepNum === 1}>
                                        <span>1</span>
                                        <img src={require("src/assets/images/dark/ok.png")} style={{width: "0.12rem", height: "0.1rem"}} alt=""/>
                                    </Toggle>
                                </div>
                            </div>
                            <span className={"step-title"}>{t(`Verify ownership`)}</span>
                        </div>
                        <div className={"explain"}>{t(`Confirm you are the owner of this wallet.`)}</div>
                    </StepBox>
                    <Process style={processStyle} />
                    <StepBox className={`${state.stepNum === 2 ?'active':''}`} style={{marginTop: "28px"}}>
                        <div className={"flex-row"}>
                            <div className={"mark flex-row"}>
                                <div className={"step flex-box"} id={"step2"} ref={step2Ref} style={state.stepNum === 2 ?{background: theme.colors.baseColor}:{}}>
                                    <Toggle vIf={state.stepNum === 1}>
                                        <span>2</span>
                                        <img src={require("src/assets/images/icon_connectwallet_step2_refresh.png")}
                                             style={{width: "100%", cursor: "pointer"}}
                                             alt=""
                                             onClick={() => getGenerateNonce(storeData.address)}/>
                                    </Toggle>
                                </div>
                            </div>
                            <span className={"step-title"}>{t(`Verify ownership`)}</span>
                        </div>
                        <div className={"explain"}>{t(`Confirm you are the owner of this wallet.`)}</div>
                    </StepBox>
                    <ConnectButton className={"flex-box"} onClick={() => {
                        connectWallet();
                    }}>
                        <Toggle vIf={state.loading}>
                            <Spin />
                            <span>{t(`Send requests`)}</span>
                        </Toggle>
                    </ConnectButton>
                </div>
                <WalletList>
                    {
                        storeData.network.wallet.map((item, index) => {
                            return <WalletBox key={item.name} onClick={() => onSelect(item)}>
                                <img src={item.icon} className={"icon"} alt=""/>
                                <span>{item.name}</span>
                            </WalletBox>
                        })
                    }
                    {/*<WalletBox style={{marginRight: "0.15rem"}}>
                        <img src={require("src/assets/images/MetaMask.png")} className={"icon"} alt=""/>
                        <span>{t(`MetaMask`)}</span>
                    </WalletBox>
                    <WalletBox>
                        <img src={require("src/assets/images/Polkadot.png")} className={"icon"} alt=""/>
                        <span>{t(`Polkadot js`)}</span>
                    </WalletBox>
                    <WalletBox>
                        <img src={require("src/assets/images/clover.png")} className={"icon"} alt=""/>
                        <span>{t(`Clover Wallet`)}</span>
                    </WalletBox>*/}
                </WalletList>
            </Toggle>
        </Modal>
    )
}
