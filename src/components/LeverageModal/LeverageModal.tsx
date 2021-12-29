import React from 'react';
import { useTranslation } from 'react-i18next';
import {LeverageModalStyle, Warn} from './LeverageModal.style';
import Modal from "../modal/Modal";
import LoadButton from '../loadButton/LoadButton';
import ReactDOM from "react-dom";
import StepNumber from "../stepNumber/StepNumber";

type IProps = {
    onClose(): void
    destoryComponent():void
}
function LeverageModal(props: IProps) {
    const {t} = useTranslation();

    return (
        <Modal title={t(`Adjusting Leverage`)} close={props.destoryComponent}>
            <LeverageModalStyle>
                <StepNumber onChange={(value) => console.log(value)}></StepNumber>
                <div className={"label"} style={{marginTop: "10px"}}>{t(`The maximum position of the current trading pair is: 1,000,000 USDT`, {nsSeparator: false})}</div>
                <Warn className={"flex-row"}>
                    <img src={require("src/assets/images/fail.png")} className={"icon"} alt=""/>
                    <div>{t(`Selecting more than [10×] leverage trading will increase the risk of forced liquidation, please try to pay attention to related risks.`)}</div>
                </Warn>
                <LoadButton loading={false}>{t(`Confirm`)}</LoadButton>
            </LeverageModalStyle>
        </Modal>
    )
}

export default function OpenLeverageModal(params: any ={}) {
    let id = "leverage-box";
    let leverageBox = document.getElementById(id);
    if (!leverageBox) {
        leverageBox = document.createElement("div");
        leverageBox.id = id;
        document.body.appendChild(leverageBox);
    }
    const destoryComponent = () => {
        if (leverageBox) {
            ReactDOM.unmountComponentAtNode(leverageBox);
        }
    };
    ReactDOM.render(<LeverageModal destoryComponent={destoryComponent} {...params}></LeverageModal>, leverageBox);
}
