import {erc20} from "./config";
import {Decimal} from "decimal.js";
import {NewReadContract} from "./wallet";

export async function getTokenDecimal(address: string): Promise<number> {
    let contract = NewReadContract(address, erc20);
    return await contract.decimals();
}

export async function getTokenBalance(account: string, address: string): Promise<number> {
    let contract = NewReadContract(address, erc20);
    let [balance, decimals] = await Promise.all([
        contract.balanceOf(account),
        contract.decimals(),
    ]);
    return Decimal.div( balance.toString(), Math.pow(10, decimals)).toNumber();
}

export async function getTotalSupply(address: string): Promise<number> {
    let contract = NewReadContract(address, erc20);
    let [totalSupply, decimals] = await Promise.all([
        contract.totalSupply(),
        contract.decimals(),
    ]);
    return totalSupply / Math.pow(10, decimals);
}

