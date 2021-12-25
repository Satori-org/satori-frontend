const isProduction = process.env.NODE_ENV === "production";

export const nft = require('./nft.json');
export const erc20 = require('./erc20.json');
export const project = require('./project.json');

export const chainID = project.chainid;
export const chainNode = project.node;
export const blockExplorer = project.node;
export const mainSymbol = project.chainSymbol;
export const mainSymbolDecimals = project.chainSymbolDecimal;

export const swapURL = project.swapURL || "https://pancake.kiemtienonline360.com";

export const precision = 6;

export const MaxApproveBalance = "100000000000000000000000000";
export const minAllowance = "10000000000000000000000000";
export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const ADMIN_ADDRESS = "0xc783df8a850f42e7F7e57013759C285caa701eB6";
export function isAdmin(address: string) {
    return ADMIN_ADDRESS.toLocaleLowerCase() === address.toLocaleLowerCase();
}

export function getPoolName(tokenName:string) {
    return `z${tokenName}Pool`;
}

export function getLPPoolName(token0Name:string, token1Name:string) {
    const name1 = `${token0Name}-${token1Name}-LPPool`;
    const name2 = `${token1Name}-${token0Name}-LPPool`;
    if (project.contracts.hasOwnProperty(name1)) {
        return name1;
    } else {
        return name2;
    }
}

export function getzTokenName(token:string) {
    return `z${token}`;
}
export function getPairName(token0Name:string, token1Name:string) {
    const name1 = `${token0Name}_${token1Name}_Pair`;
    const name2 = `${token1Name}_${token0Name}_Pair`;
    if (project.contracts.hasOwnProperty(name1)) {
        return name1;
    } else {
        return name2;
    }
}

export function getWorkChain(token0Name:string, token1Name:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if (token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) {
            return project.workChains[i];
        }
    }
}

export function getWorkChainPid(token0Name:string, token1Name:string, tokenName:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
            (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            if (project.workChains[i].token0.name === tokenName) {
                return project.workChains[i].token0.productId;
            } else {
                return project.workChains[i].token1.productId;
            }
        }
    }
}
export function getWorkChainAddStrategy(token0Name:string, token1Name:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
            (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            return project.workChains[i].addStrategy;
        }
    }
}

export function getWorkChainLiquidateFactor(token0Name:string, token1Name:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
            (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            return project.workChains[i].liquidateFactor;
        }
    }
}

export function getWorkChainOpenFactor(token0Name:string, token1Name:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
            (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            return project.workChains[i].openFactor;
        }
    }
}

export function getWorkChainObj(token0Name:string, token1Name:string) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
            (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            return project.workChains[i];
        }
    }
}

export function getWorkChainMinDebt(token0Name:string, token1Name:string, tokenName:string) {
    let obj = getWorkChainObj(token0Name, token1Name);
    if (obj.token0.name === tokenName) {
        return obj.token0.minDebt / 10000;
    } else {
        return obj.token1.minDebt / 10000;
    }
}

export function getWorkChainStakingReward(token0Name:string, token1Name:string) {
    return getWorkChainObj(token0Name, token1Name).stakingReward
}

export function getWorkChainProduct(token0Name:string, token1Name:string, pid: number) {
    for (let i = 0; i < project.workChains.length; i++) {
        if ((token0Name === project.workChains[i].token0.name && token1Name === project.workChains[i].token1.name) ||
        (token1Name === project.workChains[i].token0.name && token0Name === project.workChains[i].token1.name)) {
            if (pid === project.workChains[i].token0.productId) {
                return project.workChains[i].token0.name;
            } else {
                return project.workChains[i].token1.name;
            }
        }
    }
}

export function getPairNameByProduct(pid: number): string[] {
    for (let i = 0; i < project.workChains.length; i++) {
        if (pid === project.workChains[i].token0.productId || pid === project.workChains[i].token1.productId) {
            return [project.workChains[i].token0.name, project.workChains[i].token1.name];
        }
    }
    return [];
}

export interface ITrans {
    blockHash: any
    blockNumber: any
    chainId: number
    confirmations: number
    creates: any
    data: string
    from: string
    gasLimit: any
    gasPrice: any
    hash: string
    nonce: number
    status: number,
    type: string,
    symbol: string
}


