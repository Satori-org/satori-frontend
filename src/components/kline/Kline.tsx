import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import {KlineBox, TradeViewStyle} from './kline.style';
import datafeeds from './datafeeds/datafees.js'
//import TradingView from 'public/static/tradeview/charting_library/charting_library/charting_library.min';
import TradingviewTool from './tradingviewTool/TradingviewTool';
import DepthChart, {IDepthData} from './depthChart/DepthChart';
import { formatDate, fullscreen } from 'src/common/utilTools';
import connect, {IConnectProps} from 'src/store/connect';
import Loading from 'src/components/loading/Loading';
import {langType} from "src/locales/i18n";

export interface Idata {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
}
export interface Itime {
    name:string,
    value:string,
    resolution:string,
    chartType?:number
}
interface Ikline extends WithTranslation, IConnectProps{
    symbol:string,
    kData: Array<Idata>,
    depthData?: IDepthData,
    precision?: number,
    ticker?:Idata | undefined,
    hideTimeValue?: string[],
    changeResolution(resolution:Itime):void,
    localResolutionKey: string,
    localDataKey: string,
    resolution?: string,
    resolutionData: Itime,
    amountPrecision?: number
}
/*interface IProps {
    symbol:string,
    kData: Array<Idata>,
    depthData?: IDepthData,
    precision?: number,
    ticker?:Idata | undefined,
    hideTimeValue?: string[],
    changeResolution(resolution:string):void
}*/
class Kline extends React.Component<Ikline, any>{
    cacheData:any = {};
    widget:any = null;
    datafeeds:any = new datafeeds(this);
    defaultResolutionData:Itime;
    symbol = "";
    resolution = "15";
    $t:any = null;
    timeAry:Array<Itime>;
    resolutionIndex = 3;
    _ticker = "";
    onResetCacheNeededCallback:undefined | object = undefined;
    lastTime = 0;
    precision = 4;
    ticker:Idata|undefined;
    componentNode: React.RefObject<HTMLDivElement> = React.createRef();
    //timeAry =
    constructor(props:Ikline) {
        super(props);
        if (props.resolution) {
            this.resolution = props.resolution;
        }
        this.defaultResolutionData = JSON.parse(localStorage.getItem(props.localResolutionKey)!);
        this.timeAry = this.getTimeAry();
        this.precision = this.props.precision?this.props.precision:this.precision;
        this.set_ticker();
        this.state = {
            showDepthChart: false,
            lang: props.redux.lang,
            loading: true,
            settings: localStorage.getItem(props.localDataKey)
        };
    }

    componentDidMount(): void {
        this.init();
    }

    componentDidUpdate(prevProps: Readonly<Ikline>, prevState: Readonly<any>, snapshot?: any): void {
        if (!this.widget) {
            this.init();
        } else if (prevProps.symbol !== this.props.symbol){
            this._ticker = `${this.props.symbol}-${this.resolution}`;
            this.set_ticker();
            //this.resolution = this.timeAry[this.resolutionIndex].resolution;
            if (this.widget._ready) {
                this.widget.setSymbol(this.props.symbol, this.resolution);
            }
        }
        if (this.props.kData.length !==0 && prevProps.kData !== this.props.kData) {
            this.onMessage({
                data: this.props.kData
            });
            this.resetChartData();
        }
        if (this.props.ticker && prevProps.ticker !== this.props.ticker) {
            if (this.cacheData[this._ticker] && this.cacheData[this._ticker].length !== 0) {
                let lastTicker = this.cacheData[this._ticker][this.cacheData[this._ticker].length - 1];
                if (this.props.ticker.time === lastTicker.time) {
                    this.cacheData[this._ticker][this.cacheData[this._ticker].length - 1] = this.props.ticker;
                } else if (this.props.ticker.time < lastTicker.time) {
                    for (let i = this.cacheData[this._ticker].length - 1; i >=0; i--) {
                        if (this.cacheData[this._ticker][i].time === this.props.ticker.time) {
                            //let delData = this.cacheData[this._ticker].splice(i, 1, this.props.ticker);
                            this.cacheData[this._ticker].splice(i, 1, this.props.ticker);
                            this.resetChartData();
                        }
                    }
                } else {
                    this.cacheData[this._ticker].push(this.props.ticker);
                }
                this.datafeeds.barsUpdater.updateData();
            }
        }
        if (prevProps.redux.lang !== this.props.redux.lang) {
            this.timeAry = this.getTimeAry();
            let lang = this.props.redux.lang;
            let locale = this.getLanguage(lang);
            this.handleResolution(this.defaultResolutionData);
            this.resolution = this.defaultResolutionData.resolution;
            this.widget.setLanguage(locale);
        }
    }
    resetChartData() {
        if (typeof this.onResetCacheNeededCallback === 'function' ) {
            this.onResetCacheNeededCallback();
            this.widget && this.widget.chart().resetData();
        }
    }
    getLanguage(lang:string) {
        let locale = "zh";
        if (lang === langType.en_US) {
            locale = "en";
        } else if(lang === langType.zh_TW) {
            locale = "zh_TW";
        }
        return locale;
    }
    getTimeAry() {
        const t = this.props.t;
        return [
            {name: t(`分时`), value: '1min',resolution: '1', chartType: 3},
            {name: t(`1分`), value: '1min',resolution: '1'},
            {name: t(`5分`), value: '5min',resolution: '5'},
            {name: t(`15分`), value: '15min',resolution: '15'},
            {name: t(`30分`), value: '30min',resolution: '30'},
            {name: t(`1小时`), value: '60min',resolution: '60'},
            {name: t(`4小时`), value: '4h',resolution: '240'},
            {name: t(`12小时`), value: '12h',resolution: '720'},
            {name: t(`1天`), value: '1day',resolution: '1D'},
            {name: t(`1周`), value: '1week',resolution: '1W'},
            {name: t(`1月`), value: '1mon',resolution: '1M'}
        ];
    }

