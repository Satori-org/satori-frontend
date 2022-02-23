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


const wallets = {
    metamask: {name: "Metamask", icon: ""},
    clover: {name: "Clover Wallet", icon: ""},
    polkadot: {name: "Polkadot{.js}", icon: ""},
};

export const chains = {
    Clover: {name: "Clover", icon: "", wallet: [wallets.metamask, wallets.clover], project: project_Clover},
    Moonbeam: {name: "Moonbeam", icon: "", wallet: [wallets.metamask, wallets.clover], project: project_Moonbeam},
    Astar: {name: "Astar", icon: "", wallet: [wallets.metamask], project: project_Astar},
    // Parallel: {name: "Parallel", icon: "", wallet: [wallets.polkadot]},
    // Acala: {name: "Acala", icon: "", wallet: [wallets.metamask, wallets.clover]},
};
