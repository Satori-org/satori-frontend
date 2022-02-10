import React from 'react';
import { useTranslation } from 'react-i18next';
import DepthChart from 'src/components/depthChart/DepthChart';

export default function DepthChartDemo() {
    const {t} = useTranslation();

    return (
        <div>
            <DepthChart
                style={{width: "1100px", height: "450px"}}
                bids={[["2017/01", 400], ["2017/02", 350], ["2017/03", 120], ["2017/04",30], ["2017/05",12], ["2017/06",0]]}
                asks={[["2017/01", 0], ["2017/02", 12], ["2017/03", 30], ["2017/04",120], ["2017/05",350], ["2017/06",600]]}/>
        </div>
    )
}
