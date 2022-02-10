import {TFunction} from "i18next";
import {TRANSFER_TYPE} from "../../common/enum";

export function getOrderType(isLong: boolean, t: TFunction) {
    return isLong ? t(`Buy/Long`) : t(`Sell/Short`);
}

export function getTransferType(type: number, t: TFunction) {
    return type === TRANSFER_TYPE.Withdraw ? t(`Withdraw`) : t(`Deposit`);
}

export function getTransferStatus(status: number, t: TFunction) {
    switch (status) {
        case 1:
            return t(`Success`);
        case 2:
            return t(`Fail`);
        default:
            return t(`Waiting`);
    }
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
