import {chainNode, erc20, MaxApproveBalance, minAllowance, project} from "./config";
import {ethers, utils} from "ethers";
import {ITrans} from "./types";
import PubSub from "pubsub-js";
import {Decimal} from "decimal.js";
import {PROVIDER} from "../config";

export async function getBalance(address: string) {
    let balance = await getWallet().provider.getBalance(address);
    return Decimal.div( balance.toString(), Math.pow(10, project.chainSymbolDecimal)).toNumber();
}

export function getProvider() {
    return ethers.getDefaultProvider(chainNode);
    //return providers.getDefaultProvider(networks.getNetwork(chainID));
}

export function getWallet() {
    return new ethers.providers.Web3Provider(window["ethereum"]).getSigner();
}

export function NewReadContract(address: string, abi: any[]) {
    return new ethers.Contract(address, abi, getProvider());
}

export function NewWriteContract(address: string, abi: any[]) {
    return new ethers.Contract(address, abi, getWallet());
}

export function extendTran(data: ITrans, info: {type: string, symbol?: string, status: number}):ITrans  {
    let transData = Object.assign({}, data);
    transData.status = info.status;
    transData.type = info.type;
    transData.symbol = info.symbol || "";
    return transData;
}

type IApprove = {
    token: string,
    owner: string,
    spender: string
}
export function needApprove(params: IApprove): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let contract = NewReadContract(params.token, erc20);
        let [allowance] = await Promise.all([
            contract.allowance(params.owner, params.spender),
        ]);
        if (allowance > minAllowance) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

export function approve(params: IApprove): Promise<ITrans> {
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

export function checkHashStatus(tranInfo: ITrans) {

    function checkStatus(currentHash:string, callback: Function) {
        let instance = new ethers.providers.Web3Provider(PROVIDER);
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

export function getInput(amount: number | string, decimal: number) {
    return utils.parseUnits(String(amount), decimal);
}

export function unpackEIP712(signature:string) {
    if (signature.startsWith("0x")) {
        signature = signature.substring(2);
    }
    const r = "0x" + signature.substring(0, 64);
    const s = "0x" + signature.substring(64, 128);
    const v = parseInt(signature.substring(128, 130), 16);

    return [r,v,s]
}

interface ISignatrua {
    origin: string
    signatrue: string
}

export async function signMsg(signObj: any) : Promise<ISignatrua>{
    const originData = JSON.stringify(signObj);
    const withdrawSignature = await getWallet().signMessage(originData);
    return {origin: originData, signatrue:withdrawSignature}
}

export function signExpire(duration = 30 * 1000) {
    return new Date().getTime() + duration;
}
