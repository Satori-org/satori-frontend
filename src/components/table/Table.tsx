import React, {ReactNode} from 'react';
import { TableStyle } from './Table.style';

type IProps = {
    children: ReactNode
}
export default function Table(props: IProps) {

    return (
        <TableStyle>
            {props.children}
        </TableStyle>
    )
}
