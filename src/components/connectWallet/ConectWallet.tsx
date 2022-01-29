import React, {CSSProperties, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { ConectWalletStyle } from './ConectWallet.style';
import {NewReadContract, NewWriteContract} from "src/contract/wallet";
import {ethers} from "ethers";
import {PROVIDER} from "src/config";
import {project} from "src/contract/config";
import {formatAddress, getNumberByDecimal} from "src/common/utilTools";
import {useStore} from "react-redux";
import {IState} from "src/store/reducer";
import Web3 from "web3";
import {useWallet} from "use-wallet";
import {mapDispatchToProps} from "src/store/connect";
import PubSub from "pubsub-js";

type IProp = {
    style?: CSSProperties
}

export default function ConectWallet(props: IProp) {
    const {t} = useTranslation();
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);
    const { account, connect, reset } = useWallet();

    useEffect(() => {
        getBalance();
        const namespace = PubSub.subscribe("wallet.logout", () => {
            dispatch.setWalletAddress("");
            dispatch.setToken("");
            reset();
        });

        return () => {
            PubSub.unsubscribe(namespace);
        }
    }, []);

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
        let ethersProvider = new ethers.providers.Web3Provider(PROVIDER);
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

    return (
        <ConectWalletStyle style={props.style} onClick={(event) => {
            if (storeData.address) {
                console.log(t(`Click Wallet Address`));
            } else {
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
            event.stopPropagation();
        }}>{storeData.address? formatAddress(storeData.address) : t(`Connect Wallet`)}</ConectWalletStyle>
    )
}
