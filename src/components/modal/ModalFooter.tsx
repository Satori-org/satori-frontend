import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { ModalFooterStyle } from './ModalFooter.style';
import LoadButton from "../loadButton/LoadButton";
import {ButtonGroup} from "../closePositionModal/ClosePositionModal.style";


type IProps = {
    onCancel?(): void,
    onConfirm?(): void
    loading?: boolean
    style?: CSSProperties
    cancelText?: string
    confirmText?: string
}
export default function ModalFooter(props: IProps) {
    const {t} = useTranslation();

    return (
        <ModalFooterStyle style={props.style}>
            <ButtonGroup className={"grid-2"}>
                <LoadButton
                    className={"cancel"}
                    loading={false}
                    style={{height: "42px"}}
                    onClick={props.onCancel}>{props.cancelText || t(`Cancel`)}</LoadButton>
                <LoadButton
                    loading={!!props.loading}
                    style={{height: "42px"}}
                    onClick={props.onConfirm}>{props.confirmText || t(`Confirm`)}</LoadButton>
            </ButtonGroup>
        </ModalFooterStyle>
    )
}
