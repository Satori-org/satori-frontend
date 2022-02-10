import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyDataStyle } from './EmptyData.style';

type IProps = {
    style?: CSSProperties
}
export default function EmptyData(props: IProps) {
    const {t} = useTranslation();

    return (
        <EmptyDataStyle style={props.style}>
            <img src={require("src/assets/images/empty.png")} className={"emptyIcon"} alt=""/>
            <div className={"emptyText"}>{t(`No Data`)}</div>
        </EmptyDataStyle>
    )
}
