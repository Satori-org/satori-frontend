import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnnouncementStyle } from './Announcement.style';
import Pagination from "../../../components/pagination/Pagination";

export default function Announcement() {
    const {t} = useTranslation();

    return (
        <AnnouncementStyle>
            <div className={"content"}>
                <ul className={"list"}>
                    <li className={"listItem"}>
                        <h3 className={"title"}>SATORI增加 ANKR/BUSD, DOT/ETH, KP3R/USDT的交易对</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                    <li className={"listItem"}>
                        <h3 className={"title"}>SATORI增加BTC/USDT和ETH/USDT的交易对</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                    <li className={"listItem"}>
                        <h3 className={"title"}>SATORI增加AVAX/ETH, CHR/ETH, FIS/BIDR, FIS/TRY的交易对</h3>
                        <span className={"time"}>2021-12-07</span>
                    </li>
                </ul>
                <Pagination onChange={(page) => console.log(page)} total={88} />
            </div>
        </AnnouncementStyle>
    )
}
