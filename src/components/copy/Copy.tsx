import React, {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import {CopyStyle} from './Copy.style';
import CopyToClipboard from 'react-copy-to-clipboard';
import {showMessage} from "../../common/utilTools";
import {MsgStatus} from "../../common/enum";

type IProps = {
    text: string,
    callback?(): void,
    style?: CSSProperties
}
export default function Copy(props: IProps) {
    const {t} = useTranslation();

    function onCopy() {
        if (props.callback) {
            props.callback();
        } else {
            showMessage(t(`Copy success`), MsgStatus.success)
        }
    }

    return (
        <CopyToClipboard text={props.text} onCopy={onCopy}>
            <CopyStyle style={props.style} src={require("src/assets/images/edit.png")}>
            </CopyStyle>
        </CopyToClipboard>
    )
}
