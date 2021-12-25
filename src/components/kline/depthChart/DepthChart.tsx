import React from 'react';
import {MyChartStyle} from './depthChart.style';
import {withTranslation, WithTranslation, WithTranslationProps} from 'react-i18next';
import connect, {IConnectProps} from "../../../store/connect";
//Introducing basic templates
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');

interface IDepthItem {
    amount:string,
    price:string
}
export interface IDepthData {
    asks:Array<IDepthItem>,
    bids:Array<IDepthItem>
}
interface Iprops {
    depthData: IDepthData,
    show?:boolean
}

interface IuserProps extends WithTranslation, IConnectProps{
    precision?: number
    amountPrecision?: number
    depthData: IDepthData,
    show?:boolean
}
class DepthChart extends React.Component<IuserProps, any>{
    myChart:any;
    chartNode: React.RefObject<HTMLDivElement> = React.createRef();
    precision = 4;
    amountPrecision = 4;
    constructor(props:IuserProps) {
        super(props);
        if (typeof props.precision === "number") {
            this.precision = props.precision;
            this.amountPrecision = props.precision;
        }
        if (typeof props.amountPrecision === "number") {
            this.amountPrecision = props.amountPrecision;
        }
        this.state = {

        };
    }

    componentDidMount(): void {
        this.initChart();
        window.addEventListener('resize', this.resize.bind(this));
    }
    componentDidUpdate(prevProps: Readonly<IuserProps>, prevState: Readonly<any>, snapshot?: any): void {
        let hasData = this.props.depthData.asks.length !== 0;
        let update = this.props.show || (prevProps.depthData.asks.length === 0 && hasData);
        if (hasData && prevProps.depthData !== this.props.depthData && update) {
            this.drawLine();
        }
    }
    resize () {
        setTimeout(() => {
            this.myChart.resize();
        }, 0);
    }
    initChart () {
        this.myChart = echarts.init(this.chartNode.current);
        this.myChart.on('globalout',  () => {
            this.myChart.setOption({
                tooltip: {
                    alwaysShowContent: false
                }
            });
            this.myChart.dispatchAction({
                type: 'hideTip'
            });
        });
    }
    drawLine() {
        if (!this.myChart) {
            return;
        }
        this.myChart.setOption({
            animation: false,
            backgroundColor: '#171B2B',
            tooltip: {
                trigger: 'axis',
                confine: true,
                showContent: true,
                axisPointer: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    }
                },
                alwaysShowContent: true,
                backgroundColor: 'rgba(0, 0, 0, .6)',
                formatter: (params:any) => {
                    let data = params && params[0].data;
                    return [`<p style="text-align: left;">${this.props.t(`价格`)}  ：${data[0]}</p><p style="text-align: left;">${this.props.t(`总量`)} ：${data[1].toFixed(this.amountPrecision)}</p>`].join('\n')
                }
            },
            grid: {
                id: 'candlestick',
                left: '40px',
                right: '6%',
                top: '20px',
                bottom: "24px"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true,
                    interval: 13,
                    formatter: (params:any) => {
                        return Number(params).toFixed(this.precision);
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(82, 90, 119)'
                    }
                },
                splitNumber: 4
            },
            yAxis: [{
                type: 'value',
                position: 'right',
                splitNumber: 4,
                axisTick: {
                    inside: false,
                },
                axisLabel: {
                    inside: false,
                    showMinLabel: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(82, 90, 119)'
                    }
                }
            }],
            series: [{
                data: this.getAsks(this.props.depthData.bids.concat()).reverse(),
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                symbolSize: 10,
                itemStyle: {
                    color: 'blue',
                    borderColor: 'yellow',
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                label: {
                    show: false,
                    position: 'right',
                    distance: 10,
                    padding: 10,
                    fontSize: 12,
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, .6)',
                    formatter: (params:any) => {
                        return [`price ：{a|${params.data[0]}}`, `volumes ：{a|${params.data[1].toFixed(this.precision)}}`].join('\n')
                    },
                    rich: {
                        a: {
                            color: '#fff',
                            fontSize: '12',
                            fontWeight: 'bold',
                            lineHeight: '20',
                        },
                    }
                },
                lineStyle: {
                    color: '#41b37d',
                },
                areaStyle: {
                    color: '#123239'
                },
            },
                {
                    data: this.getAsks(this.props.depthData.asks.concat()),
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 10,
                    itemStyle: {
                        color: 'blue',
                        borderColor: 'yellow',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                    label: {
                        show: false,
                        position: 'left',
                        distance: 10,
                        padding: 10,
                        fontSize: 12,
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, .6)',
                        formatter: (params:any) => {
                            return [`${this.props.t(`price`)} ：{a|${params.data[0]}}`, `total ：{a|${params.data[1].toFixed(this.precision)}}`].join('\n')
                        },
                        rich: {
                            a: {
                                color: '#fff',
                                fontSize: '12',
                                fontWeight: 'bold',
                                lineHeight: '20',
                            },
                        }
                    },
                    lineStyle: {
                        color: '#d74e5a',
                    },
                    areaStyle: {
                        color: '#412031'
                    },
                },
            ]
        });
    }
    getAsks (asks:Array<IDepthItem> = []) {
        let ary:Array<Array<string|number>> = [];
        let totalAmount = 0;
        asks.forEach((item) => {
            ary.push([item.price, totalAmount]);
            totalAmount += Number(item.amount);
        });
        return ary;
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resize.bind(this));
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <MyChartStyle id="myChart" className={`${this.props.show?'active':''}`} ref={this.chartNode}>

            </MyChartStyle>
        )
    }
}

export default  withTranslation()<any>(connect(DepthChart))
