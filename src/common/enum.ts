export enum ConvertType {
    pending = 1,
    success = 2,
    fail
}

export enum LanguageType {
    zh = "zh_CN",
    en = "en_US"
}

export enum TradeStatus {
    success,
    fail,
    warn
}

export const ORDER_TYPE = {
    limit: false,
    market: true
};
