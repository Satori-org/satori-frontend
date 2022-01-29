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