    set_ticker() {
        this._ticker = `${this.props.symbol}-${this.resolution}`;
    }
    init() {
        //this.cacheData = {};
        //this.lastTime = null;
        if (this.widget) {
            this.datafeeds.barsUpdater.updateData()
            this.widget.remove();
            this.widget = null;
        }
        if (!this.widget) {
            const bgColor = "#171B2B";
            // @ts-ignore
            this.widget = new window.TradingView.widget({
                custom_css_url: '/static/tradeView.css?v=2.2',
                symbol: this.props.symbol,
                // fullscreen: true,
                container_id: 'trade-view',
                datafeed: this.datafeeds,
                // library_path: '/static/tradeview/charting_library/charting_library/',
                autosize: true,
                debug: false, // uncomment this line to see Library errors and warnings in the console
                fullscreen: false,
                interval: this.resolution,
                theme: 'Dark',
                timezone: "Asia/Shanghai",
                saved_data: this.state.settings?JSON.parse(this.state.settings || ""):null,
                // datafeed: new Datafeeds.UDFCompatibleDatafeed(websocketAdd, exSymbol),
                library_path: "/static/tradeview/charting_library/charting_library/",
                locale: this.getLanguage(this.props.redux.lang),
                toolbar_bg: bgColor,
                studies_access: {
                    type: "black", //| "white",
                    tools: [{
                        name: "<study name>",
                        grayed: true
                    }, ]
                },
                loading_screen: { backgroundColor: bgColor },
                customFormatters: {
                    timeFormatter: {
                        format: function(date:number) {
                            return formatDate(date - 8*60*60*1000, "hh:mm");
                        }
                    },
                    dateFormatter: {
                        format: (date:number) => {
                            return formatDate(date - 8*60*60*1000, "yyyy-MM-dd");
                        }
                    }
                },
                studies_overrides: {
                    "volume.volume.color.0": "rgba(216, 73, 73,1)",
                    "volume.volume.color.1": "rgba(17, 179, 132,1)"
                },
                disabled_features: [
                    "display_market_status",
                    // "pane_context_menu",
                    // "context_menus",
                    "scales_context_menu",
                    // "legend_context_menu",
                    //"control_bar",
                    //"property_pages",
                    "compare_symbol",
                    "timeframes_toolbar",
                    "go_to_date",
                    //缩放"control_bar",
                    "use_localstorage_for_settings",
                    "header_symbol_search",
                    "header_saveload",
                    "header_interval_dialog_button",
                    "header_undo_redo",
                    "header_compare",
                    "header_screenshot",
                    "header_indicators",
                    "header_chart_type",
                    "header_resolutions",
                    "header_settings",
                    "volume_force_overlay",
                    "compare_symbol",
                    "save_chart_properties_to_local_storage",
                    "edit_buttons_in_legend",
                    "widget_logo",
                    "header_widget"
                ],
                enabled_features: [
                    "source_selection_markers",
                    "dont_show_boolean_study_arguments",
                    "move_logo_to_main_pane",
                    "header_fullscreen_button",
                    "side_toolbar_in_fullscreen_mode",
                    "keep_left_toolbar_visible_on_small_screens",
                    "timezone_menu",
                    "hide_last_na_study_output"
                ],
                charts_storage_url: 'http://saveload.tradingview.com',
                charts_storage_api_version: "1.1",
                client_id: 'tradingview.com',
                user_id: 'public_user_id',
                overrides: {
                    'MACDPaneSize': "tiny",
                    'mainSeriesProperties.candleStyle.borderDownColor': "#d84949",
                    'mainSeriesProperties.candleStyle.borderUpColor': "#11b384",
                    'mainSeriesProperties.candleStyle.downColor': "#d84949",
                    'mainSeriesProperties.candleStyle.drawBorder': true,
                    'mainSeriesProperties.candleStyle.drawWick': true,
                    'mainSeriesProperties.candleStyle.upColor': "#11b384",
                    'mainSeriesProperties.candleStyle.wickDownColor': "#d84949",
                    'mainSeriesProperties.candleStyle.wickUpColor': "#11b384",
                    'paneProperties.background': bgColor,
                    'paneProperties.horzGridProperties.color': "rgba(28, 37, 59, 0.4)",
                    'paneProperties.topMargin': 5,
                    'paneProperties.bottomMargin': 1,
                    'paneProperties.vertGridProperties.color': bgColor,
                    'paneProperties.vertGridProperties.style': 0,
                    'scalesProperties.lineColor': "#525a77",
                    'scalesProperties.textColor': "#999",
                    'volumePaneSize': "medium"
                }
            })
        }
        this.widget.onChartReady(() => {
            this.setState({loading: false});
            if (!this.state.settings) {
                this.createStudy();
            }
            /*Preventing click default behavior prevents the page from scrolling*/
            let _win = this.widget._iFrame.contentWindow;
            _win.$(_win.document).on("click", ".tv-tabs__tab", (event:Event) => {
                event.preventDefault();
            });
            this.widget.subscribe("onAutoSaveNeeded", () => {
                this.saveChartData();
            })
            //Depth map is loaded after k line
            /*setTimeout(() => {
                this.loadDepthChart = true;
            }, 0)*/
        });
    }
    saveChartData() {
        if (this.widget && this.widget._innerAPI()) {
            this.widget.save((data:any) => {
                const hasData = data && data.charts &&  data.charts.length !== 0;
                if (this.widget.activeChart().resolution() && this.props.localResolutionKey) {
                    const resolutions = this.getTimeAry();
                    resolutions.some((item) => {
                        //if (item.resolution === this.widget.activeChart().resolution()) {
                        if (item.resolution === this.props.resolutionData.resolution && item.chartType === this.props.resolutionData.chartType) {
                            localStorage.setItem(this.props.localResolutionKey, JSON.stringify(item));
                            return true;
                        }
                        return false;
                    })
                }
                if (this.props.localDataKey && hasData) {
                    localStorage.setItem( this.props.localDataKey, JSON.stringify(data.charts[0]))
                }
            })
        }
    }
    //创建MA
    createStudy() {
        this.widget.activeChart().createStudy('Moving Average', false, false, [50, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': '#ff00ff'
        });

        /*this.widget.activeChart().createStudy('Moving Average', false, false, [10, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': '#26A9E0'
        });*/

        this.widget.activeChart().createStudy('Moving Average', false, false, [100, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': 'yellow'
        });

        this.widget.activeChart().createStudy('Moving Average', false, false, [200, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': '#9be9ff'
        });
    }
    onMessage(data:any) {
        // console.log(data)
        //const ticker = `${this.symbol}-${this.resolution}`;
        if (data.data && data.data.length) {
            const list:Array<any> = [];
            data.data.forEach(function(element:Idata) {
                list.push(element)
            }, this);
            this.cacheData[this._ticker] = list;
            this.lastTime = list[list.length - 1].time;
            // this.subscribe()
        } else if (data.tick) {
            if (data.tick.id * 1000 === this.cacheData[this._ticker][this.cacheData[this._ticker].length - 1].time) {
                this.cacheData[this._ticker][this.cacheData[this._ticker].length - 1] = {
                    time: this.resolution !== 'D' && this.resolution !== '1D' ? data.tick.id * 1000 : data.tick.id,
                    open: data.tick.open,
                    high: data.tick.high,
                    low: data.tick.low,
                    close: data.tick.close,
                    volume: data.tick.amount
                };
                this.datafeeds.barsUpdater.updateData()
            }
        }
        /*if (data.type && data.type.indexOf(this.symbol.toLowerCase()) !== -1) {
            this.datafeeds.barsUpdater.updateData();
            const ticker = `${this.symbol}-${this.resolution}`;
            const barsData = {
                time: data.id * 1000,
                open: data.open,
                high: data.high,
                low: data.low,
                close: data.close,
                volume: data.quote_vol
            };
            if (barsData.time >= this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
                this.cacheData[ticker][this.cacheData[ticker].length - 1] = barsData
            }
        }*/
    }
    getBars(symbolInfo:any, resolution:any, rangeStartDate:any, rangeEndDate:any, onLoadedCallback:any) {
        const ticker = this._ticker;
        const ticker1 = `${symbolInfo.ticker}-${resolution}`;
        if (this.cacheData[ticker] && this.cacheData[ticker].length && ticker === ticker1) {
            //this.isLoading = false;
            const newBars:Array<any> = [];
            this.cacheData[ticker].forEach((item:any) => {
                if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
                    newBars.push(item)
                }
            });
            /*if (this.kTime.resolution === '1M' && newBars.length === 0 && rangeEndDate > 0) {
                newBars.push(this.cacheData[ticker][this.cacheData[ticker].length - 1]);
            }*/
            onLoadedCallback(newBars);
        } else {
            const self = this;
            setTimeout(function() {
                self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
            }, 10)
        }
    }
    getSymbol() {
        return {
            pricescale: Math.pow(10, this.precision),
            'name': this.props.symbol,
            'description': this.props.symbol,
            'ticker': this.props.symbol
        }
    }
    setResolution (item:Itime) {
        if (item && item.chartType === 3) {
            this.setStudiesVisible(false);
            this.widget.chart().setChartType(item.chartType);
        } else {
            this.setStudiesVisible(true);
            this.widget.chart().setChartType(1);
        }
        this.resolution = item.resolution;
        this.set_ticker();
        this.widget.chart().setResolution(item.resolution);
        //Called manually, some operations do not trigger autosave
        setTimeout(() => {
            this.saveChartData();
        }, 0);
    }
    setStudiesVisible (visible:boolean) {
        let studies = this.widget.chart().getAllStudies();
        studies.forEach((item:any) => {
            if (item.name === 'Moving Average') {
                this.widget.chart().getStudyById(item.id).setVisible(visible);
            }
        });
    }
    executeActionById(id:string) {
        this.widget.chart().executeActionById(id);
        this.setState({showDepthChart: false});
    }

    handleResolution(item:Itime) {
        this.setResolution(item);
        this.props.changeResolution(item);
    }

    refresh() {
        localStorage.removeItem(this.props.localDataKey);
        this.widget.remove();
        this.widget = null;
        this.setState({settings: null}, () => {
            this.init();
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <KlineBox ref={this.componentNode}>
                <TradingviewTool
                     timeAry={this.timeAry.filter((item) => !(this.props.hideTimeValue && this.props.hideTimeValue.includes(item.value)))}
                     setResolution={(item) => {
                         /*this.setResolution(item);
                         this.props.changeResolution(item);*/
                         this.handleResolution(item);
                         this.setState({showDepthChart: false});
                     }}
                     resolution={this.resolution}
                     resolutionData={this.props.resolutionData}
                     disabledDepth={!this.props.depthData}
                     executeActionById={(id) => this.executeActionById(id)}
                     showFullScreen={() => fullscreen(this.componentNode.current)}
                     refresh={() => this.refresh()}
                     toggleDepthChart={() => this.setState({showDepthChart: !this.state.showDepthChart})}
                ></TradingviewTool>
                <TradeViewStyle id={"trade-view"} className={`${this.state.loading?'':'loaded'}`} style={{height: "calc(100% - 24px)"}}></TradeViewStyle>
                {this.state.loading?<Loading style={{backgroundColor: "transparent"}}></Loading>:null}
                {
                    this.props.depthData
                        ? <DepthChart
                             depthData={this.props.depthData}
                             precision={this.props.precision}
                             amountPrecision={this.props.amountPrecision}
                             show={this.state.showDepthChart}>
                          </DepthChart>
                        : null
                }
            </KlineBox>
        )
    }
}

export default withTranslation()(connect(Kline));
