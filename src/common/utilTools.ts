import {BigNumber} from 'ethers';
import Decimal from "decimal.js";
import {CSSProperties} from "react";
import {INPUT_NUMBER_REG, INT_REG, NUMBER_REG} from "./regExp";
import OpenMessageBox from "../components/messageBox/MessageBox";
import {MsgStatus} from "./enum";

//Parameter conversion processing
export function stringify(obj:any) {
    let str = "";
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            str += i + '=' + unescape(obj[i]) + '&'
        }
    }
    return str.slice(0, -1);
}
export const fixedNumber = (value:number|string, precision:number = 0) => {
    if (!value) {
        return 0;
    }
    //let scale = String(Number(value)*Math.pow(10, precision));
    // return parseInt(scale)/Math.pow(10, precision);
    let scale = Decimal.mul(value, Math.pow(10, precision)).toFixed();
    return Decimal.div(parseInt(scale), Math.pow(10, precision)).toNumber() ;
};

export const fixedNumberStr = (value:number|string, precision:number = 0) => {
    if (typeof value !== "number" && !isNumber(String(value))) {
        return String(value);
    }
    if (!value) {
        return "0";
    }

    let scale = Decimal.mul(value, Math.pow(10, precision)).toFixed();
    let valStr = Decimal.div(parseInt(scale), Math.pow(10, precision)).toFixed();
    let dol = valStr.split(".");
    if (dol[1] && dol[1].length < precision) {
        let sub = precision - dol[1].length;
        valStr += new Array(sub).fill("0").join("");
    }
    return valStr;
};

export function formatAmount(amount: number | string, percent?: boolean): string {
    if (!amount || amount === "0") {
        return "--";
    }
    return percent ? `${String(amount)}%` : String(amount);
}

export function formatAmountRise(amount: number | string): string {
    if (!amount || amount === "0") {
        return "--";
    }
    return Number(amount) > 0 ? `+${amount}` : String(amount);
}

export function showMessage(msg: string, type?: MsgStatus) {
    //alert(msg);
    //Toast(msg);
    OpenMessageBox({
        title: msg,
        type: type ?? MsgStatus.warn
    })
}
/*Determine safari browser*/
const isSafari = () => {
    return /Apple/.test(navigator.vendor);
};
/*Time Formatting*/
export function formatDate(dateStr:string|number, format:string="yyyy-MM-dd hh:mm:ss") {
    if (!dateStr) {
        return "";
    }
    // @ts-ignore
    if (isSafari() && isNaN(dateStr)) {
        dateStr = String(dateStr).replace(/(\d{2})(\d{2})$/, "$1:$2");
    }
    if (/^\d+$/g.test(String(dateStr))) {
        dateStr = Number(dateStr)
    }
    let dateObejct = new Date(dateStr);
    let date:any = {
        "M+": dateObejct.getMonth() + 1,
        "d+": dateObejct.getDate(),
        "h+": dateObejct.getHours(),
        "m+": dateObejct.getMinutes(),
        "s+": dateObejct.getSeconds(),
        "q+": Math.floor((dateObejct.getMonth() + 3) / 3),
        "S+": dateObejct.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (dateObejct.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (date.hasOwnProperty(k)) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
    }
    return format;
}

//Full Screen
export function fullscreen(element:any) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
//Exit full screen
export function exitFullscreen() {
    let doc = (document as any);
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    }
}
//Determine full screen
export function isFullscreen(element:any) {
    return element.fullscreenEnabled ||
        element.mozFullScreenEnabled ||
        element.webkitFullscreenEnabled ||
        element.msFullscreenEnabled || false;
}
/* Remaining time */
export function formatDuring(time: number) {
    let days: string | number = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours: string | number = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes: string | number = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
    let seconds: string | number = Math.floor(time % (1000 * 60) / 1000);

    if (days < 10) {
        days = '0' + days
    }
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    return hours + `:` + minutes + `:` + seconds;
}


/**
 * Formatting seconds
 * @param int  value Total seconds
 * @return string result Formatted string
 */
