import React from 'react';
import { useTranslation } from 'react-i18next';
import { MarginModalStyle, RightBtn } from './MarginModal.style';
import Modal from "../modal/Modal";
import Input from "../form/Input";
import LoadButton from "../loadButton/LoadButton";
import DropDown from "../dropDown/DropDown";

type IProps = {
    onClose(): void
}
export default function MarginModal(props: IProps) {
    const {t} = useTranslation();

    return (
        <Modal title={t(`Adjust Margin`)} close={props.onClose} style={{width: "480px"}}>
            <MarginModalStyle>
                <div className={"flex-sb"}>
                    <span className={"label"}>{t(`Total(USDT)`)}</span>
                    <span className={"label"}>{t(`Maximum increase 64,614.07(USDT)`)}</span>
                </div>
                <Input
                       left={<DropDown
                           options={[
                               {text: t(`Add`), value: 'add'},
                               {text: t(`Reduce`), value: 'Reduce'},
                           ]}
                           onChange={(selectd) => {
                            console.log(selectd.value)
                           }}></DropDown>}
                       right={<div className={`flex-row`}>
                           <RightBtn>{t(`MAX`)}</RightBtn>
                       </div>
                       }
                       style={{margin: "6px 0"}}
                       inputStyle={{width: "110px"}}
                       placeholder={"0.00"}  />
                <div className={"flex-sb"} style={{margin: "6px 0"}}>
                    <span className={"label"}>{t(`Current position margin BTC/USDT Perpetual`)}</span>
                    <span> 1,616.58 USDT</span>
                </div>
                <div className={"flex-sb"}>
                    <span className={"label"}>{t(`Reference strong parity after adjustment`)}</span>
                    <span> 1,616.58 USDT</span>
                </div>
                <LoadButton loading={false} style={{marginTop: "32px"}}>{t(`Confirm`)}</LoadButton>
            </MarginModalStyle>
        </Modal>
    )
}
