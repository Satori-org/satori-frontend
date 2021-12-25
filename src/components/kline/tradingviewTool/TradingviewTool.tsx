import React, {useState, useEffect} from 'react';
import {TradingviewToolStyle} from './tradingviewTool.style';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Itime } from '../Kline';
import {exitFullscreen } from 'src/common/utilTools';
import { useFullScreenChange } from 'src/components/isFullscreen';

interface Iprops {
    timeAry: Array<Itime>,
    showDepthChart?: boolean,
    disabledDepth?: boolean,
    setResolution(item:Itime):void,
    executeActionById(id:string):void,
    showFullScreen?():void,
    toggleDepthChart?():void,
    refresh():void,
    resolution?: string,
    resolutionData: Itime
}
export default function TradingviewTool(props:Iprops) {
    const {t} = useTranslation();
    //const [resolution, setResolution] = useState(props.resolution || "15");
    const [activeIndex, setActive] = useState(-1);
    let isFull = useFullScreenChange();

    useEffect(() => {
        if (props.resolutionData.resolution) {
            props.timeAry.some((item, index) => {
                if (item.resolution === props.resolutionData.resolution && item.chartType === props.resolutionData.chartType) {
                    setActive(index);
                    return true;
                }
                return false;
            });
            //setResolution(props.resolution);
        }
    }, [props.resolutionData.resolution,  props.resolutionData.chartType]);

    function changeResolution(item:Itime, index:number) {
        setActive(index);
        props.setResolution(item);
        //setResolution(item.resolution);
    }

    return (
        <TradingviewToolStyle>
            <div>
                {
                    props.timeAry.map((item:Itime, index) => {
                        return (
                            <span className={`toolItem ${(index === activeIndex && !props.showDepthChart)?'active':''}`} key={index}
                                  onClick={() => changeResolution(item, index)}>
                                {item.name}
                            </span>
                        )
                    })
                }
                <span className={'toolItem'} onClick={() => props.executeActionById("insertIndicator")}>{t(`指标`)}</span>
                <span className={'toolItem'} onClick={() => props.executeActionById("chartProperties")}>{t(`设置`)}</span>
            </div>
            <div className={'toolRight'}>
                {
                    props.disabledDepth?null:(
                        <span className={`toolItem ${props.showDepthChart?'active':''}`} style={{marginRight: "34px"}}
                              onClick={() => props.toggleDepthChart && props.toggleDepthChart()}>{t(`深度图`)}</span>
                    )
                }
                <ReloadOutlined className={'reloadIcon'} title={t(`重置`)} onClick={props.refresh} />
                {/*<span className={styles.fullscreenIcon} onClick={showFullScreen} title={isFullscreen?t(`退出全屏`):t(`全屏`)}>{isFullscreen?"&#xe63b;":"&#xe640;"}</span>*/}
                {
                    isFull
                        ? <FullscreenExitOutlined className={'fullscreenIcon'} onClick={() => exitFullscreen()} />
                        : <FullscreenOutlined className={'fullscreenIcon'} title={t(`全屏`)} onClick={() => props.showFullScreen && props.showFullScreen()} />
                }

            </div>
        </TradingviewToolStyle>
    )
}
