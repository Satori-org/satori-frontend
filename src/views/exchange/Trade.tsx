import React from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'src/components/tab/Tab';
import {BalanceBox, ButtonGroup, FeeBox, FontBtn, LabelButton, TotleAmount, TradeStyle} from './styles/Trade.style';
import {useEffectState} from "src/hooks/useEffectState";
import Form from "src/components/form/Form";
import Input from "src/components/form/Input";
import RSlider from "src/components/slider/RSlider";
import LoadButton from "src/components/loadButton/LoadButton";
import SettlementModal from './SettlementModal';

export default function Trade() {
    const {t} = useTranslation();
    const state = useEffectState({
        orderType: 0,
        sliderValue: 0,
        isRISE: true,
        disabledCtroll: false
    });


    /*The slider displays the percentage*/
    function tipFormatter (value=0) {
        return (<span>{value}%</span>)
    }

    return (
        <TradeStyle>
            <Tab
                options={[
                    {text: t(`Limit`)},
                    {text: t(`Market`)}
                    ]}
                 onChange={(active) => state.orderType = active} />
            <div className={"grid-2"} style={{gridColumnGap: "10px", marginTop: "20px"}}>
                <LabelButton>{t(`Isolated`)}</LabelButton>
                <LabelButton>{t(`Leverage`)}</LabelButton>
            </div>

            <Form onSubmit={() => console.log("???")}>
                <BalanceBox className={"flex-sb"}>
                    <span>{t(`Available`)}</span>
                    <span style={{color: "#B2B6BC"}}>0.00000056 USDT</span>
                </BalanceBox>
                <Input label={t(`Price`)}
                       right={<div className={`flex-row`}>
                            <FontBtn>{t(`Last`)}</FontBtn>
                           <span>USDT</span>
                       </div>
                       }
                       inputStyle={{width: "110px"}}
                       placeholder={""}  />
                <Input label={t(`Amount`)}
                       style={{marginTop: "14px"}}
                       placeholder={"BTC"}  />
                {
                    <div style={{margin: "44px auto 20px"}}>
                        <RSlider marks={[{value: 0},{value: 25},{value: 50},{value: 75},{value: 100}]}
                                 tipFormatter={tipFormatter}
                                 disabled={state.disabledCtroll}
                                 value={10}
                                 stepClassName={state.isRISE?"":"down"}
                                 onChange={(value) => state.sliderValue = value}></RSlider>
                    </div>
                }
                <FeeBox className={"flex-sb"}>
                    <span>{t(`Fee`)}</span>
                    <span style={{color: "#B2B6BC"}}>0.000 USDT</span>
                </FeeBox>
                <TotleAmount className={"disabled"}>{t(`Total(BTC)`)}</TotleAmount>
                <ButtonGroup className={"grid-2"}>
                    <LoadButton loading={false} className={"Long"}>{t(`Buy/Long`)}</LoadButton>
                    <LoadButton loading={false} className={"Short"}>{t(`Sell/Short`)}</LoadButton>
                </ButtonGroup>
            </Form>
            <SettlementModal />
        </TradeStyle>
    )
}
