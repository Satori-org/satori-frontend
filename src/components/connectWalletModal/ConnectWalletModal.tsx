import React, {CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {ConnectButton, ConnectWalletModalStyle, Process, StepBox, Subtitle, Title} from './ConnectWalletModal.style';
import Modal from "../modal/Modal";
import Web3 from "web3";
import {PROVIDER} from "../../config";
import {useWallet} from "use-wallet";
import {useStore} from "react-redux";
import {IState} from "../../store/reducer";
import {mapDispatchToProps} from "../../store/connect";
import {generateNonce, getUserToken} from "../../ajax/auth/auth";
import {getWallet} from "../../contract/wallet";
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";
import Spin from "../Spin/Spin";
import {awaitWrap} from "../../common/utilTools";

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
    const state = useEffectState({
        stepNum: 1,
        loading: false
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

    function connectWallet() {
        let web3js = new Web3(PROVIDER);//web3js is the web3 example you need
        web3js.eth.getAccounts(function (error, result) {
            /* alert(result[0]);*/
            if (result.length !== 0) {
                dispatch.setWalletAddress(result[0]);
            } else {
                connect('injected')
            }

            if (!error)
                console.log(result)//After successful authorization, result can get the account normally
        });
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
            const [signStr, error] = await awaitWrap(getWallet().signMessage(nonceInfo.data.nonce));
            if (signStr) {
                login(address, signStr);
            } else {
                state.loading = false;
            }
        } else {
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

    return (
        <ConnectWalletModalStyle onClick={props.onClose}>
            <div className={"connectWaaletContent"} onClick={(event) => {event.stopPropagation()}}>
                <Title>{t(`Connect wallet`)}</Title>
                <Subtitle>{t(`You will receive two signature requests.Signing is free and will not send a transaction.`)}</Subtitle>
                <StepBox className={`${state.stepNum === 1 ?'active':''}`}>
                    <div className={"flex-row"}>
                        <div className={"mark flex-row"}>
                            <div className={"step flex-box"} id={"step1"} ref={step1Ref}>
                                <Toggle vIf={state.stepNum === 1}>
                                    <span>1</span>
                                    <img src={require("src/assets/images/icon_connectwallet_step2_ok.png")} style={{width: "100%"}} alt=""/>
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
                            <div className={"step flex-box"} id={"step2"} ref={step2Ref} style={{border: "none"}}>
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
        </ConnectWalletModalStyle>
    )
}
