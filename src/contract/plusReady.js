import {getWalletProvider} from "../config";

export default function plusReady(fn) {
    if (getWalletProvider()) {
        setTimeout(fn, 0)
    } else {
        setTimeout(() => {
            plusReady(fn)
        }, 500);
    }
}
