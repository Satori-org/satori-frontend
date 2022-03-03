import {project} from "./config";
import {ethers, utils} from "ethers";
import {ITrans} from "./types";
import {Decimal} from "decimal.js";
import {getWalletProvider} from "../config";
import Web3 from "web3";

export async function getBalance(address: string) {
    let balance = await getWallet().provider.getBalance(address);
    return Decimal.div( balance.toString(), Math.pow(10, project.chainSymbolDecimal)).toNumber();
}

export function getProvider(chainNode: string) {
    return ethers.getDefaultProvider(chainNode);
}

export function getWallet() {
    return new ethers.providers.Web3Provider(getWalletProvider()).getSigner();
}

export function NewReadContract(address: string, abi: any[], chainNode: string) {
    return new ethers.Contract(address, abi, getProvider(chainNode));
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

export async function signMsg(signObj: any, walletAddress: string, Provider: any) : Promise<ISignatrua>{
    const originData = JSON.stringify(signObj);
    /*const signature = await getWallet().signMessage(originData);
    return {origin: originData, signatrue: signature}*/

    return signString(originData, walletAddress, Provider);
}

export async function signString(str: string, address: string, Provider: any) : Promise<ISignatrua>{
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

export function signExpire(duration = 30 * 1000) {
    return new Date().getTime() + duration;
}
