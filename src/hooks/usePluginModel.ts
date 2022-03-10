import {useStore} from "react-redux";
import {IState} from "../store/reducer";
import Web3 from "web3";
import {BigNumber, ethers} from "ethers";
import {useMemo} from "react";
import {erc20, MaxApproveBalance, minAllowance} from "../contract/config";
import {ITrans} from "../contract/types";
import PubSub from "pubsub-js";
import {Decimal} from "decimal.js";

interface ISignatrua {
    origin: string
    signatrue: string
}
type IApprove = {
    token: string,
    owner: string,
    spender: string
}

export function usePluginModel() {
    const store = useStore<IState>();
    const storeData = store.getState();


    const Provider = useMemo(() => {
        // @ts-ignore
        return storeData.wallet_info?window[storeData.wallet_info.plugin]:undefined;
    }, [storeData.wallet_info]);

    function getProvider() {
        return ethers.getDefaultProvider(storeData.network.project.node);
        //return providers.getDefaultProvider(networks.getNetwork(chainID));
    }

    function getWallet() {
        return new ethers.providers.Web3Provider(Provider).getSigner();
    }

    function NewReadContract(address: string, abi: any[]) {
        return new ethers.Contract(address, abi, getProvider());
    }

    function NewWriteContract(address: string, abi: any[]) {
        return new ethers.Contract(address, abi, getWallet());
    }

    async function signMsg(signObj: any, walletAddress: string) : Promise<ISignatrua>{
        const originData = JSON.stringify(signObj);
        /*const signature = await getWallet().signMessage(originData);
        return {origin: originData, signatrue: signature}*/

        return signString(originData, walletAddress);
    }

    async function signString(str: string, address: string) : Promise<ISignatrua>{
        let web3Provider = new Web3(Provider);

        return new Promise((resolve, reject) => {
            web3Provider.eth.personal.sign(str, address, "", (err: any, res: any) => {
                if (!err) {
                    resolve({origin: str, signatrue: res});
                } else {
                    reject(err);
                }
            })
        });
    }

    function needApprove(params: IApprove): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            let contract = NewReadContract(params.token, erc20);
            let [allowance] = await Promise.all([
                contract.allowance(params.owner, params.spender),
            ]);

            if (BigNumber.from(minAllowance).lt(allowance)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    function approve(params: IApprove): Promise<ITrans> {
        return new Promise(async (resolve, reject) => {
            let contract = NewWriteContract(params.token, erc20);
            contract.approve(params.spender, MaxApproveBalance).then((res:ITrans) => {
                resolve(res)
            }).catch((error:any) => {
                console.log(error)
                reject(error);
            });
        });
    }

    function checkHashStatus(tranInfo: ITrans) {

        function checkStatus(currentHash:string, callback: Function) {
            let instance = new ethers.providers.Web3Provider(Provider);
            //const instance = new web3(chainNode);
            //instance.eth.getTransactionReceipt(currentHash).then((res) => {
            instance.getTransactionReceipt(currentHash).then((res) => {
                if (res && res.status) {
                    PubSub.publish("reload.balance");
                    callback(true);
                } else if(res) {
                    callback(false);
                } else {
                    setTimeout(() => {
                        checkStatus(currentHash, callback);
                    }, 3 * 1000);
                }
            })
        }

        return new Promise((resolve, reject) => {
            checkStatus(tranInfo.hash, (res: boolean) => {
                res ? resolve(true) : reject()
            })
        });
    }

    async function getTokenBalance(account: string, address: string): Promise<number> {
        let contract = NewReadContract(address, erc20);
        let [balance, decimals] = await Promise.all([
            contract.balanceOf(account),
            contract.decimals(),
        ]);
        return Decimal.div( balance.toString(), Math.pow(10, decimals)).toNumber();
    }


    return {
        signMsg,
        signString,
        Provider,
        NewReadContract,
        NewWriteContract,
        getProvider,
        checkHashStatus,
        needApprove,
        approve,
        project: storeData.network.project,
        USDT_decimal: storeData.network.project.contracts.USDC.decimals,
        getTokenBalance
    };
}
