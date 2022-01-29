import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnnouncementDetailStyle, Title, Time, Content, ButtonGroup } from './AnnouncementDetail.style';

export default function AnnouncementDetail() {
    const {t} = useTranslation();

    return (
        <AnnouncementDetailStyle>
            <div className={"content"}>
                <Title>SATORI增加 ANKR/BUSD, DOT/ETH, KP3R/USDT的交易对</Title>
                <Time>2021-12-07</Time>
                <Content>
                    <div>
                        SATORI将于2021年12月07日11：12（‎‎东八区时间‎‎）上线ANKR/BUSD, DOT/ETH, KP3R/USDT交易对，邀您体验！ ‎
                        风险提示‎‎：数字货币交易存在巨大风险，请您谨慎购买，并注意交易风险。 请注意，SATORI不对您的任何交易行为承担担保、赔偿等责任。‎
                        感谢您对SATORI的支持！‎
                        SATORI团队‎
                        十一月 05， 2021‎
                        点击立即下载iPhone或Android版APP‎‎

                    </div>
                    <div>
                        脸书‎‎：https://www.facebook.com/
                        推特：‎‎https://twitter.com/
                        华语Twitter：‎‎https://twitter.com/

                        SATORI保留随时全权酌情因任何理由修改、变更或取消此公告的权利，无需事先通知。‎
                    </div>
                </Content>
                <ButtonGroup className={"grid-2"}>
                    <div className="btnItem">
                        <p className={"nextText"} style={{textAlign: "right"}}>上一篇</p>
                        <h3 className={"title"}>SATORI增加 ANKR/BUSD交易对</h3>
                    </div>
                    <div className="btnItem">
                        <p className={"nextText"}>下一篇</p>
                        <h3 className={"title"}>SATORI增加 ANKR/BUSD交易对</h3>
                    </div>
                </ButtonGroup>
            </div>
        </AnnouncementDetailStyle>
    )
}
