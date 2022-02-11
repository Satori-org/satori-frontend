import React, {CSSProperties, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ConectWalletStyle, DropMenu, DropMenuContainer} from './ConectWallet.style';
import {NewReadContract, NewWriteContract} from "src/contract/wallet";
import {ethers} from "ethers";
import {getWalletProvider} from "src/config";
import {project} from "src/contract/config";
import {formatAddress, getNumberByDecimal, showMessage} from "src/common/utilTools";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import {useWallet} from "use-wallet";
import {mapDispatchToProps} from "src/store/connect";
import PubSub from "pubsub-js";
import ConnectWalletModal from "../connectWalletModal/ConnectWalletModal";
import Toggle from '../toggle/Toggle';
import {useEffectState} from "../../hooks/useEffectState";
import {MsgStatus} from "../../common/enum";
import CopyToClipboard from 'react-copy-to-clipboard';
import {NetworkStyle} from "../network/Network.style";
import {useThemeManager} from "../../hooks/useThemeManager";

type IProp = {
    style?: CSSProperties
}

export default function ConectWallet(props: IProp) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const { account, connect, reset } = useWallet();
    const { isDark } = useThemeManager();
    const state = useEffectState({
        showModal: false,
        showDropMenu: false
    });

    useEffect(() => {
        getBalance();
        const namespace = PubSub.subscribe("wallet.logout", () => {
            disconnect();
        });
        document.addEventListener("click", docOnClick);

        return () => {
            PubSub.unsubscribe(namespace);
            document.removeEventListener("click", docOnClick)
        }
    }, []);

    function docOnClick() {
        state.showDropMenu = false;
    }

    async function getBalance() {
        const USDC = NewReadContract(project.contracts.USDC.address, project.contracts.USDC.abi)
        let balance1 = await USDC.balanceOf(project.contracts.Satori.address);
        let balance2 = await USDC.balanceOf("0xc783df8a850f42e7F7e57013759C285caa701eB6");
        console.log("Satori balance:", getNumberByDecimal(balance1, project.contracts.USDC.decimals))
        console.log("A balance:", getNumberByDecimal(balance2, project.contracts.USDC.decimals))
    }

    async function withdraw() {
        const Satori = NewWriteContract(project.contracts.Satori.address, project.contracts.Satori.abi)
        const amount = "1000000";
        const deadline = 1640054545;
        const [r, v, s] = await sign();
        await Satori.withdraw(amount, deadline, v, r, s)
    }

    async function sign() {
        let ethersProvider = new ethers.providers.Web3Provider(getWalletProvider());
        const domain = [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "verifyingContract", type: "address" },
        ];

        const permit = [
            { name: "signer", type: "address" },
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
            { name: "deadline", type: "uint256" },
        ];

        const domainData = {
            name: "Satori Protocol",
            version: "1",
            verifyingContract: project.contracts.Satori.address
        };
        const signer = "0xc783df8a850f42e7F7e57013759C285caa701eB6";
        const to = "0xc783df8a850f42e7F7e57013759C285caa701eB6";
        const message = {
            signer: signer,
            to: to,
            amount: "1000000",
            deadline: 1650015758
        };

        const data = JSON.stringify({
            types: {
                EIP712Domain: domain,
                Permit: permit,
            },
            domain: domainData,
            primaryType: "Permit",
            message: message
        });
        console.log("data:", data)
        const result = await ethersProvider.send('eth_signTypedData_v4', [signer, data]);
        console.log(result)
        const signature = result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);
        console.log("=================")
        console.log(r)
        console.log(v)
        console.log(s)
        return [r,v,s]
    }

    async function disconnect() {
        dispatch.setWalletAddress("");
        dispatch.setToken("");
        reset();
    }

    return (
        <div>
            <ConectWalletStyle
                className={"borderRadius"}
                style={props.style}
                onMouseOver={() => {
                    if (storeData.address) {
                        state.showDropMenu = true;
                    }
                }}
                onMouseLeave={() => state.showDropMenu = false}
                onClick={(event) => {
                    if (!storeData.address) {
                        state.showModal = true;
                    } else {
                        state.showDropMenu = true;
                        event.stopPropagation();
                    }
                }}>
                <Toggle vIf={!!storeData.address}>
                    <div className={"flex-row"}>
                        <span>{formatAddress(storeData.address)}</span>
                        <img src={isDark ? require("src/assets/images/dark/icon_arrow_down.png") : require("src/assets/images/light/icon_arrow_down.png")} className={"arrow"} alt=""/>
                    </div>
                    <span>{t(`Connect Wallet`)}</span>
                </Toggle>
                <Toggle vIf={state.showDropMenu}>
                    <DropMenuContainer>
                        <DropMenu onClick={(event) => event.stopPropagation()}>
                            <li className="flex-box menuItem">
                                <CopyToClipboard
                                    text={storeData.address}
                                    onCopy={() => {
                                        showMessage(t(`Copy Success`), MsgStatus.success);
                                        state.showDropMenu = false;
                                    }}>
                                    <span>{t(`Copy address`)}</span>
                                </CopyToClipboard>
                            </li>
                            <li className="flex-box menuItem exit"
                                onClick={() => {
                                    disconnect();
                                    showMessage(t(`Wallet Disconnected`), MsgStatus.success);
                                    state.showDropMenu = false;
                                }}
                            >{t(`Disconnect`)}</li>
                        </DropMenu>
                    </DropMenuContainer>
                </Toggle>
            </ConectWalletStyle>
            <Toggle vIf={state.showModal}>
                <ConnectWalletModal
                    onClose={() => state.showModal = false}
                    onSuccess={() => state.showModal = false}></ConnectWalletModal>
            </Toggle>
        </div>

    )
}
