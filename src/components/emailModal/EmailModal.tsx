import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {EmailModalStyle, RightBtn, Submit} from './EmailModal.style';
import Modal from "../modal/Modal";
import Input from '../form/Input';

type IProps = {
    onClose(): void
}
export default function EmailModal(props: IProps) {
    const {t} = useTranslation();

    useEffect(() => {
        document.addEventListener("click", props.onClose);

        return () => {
            document.removeEventListener("click", props.onClose);
        }
    }, []);

    return (
        <Modal title={t(`Connect with Email`)}>
            <p style={{margin: "0.24rem 0 0.08rem"}}>{t(`Email address:`)}</p>
            <Input placeholder={t(`Email`)} style={{marginBottom: "0.16rem"}} />
            <Input placeholder={t(`Verification Code`)} right={<RightBtn>{t(`Receive`)}</RightBtn>} />
            <Submit>{t(`Confirm`)}</Submit>
        </Modal>
    )
}