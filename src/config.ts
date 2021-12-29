import {TFunction} from "i18next";

//export const service_api = "http://192.168.1.88:8888/";
export const service_api = "http://18.162.49.224:8082/";

export const PROVIDER = window['ethereum'];

export function getAuctionType(type: number, t: TFunction) {
    switch (type) {
        case 0:
            return t(`british`);
        default:
            return t(`theDutch`);
    }
}
