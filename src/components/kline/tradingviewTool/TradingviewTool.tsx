import React, {useState, useEffect, useMemo} from 'react';
import {FullImageIcon, TradingviewToolStyle} from './tradingviewTool.style';
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
    chartType: number,
    toggle(type: number):void,
    refresh():void,
    resolution?: string,
    resolutionData: Itime
}
export default function TradingviewTool(props:Iprops) {
    const {t} = useTranslation();
    //const [resolution, setResolution] = useState(props.resolution || "15");
    const [activeIndex, setActive] = useState(0);
    let isFull = useFullScreenChange();

    const types = useMemo(() => {
        return [t(`Index Chart`), t(`Depth`), t(`Funding`)]
    }, [t]);

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
            <div className={'toolRight'}>
                {
                    types.map((item, index) => {
                        return <span className={`typeItem flex-box ${props.chartType === index ?'active':''}`}
                                     style={{marginRight: "0.16rem"}}
                                     key={index}
                                     onClick={() => props.toggle && props.toggle(index)}>{item}</span>
                    })
                }
                {/*<span className={`toolItem ${props.showDepthChart?'':'active'}`} style={{marginRight: "34px"}}
                                              onClick={() => props.toggleDepthChart && props.toggleDepthChart(false)}>{t(`Price`)}</span>
                <span className={`toolItem ${props.showDepthChart?'active':''}`} style={{marginRight: "34px"}}
                                onClick={() => props.toggleDepthChart && props.toggleDepthChart(true)}>{t(`Depth`)}</span>*/}
                {/*<ReloadOutlined className={'reloadIcon'} title={t(`重置`)} onClick={props.refresh} />*/}
                {/*<span className={styles.fullscreenIcon} onClick={showFullScreen} title={isFullscreen?t(`退出全屏`):t(`全屏`)}>{isFullscreen?"&#xe63b;":"&#xe640;"}</span>*/}


            </div>
            <div className={"flex-row"}>
                {
                    props.timeAry.map((item:Itime, index) => {
                        return (
                            <span className={`toolItem font10 ${(index === activeIndex && !props.showDepthChart)?'active':''}`} key={index}
                                  onClick={() => changeResolution(item, index)}>
                                {item.name}
                            </span>
                        )
                    })
                }
                <div style={{marginLeft: "0.26rem"}}>
                    {/*{
                        isFull
                            ? <FullscreenExitOutlined className={'fullscreenIcon'} onClick={() => exitFullscreen()} />
                            : <FullscreenOutlined className={'fullscreenIcon'} title={t(`Full Screen`)} onClick={() => props.showFullScreen && props.showFullScreen()} />
                    }*/}
                    {
                        isFull
                            ? <FullImageIcon src={require("src/assets/images/full.png")} onClick={() => exitFullscreen()} alt=""/>
                            : <FullImageIcon src={require("src/assets/images/full.png")} title={t(`Full Screen`)} onClick={() => props.showFullScreen && props.showFullScreen()} alt=""/>
                    }
                </div>
                {/*<span className={'toolItem'} onClick={() => props.executeActionById("insertIndicator")}>{t(`Indicators`)}</span>
                <span className={'toolItem'} onClick={() => props.executeActionById("chartProperties")}>{t(`Settings`)}</span>*/}
            </div>
        </TradingviewToolStyle>
    )
}
