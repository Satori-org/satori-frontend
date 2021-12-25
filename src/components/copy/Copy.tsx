import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { CopyStyle } from './Copy.style';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Toast} from "../toast/Toast";

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
            Toast(t(`Copy success`))
        }
    }

    return (
        <CopyToClipboard text={props.text} onCopy={onCopy}>
            <CopyStyle style={props.style} src={require("src/assets/images/copy.png")}>
            </CopyStyle>
        </CopyToClipboard>
    )
}
