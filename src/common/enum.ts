export enum ConvertType {
    pending = 1,
    success = 2,
    fail
}

export enum LanguageType {
    zh = "zh_CN",
    en = "en_US"
}

export enum MsgStatus {
    success,
    fail,
    warn
}

export const ORDER_TYPE = {
    limit: false,
    market: true
};

export enum THEME {
    dark = "dark",
    light = "light"
}

export enum TRANSFER_TYPE {
    Deposit = 1,
    Withdraw = 2
}

export const ORDER_DIRECTION = {
    buy: true,
    sell: false
};
