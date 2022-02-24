export const erc20 = require('./erc20.json');
export const project_Clover = require('./projects/project_clover.json');
export const project_Moonbeam = require('./projects/project_moonbeam.json');
export const project_Astar = require('./projects/project_astar.json');
export const project = require('./project.json');

export const chainID = project.chainid;
export const chainNode = project.node;

export const precision = 6;

export const MaxApproveBalance = "100000000000000000000000000";
export const minAllowance = "10000000000000000000000000";
export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const WALLETS = {
    metamask: {name: "Metamask", icon: require("src/assets/images/MetaMask.png"), plugin: "ethereum"},
    clover: {name: "Clover Wallet", icon: require("src/assets/images/clover.png"), plugin: "clover"},
    polkadot: {name: "Polkadot{.js}", icon: require("src/assets/images/Polkadot.png"), plugin: "polkadot"},
};
export type IWallet = typeof WALLETS.metamask;
/*export type IChain = {
    name: string,
    icon: string,
    wallet: IWallet[],
    project: any
}*/
/*type key = "Clover" | "Moonbeam" | "Astar";*/
export const CHAINS = {
    Clover: {
        name: "Clover",
        icon: require("src/assets/images/clover.png"),
        wallet: [WALLETS.metamask, WALLETS.clover],
        project: project_Clover
    },
    Moonbeam: {
        name: "Moonbeam",
        icon: require("src/assets/images/Moonbeam.png"),
        wallet: [WALLETS.metamask, WALLETS.clover],
        project: project_Moonbeam
    },
    Astar: {
        name: "Astar",
        icon: require("src/assets/images/Astar.png"),
        wallet: [WALLETS.metamask, WALLETS.clover],
        project: project_Astar
    },
    // Parallel: {name: "Parallel", icon: "", wallet: [wallets.polkadot]},
    // Acala: {name: "Acala", icon: "", wallet: [wallets.metamask, wallets.clover]},
};

export type IChain = typeof CHAINS.Clover;
