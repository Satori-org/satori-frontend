import React, {CSSProperties} from 'react';
import { LanguageStyle } from './Language.style';
import DropDown from "../dropDown/DropDown";
import {useTranslation} from "react-i18next";
import {useStore} from "react-redux";
import {mapDispatchToProps} from "../../store/connect";
import {LanguageType} from "../../common/enum";

type IProps = {
    style?: CSSProperties
}
export default function Language(props: IProps) {
    const {i18n} = useTranslation();
    const store = useStore();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);

    function toggleLang(value: string) {
        i18n.changeLanguage(value);
        dispatch.setLanguage(value);
    }

    return (
        <LanguageStyle className={"flex-box"} style={props.style}>
            <DropDown
                menuStyle={{padding: "0px 32px", lineHeight: "46px", left: "50%",bottom: "-12px", borderRadius: "30px", transform: "translate(-50%,100%)"}}
                options={[{text: "English", value: LanguageType.en}, {text: "简体中文", value: LanguageType.zh}]}
                onChange={(selectd) => {
                toggleLang(selectd.value)
            }}></DropDown>
        </LanguageStyle>
    )
}
