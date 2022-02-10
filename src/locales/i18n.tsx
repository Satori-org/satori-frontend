import i18n from "i18next";
import en_US from "./en_US.json";
import zh_CN from "./zh_CN.json";
import {
    initReactI18next
} from 'react-i18next';

export enum langType {
    zh_CN = "zh_CN",
    zh_TW = "zh_TW",
    en_US = "en_US",
}

i18n.use(initReactI18next) //init i18next
    .init({
        //引入资源文件
        resources: {
            en_US: {
                translation: en_US,
            },
            zh_CN: {
                translation: zh_CN
            }
        },
        //选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: localStorage.getItem("lang") || langType.zh_CN,
        debug: false,
        nsSeparator: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
