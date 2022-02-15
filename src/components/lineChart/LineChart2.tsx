import React, {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {ChartContainer, LineChartStyle} from "./LineChart.style";
import {EChartsType} from "echarts/types/dist/echarts";
import * as echarts from 'echarts';

type IProps = {
    dataArr: Array<any>[],
    width?: number,
    height?: number,
    title?: ReactNode | string
    style?: CSSProperties
    chartStyle?: CSSProperties
    onlyLine?: boolean
    cMargin?: number
    cSpace?: number
    lineColor?: string
    labelColor?: string
    slitLineColor?: string
    lineWidth?: number
}
export default function LineChart2(props: IProps) {
    const {t} = useTranslation();
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<EChartsType | null>();

    useEffect(() => {
        initChart();
    }, []);

    useEffect(() => {
        if (props.dataArr && props.dataArr.length > 0 && chartInstance) {
            chartRender();
        }
    }, [props.dataArr, chartInstance]);

    function initChart() {
        //myChart = echarts.init(chartRef.current!);
        setChartInstance(echarts.init(chartRef.current!));
    }

    function chartRender() {
        if (!chartInstance) {
            return;
        }
        let ydata = props.dataArr.map((item) => Number(item[1]));
        let min = 0;
        let max = 0;
        ydata.forEach((item) => {
            if (item < min) {
                min = item;
            }
            if (item > max) {
                max = item;
            }
        });
        let colorStops = [];
        if (max !== 0 && min === 0) {
            colorStops = [
                { offset: 0.0,  color: 'rgba(99, 180, 142, 0.066)' },
                { offset: 0.3,  color: 'rgba(99, 180, 142, 0.066)' },
                {offset: 1,  color: 'rgba(99, 180, 142, 0)'}
            ];
        } else if(max === 0 && min !== 0) {
            colorStops = [
                { offset: 0.0,  color: 'rgba(99, 180, 142, 0)'},
                { offset: 0.7,  color: 'rgba(99, 180, 142, 0.066)' },
                { offset: 1,  color: 'rgba(99, 180, 142, 0.066)' }
            ];
        } else {
            let totalHeight = max - min;
            colorStops = [
                { offset: 0.0,  color: 'rgba(99, 180, 142, 0.066)'},
                { offset: max*0.7/totalHeight/2,  color: 'rgba(99, 180, 142, 0.066)'},
                { offset: max/totalHeight,  color: 'rgba(99, 180, 142, 0)'},
                { offset: (0.6*Math.abs(min) + max)/totalHeight,  color: 'rgba(99, 180, 142, 0.066)' },
                { offset: 1,  color: 'rgba(99, 180, 142, 0.066)' }
            ];
        }
        chartInstance.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: props.dataArr.map((item) => {
                    return item[0]
                }),
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true
                }
            },
            grid: {
               bottom: "20px",
                top: "20px",
                left: "3%",
                right: "3%"
            },
            yAxis: {
                type: 'value',
                show: false,
                splitLine: {
                    lineStyle: {
                        color: props.slitLineColor
                    }
                }
            },
            /*visualMap: [
                {
                    type: 'piecewise',
                    show: false,
                    pieces: [
                        {
                            lte: 0,   //数据<0配置
                            color: '#25A69A',  //设置区域背景色
                        },
                        {
                            gte: 0.1,  //数据>0配置
                            color: '#25A69A',  //设置区域背景色
                        },
                    ],
                    seriesIndex: 0,
                },
            ],*/
            series: [
                {
                    data: props.dataArr.map((item) => Number(item[1])),
                    type: 'line',
                    itemStyle: {
                        color: props.lineColor,
                        borderColor: props.lineColor,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 0,
                        borderWidth: 0
                    },
                    showSymbol: false,
                    symbol: "circle",
                    symbolSize: 12,
                    smooth: true,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: colorStops,
                            global: false // 缺省为 false
                        }
                    },
                    lineStyle: {
                        color: props.lineColor
                    }
                }
            ]
        })
    }

    return (
        <LineChartStyle style={props.style}>
            <div ref={chartRef} style={props.chartStyle}></div>
        </LineChartStyle>
    )
}
