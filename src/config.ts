import {project} from "./contract/config";

export const service_api = "http://13.212.74.68:8888/";
export const socketURL = "ws://13.212.74.68:8888/market/ws";

export const getWalletProvider = () => {
    return window.clover
};

export const USDT_decimal = project.contracts.USDC.decimals;
