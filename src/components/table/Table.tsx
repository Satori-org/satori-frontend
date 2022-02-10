import React, {CSSProperties, ReactNode} from 'react';
import { TableStyle } from './Table.style';

type IProps = {
    children: ReactNode
    className?: string
    style?: CSSProperties
}
export default function Table(props: IProps) {

    return (
        <TableStyle className={props.className} style={props.style}>
            {props.children}
        </TableStyle>
    )
}