export function formatSeconds(value: number) {
    var theTime = fixedNumber(value);
    var theTime1 = 0;
    var theTime2 = 0;
    var theTime3 = 0;
    if (theTime > 60) {
        theTime1 = fixedNumber(theTime / 60);
        theTime = fixedNumber(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = fixedNumber(theTime1 / 60);
            theTime1 = fixedNumber(theTime1 % 60);
            if (theTime2 > 24) {
                theTime3 = fixedNumber(theTime2 / 24);
                theTime2 = fixedNumber(theTime2 % 24);
            }
        }
    }
    let result = '';
    if (theTime > 0) {
        result = "" + fixedNumber(theTime) + "seconds";
    }
    if (theTime1 > 0) {
        result = "" + fixedNumber(theTime1) + "min" + result;
    }
    if (theTime2 > 0) {
        result = "" + fixedNumber(theTime2) + "h" + result;
    }
    if (theTime3 > 0) {
        result = "" + fixedNumber(theTime3) + "Day" + result;
    }
    return result;
}

export function isNumber(str: string) {
    return new RegExp(NUMBER_REG, "gi").test(str);
}
export function isIntNumber(str: string) {
    return new RegExp(INT_REG, "gi").test(str);
}
export function isInputNumber(str: string) {
    return new RegExp(INPUT_NUMBER_REG, "gi").test(str);
}

/*Dynamic Strings
* @param str Dynamic Strings
* @param obj Object
*/
export const regExpTemplate = (str:string, obj:any) => {
    return str.replace(/\${[^}]+}/g,  (variableStr) => {
        let variable = variableStr.replace(/\${(.+)}/, "$1");
        return obj[variable] || "";
    })
};

//async await Error Handling
export function awaitWrap<T>(promise: Promise<T>) {
    return promise
        .then((data:T) => [data, null])
        .catch(err => [null, err])
}

export function showError(error: any) {
    let isZh = localStorage.getItem("lang") !== 'en_US';
    let msg = "failed";
    switch (error.code) {
        case 4001:
            msg = isZh ? "交易拒绝" : "Trade reject";
            break;
        default:
            let resMsg = (error && error.data && error.data.message) || JSON.stringify(error);
            msg = `${isZh ? "交易失败" : "Trade failed"}：${resMsg}`;
    }

    showMessage(msg || "ERROR")
}

export function getDecimalLen(val: string | number) {
    let str = String(val);
    let arr = str.split(".");
    return arr[1] ? arr[1].length : 0;
}

/*Formatted Address*/
export function formatAddress(address: string, start = 12, end = 5) {
    if (!address) {
        return "";
    }
    let reg = new RegExp(`(.{${start}}).+(.{${end}}$)`, "g");
    return address.replace(reg, "$1......$2")
}

export function getNumberByDecimal(amount: BigNumber | number | string, decimals: number) {
    let e18 = new Decimal(10).pow(decimals);
    return new Decimal(String(amount)).div(e18).toFixed();
}

/*with, separating numbers*/
export function formatNumber(amount:number, splitor = ",") {
    if (amount > 1000) {
        let numAry = String(amount).split('.');
        let numStr = numAry[0].split("").reverse().join("");
        let length = numStr.length;
        let newStr = numStr.replace(/\d{3}/gi, function(a, b){
            if (b/3 + 1 < Math.ceil(length/3)) {
                return a + splitor;
            } else {
                return a;
            }
        });
        return newStr.split("").reverse().join("") + (numAry[1]?`.${numAry[1]}`:'');
    }
    return amount;
}

export function styleToString(style: CSSProperties) {
    return Object.keys(style).reduce((acc, key) => {
        // @ts-ignore
        return acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
    }, '');
}

export function isEmptyObject(data: Object) {
    return !data || Object.keys(data).length === 0;
}

export function getDayStartTime(date?: Date): Date {
    if (date) {
        return new Date(new Date(date.toLocaleDateString()).getTime())
    } else {
        return new Date(new Date(new Date().toLocaleDateString()).getTime())
    }
}
