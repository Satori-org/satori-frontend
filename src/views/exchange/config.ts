import {TFunction} from "i18next";

export function getOrderType(isLong: boolean, t: TFunction) {
    return isLong ? t(`Buy/Long`) : t(`Sell/Short`);
}

export function getTransactionRecordType(type: number, t: TFunction) {
    switch (type) {
        case 1:
            return t(`Summaryed`);
        case 2:
            return t(`Upgraded`);
        case 3:
            return t(`Rolled back`);
        case 4:
            return t(`Withdrawn`);
        default:
            return "";
    }
}
