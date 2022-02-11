import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import {KlineBox, MyChartStyle, TradeViewStyle} from './kline.style';
import datafeeds from './datafeeds/datafees.js'
//import TradingView from 'public/static/tradeview/charting_library/charting_library/charting_library.min';
import TradingviewTool from './tradingviewTool/TradingviewTool';
import {IDepthData} from './depthChart/DepthChart';
import DepthChart from 'src/components/depthChart/DepthChart';
import { formatDate, fullscreen } from 'src/common/utilTools';
import connect, {IConnectProps} from 'src/store/connect';
import {langType} from "src/locales/i18n";
import Loading from "../loadStatus/Loading";
import SymbolDetail from "./symbol/SymbolDetail";
import {THEME} from "../../common/enum";
import { dark } from 'src/styles/dark.style';
import {light} from "../../styles/light.style";

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

export interface IAccountInfo {
    availableAmount: string
    coinId: number
    frozenMargin: string
    realizedPnl: string
    totalAssets: string
    unrealizedPnl: string
}

interface Ikline extends WithTranslation, IConnectProps{
    symbol:string,
    kData: Array<Idata>,
    depthData: IDepthData,
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
            chartType: 0,
            lang: props.redux.lang,
            loading: false,
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
            /*if (!this.widget._ready) {
                alert("error")
            }*/
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
        if (this.props.redux.theme !== prevProps.redux.theme) {
            this.refresh();
        }
        if (prevProps.redux.lang !== this.props.redux.lang) {
            this.timeAry = this.getTimeAry();
            let lang = this.props.redux.lang;
            let locale = this.getLanguage(lang);
            this.handleResolution(this.defaultResolutionData);
            /*todo*/
            //this.resolution = this.defaultResolutionData.resolution;
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
            {name: t(`Time`), value: '1MIN',resolution: '1', chartType: 3},
            /*{name: t(`1分`), value: '1min',resolution: '1'},
            {name: t(`5分`), value: '5min',resolution: '5'},*/
            {name: t(`15m`), value: '15MIN',resolution: '15'},
            /*{name: t(`30min`), value: '30MIN',resolution: '30'},*/
            {name: t(`1h`), value: '1HOUR',resolution: '60'},
            {name: t(`4h`), value: '4HOUR',resolution: '240'},
            /*{name: t(`8h`), value: '8HOUR',resolution: '240'},
            {name: t(`12h`), value: '12HOUR',resolution: '720'},*/
            {name: t(`1d`), value: '1DAY',resolution: '1D'},
            {name: t(`1w`), value: '1WEEK',resolution: '1W'},
           /* {name: t(`1M`), value: '1MONTH',resolution: '1M'}*/
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
            const isDark = this.props.redux.theme === THEME.dark;
            //const bgColor = isDark ? dark.colors.backgroundColor : light.colors.backgroundColor;
            const colors = isDark ? dark.colors : light.colors;
            // @ts-ignore
            this.widget = new window.TradingView.widget({
                custom_css_url: isDark ? '/static/tradeView.css?v=2.2' : '/static/tradeView.light.css?v=2.2',
                symbol: this.props.symbol,
                // fullscreen: true,
                container_id: 'trade-view',
                datafeed: this.datafeeds,
                // library_path: '/static/tradeview/charting_library/charting_library/',
                autosize: true,
                debug: false, // uncomment this line to see Library errors and warnings in the console
                fullscreen: false,
                interval: this.resolution,
                theme: isDark?'Dark':'Light',
                timezone: "Asia/Shanghai",
                saved_data: this.state.settings?JSON.parse(this.state.settings || ""):null,
                // datafeed: new Datafeeds.UDFCompatibleDatafeed(websocketAdd, exSymbol),
                library_path: "/static/tradeview/charting_library/charting_library/",
                //locale: this.getLanguage(this.props.redux.lang),
                toolbar_bg: colors.backgroundColor,
                studies_access: {
                    type: "black", //| "white",
                    tools: [{
                        name: "<study name>",
                        grayed: true
                    }, ]
                },
                loading_screen: { backgroundColor: colors.backgroundColor },
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
                    "volume.volume.color.0": "rgba(219,87,75,0.5)",
                    "volume.volume.color.1": "rgba(57,172,89,0.5)"
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
                    "header_widget",
                    "left_toolbar",
                    "context_menus",
                    "control_bar"
                ],
                enabled_features: [

                ],
                charts_storage_url: 'http://saveload.tradingview.com',
                charts_storage_api_version: "1.1",
                client_id: 'tradingview.com',
                user_id: 'public_user_id',
                overrides: {
                    'MACDPaneSize': "tiny",
                    'mainSeriesProperties.candleStyle.borderDownColor': colors.short,
                    'mainSeriesProperties.candleStyle.borderUpColor': colors.long,
                    'mainSeriesProperties.candleStyle.downColor': colors.short,
                    'mainSeriesProperties.candleStyle.drawBorder': true,
                    'mainSeriesProperties.candleStyle.drawWick': true,
                    'mainSeriesProperties.candleStyle.upColor': colors.long,
                    'mainSeriesProperties.candleStyle.wickDownColor': colors.short,
                    'mainSeriesProperties.candleStyle.wickUpColor': colors.long,
                    'paneProperties.background': colors.backgroundColor,
                    'paneProperties.horzGridProperties.color': "rgba(28, 37, 59, 0.4)",
                    'paneProperties.topMargin': 5,
                    'paneProperties.bottomMargin': 1,
                    'paneProperties.vertGridProperties.color': colors.backgroundColor,
                    'paneProperties.vertGridProperties.style': 0,
                    'scalesProperties.lineColor': colors.gapColor,
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
            /*Block click default behavior to prevent page scrolling*/
            let _win = this.widget._iFrame.contentWindow;
            _win.$(_win.document).on("click", ".tv-tabs__tab", (event:Event) => {
                event.preventDefault();
            });
            this.widget.subscribe("onAutoSaveNeeded", () => {
                this.saveChartData();
            })
            if (this.props.kData.length > 0) {
                console.log("初始化  data")
                this.onMessage({
                    data: this.props.kData
                });
            } else {
                console.log("初始化  失败")
            }
            //Load the depth chart after the k-line is finished
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
    //Create MA
    createStudy() {
        this.widget.activeChart().createStudy('Moving Average', false, false, [5, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': '#ff00ff'
        });

        this.widget.activeChart().createStudy('Moving Average', false, false, [10, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': '#26A9E0'
        });

        this.widget.activeChart().createStudy('Moving Average', false, false, [30, 'close', 0], null, {
            'Plot.linewidth': 1,
            'Plot.color': 'yellow'
        });

        this.widget.activeChart().createStudy('Moving Average', false, false, [60, 'close', 0], null, {
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
        /*todo*/
        if (!item) {
          return;
        }
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
        //Some operations do not trigger autosave
        setTimeout(() => {
            this.saveChartData();
        }, 0);
    }
    //Hide Show MA Line
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
                     chartType={this.state.chartType}
                     toggle={(type) => this.setState({chartType: type})}
                ></TradingviewTool>
                <TradeViewStyle id={"trade-view"} className={`${this.state.loading?'':'loaded'}`} style={{height: "calc(100% - 51px)"}}></TradeViewStyle>
                {this.state.loading?<Loading style={{backgroundColor: "transparent"}}></Loading>:null}
                {
                    this.props.depthData
                        ? <MyChartStyle id="myChart" className={`${this.state.chartType === 1?'active':''}`}>
                            <DepthChart
                                style={{width: "100%", height: "100%"}}
                                chartSpace={0}
                                cSpace={0}
                                bids={this.props.depthData.bids.map((item) => [item.price, item.quantity])}
                                asks={this.props.depthData.asks.map((item) => [item.price, item.quantity])}/>
                          </MyChartStyle>
                        : null
                }
                { this.state.chartType === 2 ? <SymbolDetail /> :null }

                {/*<DepthChart
                    depthData={this.props.depthData}
                    precision={this.props.precision}
                    amountPrecision={this.props.amountPrecision}
                    show={this.state.chartType === 1}>
                </DepthChart>*/}
            </KlineBox>
        )
    }
}

export default withTranslation()(connect(Kline));
