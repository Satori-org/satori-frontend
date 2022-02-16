import React, {useMemo} from 'react';
import { SplitNumberStyle } from './SplitNumber.style';
import {formatNumber} from "../../common/utilTools";

type IProps = {
    value: string | number
}
export default function SplitNumber(props: IProps) {

    const arr = useMemo(() => {
        return String(props.value).match(/(\d+)(\.)(\d+)/) || [];
    }, [props.value]);

    return (
        <SplitNumberStyle>
            <span>{formatNumber(arr[0] || props.value)}</span>
            <span className={"decimal"}>{arr[2]}{arr[3]}</span>
        </SplitNumberStyle>
    )
}
