import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { ConectWalletStyle } from './ConectWallet.style';

type IProp = {
    style?: CSSProperties
}

export default function ConectWallet(props: IProp) {
    const {t} = useTranslation();

    return (
        <ConectWalletStyle style={props.style}>{t(`Connect Wallet`)}</ConectWalletStyle>
    )
}
