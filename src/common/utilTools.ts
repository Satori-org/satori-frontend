/*Retain the decimal*/
import {Toast} from "src/components/toast/Toast";
import {TFunction} from "i18next";
import MsgNotification, {MsgType} from "src/components/msgNotification/MsgNotification";
import { BigNumber } from 'ethers';
import Decimal from "decimal.js";

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
    let scale = String(Number(value)*Math.pow(10, precision));
    return parseInt(scale)/Math.pow(10, precision);
};

export function showMessage(msg: string) {
    //alert(msg);
    Toast(msg);
}
/*Check safari*/
const isSafari = () => {
    return /Apple/.test(navigator.vendor);
};
/*Time formatting*/
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

//Full screen
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
//Determine the full screen
export function isFullscreen(element:any) {
    return element.fullscreenEnabled ||
        element.mozFullScreenEnabled ||
        element.webkitFullscreenEnabled ||
        element.msFullscreenEnabled || false;
}
/* For the rest of */
export function formatDuring(time: number, t: TFunction) {
    let days: string | number = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours: string | number = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes: string | number = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
    let seconds: string | number = Math.floor(time % (1000 * 60) / 1000);
    // format 00day 00hour 00minute 00second
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
    return days + t(`天`) + hours + t(`时`) + minutes + t(`分`) + seconds + t(`秒`);
}


/**
 * Format the seconds
 * @param int  value The total number of seconds
 * @return string result A formatted string
 */
export function formatSeconds(value: number) {
    var theTime = fixedNumber(value);// Time required to convert in seconds
    var theTime1 = 0;//
    var theTime2 = 0;//
    var theTime3 = 0;//
    if (theTime > 60) {
        theTime1 = fixedNumber(theTime / 60);
        theTime = fixedNumber(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = fixedNumber(theTime1 / 60);
            theTime1 = fixedNumber(theTime1 % 60);
            if (theTime2 > 24) {
                //> 24 hours
                theTime3 = fixedNumber(theTime2 / 24);
                theTime2 = fixedNumber(theTime2 % 24);
            }
        }
    }
    var result = '';
    if (theTime > 0) {
        result = "" + fixedNumber(theTime) + "秒";
    }
    if (theTime1 > 0) {
        result = "" + fixedNumber(theTime1) + "分钟" + result;
    }
    if (theTime2 > 0) {
        result = "" + fixedNumber(theTime2) + "小时" + result;
    }
    if (theTime3 > 0) {
        result = "" + fixedNumber(theTime3) + "天" + result;
    }
    return result;
}

export function isNumber(str: string) {
    const NUMBER_REG = "^\\d+(\\.{1}\\d+)?$";
    return new RegExp(NUMBER_REG, "gi").test(str);
}

/*Dynamic string
* @param str Dynamic string
* @param obj OBJECT
*/
export const regExpTemplate = (str:string, obj:any) => {
    return str.replace(/\${[^}]+}/g,  (variableStr) => {
        let variable = variableStr.replace(/\${(.+)}/, "$1");
        return obj[variable] || "";
    })
};

//async await错误处理
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

/*格式化地址*/
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

/*以，分隔数字*/
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
