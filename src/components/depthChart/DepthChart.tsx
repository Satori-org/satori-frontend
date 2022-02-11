import React, {CSSProperties, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {ChartContainer, DepthChartStyle, ToolTip} from "./DepthChart.style";
import {useEffectState} from "src/hooks/useEffectState";
import {colors} from "../../styles/style";
import {useTranslation} from "react-i18next";
import Decimal from "decimal.js";


export interface IDepthItem {
    quantity:string,
    price:string
}
export interface IDepthData {
    asks:Array<IDepthItem>,
    bids:Array<IDepthItem>
}
type IItem = Array<any>[];
type IProps = {
    bids: IItem,
    asks: IItem,
    width?: number,
    height?: number,
    style?: CSSProperties
    chartStyle?: CSSProperties
    cMargin?: number
    cSpace?: number
    lineColor?: string
    longColor?: string
    shortColor?: string
    lineWidth?: number
    chartSpace?: number
}
export default function DepthChart(props: IProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartRef2 = useRef<HTMLCanvasElement>(null);
    const {t} = useTranslation();
    const [chartInstance, setChartInstance] = useState<CanvasRenderingContext2D | null>();
    const [chartInstance2, setChartInstance2] = useState<CanvasRenderingContext2D | null>();
    const state = useEffectState({
        cWidth: 0,
        cHeight: 0,
        cMargin: 0,
        cSpace: 0,
        originX: 0,
        originY: 0,
        tobalDots: 0,
        tobalDots2: 0,
        dotSpace: 0,
        dotSpace2: 0,
        originX2: 0,
        maxValue: 0,
        maxValue2: 0,
        yMax: 0,
        totalYNomber: 0,
        ctr: 0,
        numctr: 0,
        speed: 0,
        crossArr: [],
        showLabel: false,
        activeIndex: -1,
        activeIndex2: -1,
        chartSpace: props.chartSpace ?? 80,
        showToolTip: false,
        activeX: 0,
        activeY: 0,
        bids: buildData(props.bids.concat()).reverse(),
        asks: buildData(props.asks.concat())
    });
    const tipRef = useRef<HTMLDivElement>(null);
    let timer:NodeJS.Timeout;

    useEffect(() => {
        setChartInstance(chartRef.current?.getContext("2d"));
        setChartInstance2(chartRef2.current?.getContext("2d"));
    }, []);
    useEffect(() => {
        if (chartInstance) {
            initChart();
            initEvent();

        }
    }, [chartInstance]);
    useEffect(() => {
        if (chartInstance) {

        }
        if (chartInstance2) {

        }
        state.bids = buildData(props.bids.concat()).reverse();
        state.asks = buildData(props.asks.concat());
        if (props.bids.length > 0 || props.asks.length > 0) {
            clearArea();
            clearArea2();
            initChart();
            chartRender();
        }
    }, [props.bids, props.asks]);

    function buildData(arr: IItem) {
        let ary:Array<Array<any>> = [];
        let totalAmount = 0;
        arr.forEach((item) => {
            ary.push([item[0], totalAmount]);
            //totalAmount += Number(item[1]);
            totalAmount = Decimal.add(totalAmount, item[1]).toNumber();
        });
        return ary;
    }

    useEffect(() => {
        if (state.activeIndex > 0) {
            state.showLabel = true;
        }
    }, [state.activeIndex]);

    const tipPositionInfo = useMemo<CSSProperties>(() => {
        if (tipRef.current) {
            const marginPoint = 20;
            const tWidth = tipRef.current.clientWidth;
            const tHeight = tipRef.current.clientHeight;
            let left = state.activeX / 2 + marginPoint;
            let _top = state.activeY / 2 + marginPoint;

            if ((state.originY - state.activeY)/2 < (tHeight + marginPoint)) {
                _top = _top - tHeight - marginPoint * 2;
            }
            if ( (state.originX + state.cWidth - state.activeX)/2 < tWidth + marginPoint ) {
                left = left - tWidth - marginPoint * 2;
            }
            return { left: left, top: _top, display: "block" };
        } else {
            return {}
        }
    }, [tipRef.current, state.showToolTip, state.activeX, state.activeY, state.originX, state.originY, tipRef]);

    const selected = useMemo(() => {
        return state.bids[state.activeIndex] || state.asks[state.activeIndex2] || []
    }, [state.activeIndex, state.activeIndex2, state.asks, state.bids]);

    const totalCost = useMemo(() => {
        if (!selected[0] || !selected[1]) {
            return "0";
        }
        return Decimal.mul(selected[0], selected[1]).toFixed();
    }, [selected]);

    function chartRender() {
        drawLineLabelMarkers(); // Drawing chart axes, labels and markers
        drawLineAnimate(); // Animation for drawing line graphs
        drawLineAnimate2();
    }



    // Chart initialization
    function initChart(){
        // Chart Information
        let canvas = chartRef.current!;
        let canvas2 = chartRef2.current!;
        //state.cMargin = 60;
        state.cMargin = props.cMargin ?? 0;
        state.cSpace = props.cSpace ?? 80;
        /*Here's how it works for HD screens.
             method: first set the width and height of the canvas to twice the original (the desired width is the width of the window minus 100px)
             then set style.height and style.width to the original width and height
             This is the equivalent of scaling something twice as large to its original size, so that on an HD screen there can be two pixel values for one pixel location
             The important thing to note is that all the width and height spacing, text size, etc. have to be set to twice the original size in order to work.
        */
        /*canvas.width = Math.floor( (window.innerWidth-100)/2 ) * 2 ;
        canvas.height = 740;*/
        canvas.width = props.width || Math.floor(canvas.parentElement!.offsetWidth*2);
        canvas.height = props.height || Math.floor(canvas.parentElement!.offsetHeight*2);
        canvas.style.height = canvas.height/2 + "px";
        canvas.style.width = canvas.width/2 + "px";

        canvas2.width = props.width || Math.floor(canvas.parentElement!.offsetWidth*2);
        canvas2.height = props.height || Math.floor(canvas.parentElement!.offsetHeight*2);
        canvas2.style.height = canvas.height/2 + "px";
        canvas2.style.width = canvas.width/2 + "px";


        state.cHeight = canvas.height - state.cMargin - state.cSpace;
        //state.cWidth = canvas.width - state.cMargin - state.cSpace;
        state.cWidth = canvas.width - state.cMargin*2 - state.cSpace*2;
        state.originX = state.cMargin + state.cSpace;
        state.originY = state.cMargin + state.cHeight + state.cSpace/2;

        // Folding Line Chart Information
        state.tobalDots = state.bids.length;
        state.tobalDots2 = state.asks.length;
        //state.dotSpace = Math.floor( state.cWidth/state.tobalDots );
        //state.originX+state.cWidth-state.cMargin*2
        state.dotSpace = ((state.cWidth - state.chartSpace)/2)/(state.tobalDots - 1);
        state.dotSpace2 = ((state.cWidth - state.chartSpace)/2)/(state.tobalDots2 - 1);
        state.originX2 =  state.originX + (state.cWidth + state.chartSpace)/2;
        state.maxValue = 0;
        for(let i=0; i<state.bids.length; i++){
            let dotVal = Math.floor( state.bids[i][1] );
            if( dotVal > state.maxValue ){
                state.maxValue = dotVal;
            }
        }
        state.maxValue += 50;
        state.maxValue2 = 0;
        for(let i=0; i<state.asks.length; i++){
            let dotVal = Math.floor( state.asks[i][1] );
            if( dotVal > state.maxValue2 ){
                state.maxValue2 = dotVal;
            }
        }
        state.maxValue2 += 50;
        state.yMax = state.maxValue2 > state.maxValue ? state.maxValue2 : state.maxValue;
        state.totalYNomber = 4;
        // Sports Related
        state.ctr = 1;
        //state.numctr = 100;
        state.numctr = 1;
        state.speed = 6;

        chartInstance!.translate(0.5,0.5);  // When drawing a 1-pixel line only, the coordinate points need to be offset so that a 1-pixel solid line can be drawn
        chartInstance2!.translate(0.5,0.5);
    }

    // Drawing chart axes, labels and markers
    function drawLineLabelMarkers(){
        let ctx = chartInstance!;
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#566a80";
        ctx.strokeStyle = colors.tradeBgColor;
        // y-axis
        // drawLine(state.originX, state.originY, state.originX, state.cMargin);
        // x-axis
        //drawLine(state.originX, state.originY, state.originX+state.cWidth, state.originY);

        // Drawing markers
        //drawMarkers();
    }
    // The method of drawing lines
    function drawLine(x: number, y: number, X: number, Y: number, lineStyle?: any){
        let ctx = chartInstance!;
        if ( lineStyle && lineStyle.color) {
            ctx.strokeStyle = lineStyle.color;
        }
        if ( lineStyle && lineStyle.width) {
            ctx.lineWidth = lineStyle.width;
        }
        if ( lineStyle && lineStyle.isDash) {
            ctx.setLineDash([5]);
        } else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
    }
    function drawLine2(x: number, y: number, X: number, Y: number, lineStyle?: any){
        let ctx = chartInstance2!;
        if ( lineStyle && lineStyle.color) {
            ctx.strokeStyle = lineStyle.color;
        }
        if ( lineStyle && lineStyle.width) {
            ctx.lineWidth = lineStyle.width;
        }
        if ( lineStyle && lineStyle.isDash) {
            ctx.setLineDash([5]);
        } else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
    }
    // Drawing markers
    function drawMarkers(){
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        ctx.strokeStyle = "#E0E0E0";
        ctx.fillStyle = colors.disabledFontColor;
        // Plot the y-axis and the middle horizontal line
        let oneVal = Math.floor(state.yMax/state.totalYNomber);
        ctx.textAlign = "right";
        for(let i = 0; i <= state.totalYNomber; i++){
            let markerVal =  i*oneVal;
            let xMarker = state.originX-5;
            let yMarker = Math.floor( state.cHeight*(1-markerVal/state.yMax) ) + state.cMargin;

            // ctx.fillText(String(markerVal), xMarker, yMarker+3, state.cSpace); // font
            /*if(i>0){
                drawLine(state.originX + 2, yMarker, state.originX + state.cWidth, yMarker);
            }*/
        }
        // Plot the x-axis and the middle vertical line
        ctx.textAlign = "center";
        for(let i=0; i < state.tobalDots; i++){
            let markerVal = state.bids[i][0];
            let xMarker = state.originX + i*state.dotSpace;
            let yMarker = state.originY + 30;
            ctx.fillText(String(markerVal), xMarker, yMarker, state.cSpace); // font
            /*if(i>0){
                drawLine(xMarker, state.originY - 2, xMarker, state.cMargin    );
            }*/
        }
        for(let i=0; i < state.tobalDots2; i++){
            let markerVal = state.asks[i][0];
            let xMarker = i*state.dotSpace2 + state.originX2;
            let yMarker = state.originY + 30;
            ctx.fillText(String(markerVal), xMarker, yMarker, state.cSpace); // font
            /*if(i>0){
                drawLine(xMarker, state.originY - 2, xMarker, state.cMargin    );
            }*/
        }
        // Draw the title y
        ctx.save();
        ctx.rotate(-Math.PI/2);
        //ctx.fillText("y-title", - canvas.height/2, state.cSpace - 10);
        ctx.restore();
        // Draw the title x
        //ctx.fillText("mon", state.originX + state.cWidth/2, state.originY + state.cSpace/2 + 20);
    }

    function drawLineOnly() {
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        ctx.strokeStyle = props.longColor || colors.long;  //"#49FE79";

        //Connections
        ctx.beginPath();
        for(let i=0; i< state.tobalDots; i++){
            let dotVal = state.bids[i][1];
            let barH = Math.floor( state.cHeight*dotVal/state.yMax* state.ctr/state.numctr );//
            let y = state.originY - barH;
            let x = state.originX + state.dotSpace*i;
            if( i===0 ){
                ctx.moveTo( x, y );
            } else {
                ctx.lineTo( x, y );
            }
        }
        ctx.lineWidth = props.lineWidth ?? 2;
        ctx.stroke();
    }

    //Drawing line graphs
    function drawLineAnimate(){
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        drawLineOnly();

        //Background
        ctx.lineTo( state.originX + state.dotSpace * (state.tobalDots-1), state.originY);
        ctx.lineTo( state.originX, state.originY);
        //Background gradient color
        //Histogram gradient color
        let gradient = ctx.createLinearGradient(0, 0, 0, state.yMax);
        gradient.addColorStop(0, 'rgba(177, 224, 247, 0.24)');
        gradient.addColorStop(1, 'rgba(121, 189, 235, 0)');

        ctx.fillStyle = colors.longOpa4;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#566a80";

        //Plot points
        /*for(let i=0; i<state.tobalDots; i++){
            let dotVal = props.dataArr[i][1];
            let barH = Math.floor( state.cHeight*dotVal/state.maxValue * state.ctr/state.numctr );
            let y = state.originY - barH;
            let x = state.originX + state.dotSpace*i;
            drawArc( x, y );  //Plot points
            ctx.fillText(Math.floor(dotVal*state.ctr/state.numctr).toString(), x+15, y-8); // font
        }*/

        if(state.ctr<state.numctr){
            state.ctr++;
            setTimeout(function(){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                drawLineLabelMarkers();
                drawLineAnimate();
            }, state.speed);
        }
    }


    function drawLineOnly2() {
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        ctx.strokeStyle = props.shortColor || colors.short;  //"#49FE79";

        //Connections
        ctx.beginPath();
        for(let i=0; i< state.tobalDots2; i++){
            let dotVal = state.asks[i][1];
            let barH = Math.floor( state.cHeight*dotVal/state.yMax* state.ctr/state.numctr );//
            let y = state.originY - barH;
            let x = state.dotSpace2*i  + state.originX2;
            if( i===0 ){
                ctx.moveTo( x, y );
            } else {
                ctx.lineTo( x, y );
            }
        }
        ctx.lineWidth = props.lineWidth ?? 2;
        ctx.stroke();
    }

    function drawLineAnimate2(){
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        drawLineOnly2();

        //Background
        ctx.lineTo( state.dotSpace2 * (state.tobalDots2-1) + state.originX2, state.originY);
        ctx.lineTo( state.originX2, state.originY);
        //Background gradient color
        //Histogram gradient color
        let gradient = ctx.createLinearGradient(0, 0, 0, state.yMax);
        gradient.addColorStop(0, 'rgba(177, 224, 247, 0.24)');
        gradient.addColorStop(1, 'rgba(121, 189, 235, 0)');

        ctx.fillStyle = colors.shortOpa4;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#566a80";

        //Plot points
        /*for(let i=0; i<state.tobalDots; i++){
            let dotVal = props.dataArr[i][1];
            let barH = Math.floor( state.cHeight*dotVal/state.maxValue * state.ctr/state.numctr );
            let y = state.originY - barH;
            let x = state.originX + state.dotSpace*i;
            drawArc( x, y );  //Plot points
            ctx.fillText(Math.floor(dotVal*state.ctr/state.numctr).toString(), x+15, y-8); // font
        }*/

        if(state.ctr<state.numctr){
            state.ctr++;
            setTimeout(function(){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                drawLineLabelMarkers();
                drawLineAnimate();
            }, state.speed);
        }
    }

    //Drawing dots
    function drawArc( x: number, y: number, color: string = "#DBEEFC"){
        //let canvas = chartRef.current!;
        let ctx = chartInstance2!;
        ctx.beginPath();
        ctx.arc( x, y, 9, 0, Math.PI*2 );
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function initEvent() {
        const chartElement = chartRef2.current!;
        //let timer:NodeJS.Timeout;
        chartElement.addEventListener("mousemove", handleMouseOver);
        chartElement.addEventListener("mouseleave", handleMouseLeave);
    }

    function handleMouseOver(event: MouseEvent) {
        clearTimeout(timer);
        let ctx = chartInstance2!;
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#566a80";
        ctx.strokeStyle = colors.tradeBgColor;

        let offsetXChartContent = event.offsetX * 2 - state.originX;
        let offsetYChartContent = event.offsetY * 2 - state.originY;
        let index = Math.round(offsetXChartContent / state.dotSpace);
        if (offsetXChartContent >=0 && index >= 0 && state.bids[index] && index !== state.activeIndex) {
            state.activeIndex2 = -1;
            clearArea2();
            //chartRender();
            let dotVal = state.bids[index][1];
            /*drawLine2(state.dotSpace * index + state.originX, state.originY, state.dotSpace * index + state.originX, state.cMargin, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });
            let Y = (state.yMax - dotVal) / state.yMax*(state.cHeight) + state.cMargin;
            drawLine2(state.originX, Y, state.originX+state.cWidth, Y, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });*/
            let barH = Math.floor( state.cHeight*dotVal/state.yMax * state.ctr/state.numctr );
            let y = state.originY - barH;
            let x = state.originX + state.dotSpace*index;
            drawArc( x, y, colors.long );
            state.activeIndex = index;
            state.activeX = x;
            state.activeY = y;
            if (state.bids.length > 0) {
                state.showToolTip = true;
            }
        }

        let offsetXChartContent2 = event.offsetX * 2 - state.originX2;
        let index2 = Math.round(offsetXChartContent2 / state.dotSpace2);
        if (offsetXChartContent2 >= 0 && index2 >= 0 && state.asks[index2] && index2 !== state.activeIndex2) {
            state.activeIndex = -1;
            clearArea2();
            //chartRender();
            let dotVal = state.asks[index2][1];
            /*drawLine2(state.dotSpace2 * index2 + state.originX2, state.originY, state.dotSpace2 * index2 + state.originX2, state.cMargin, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });
            let Y = (state.maxValue2 - dotVal) / state.maxValue2*(state.cHeight) + state.cMargin;
            drawLine2(state.originX, Y, state.originX+state.cWidth, Y, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });*/
            let barH = Math.floor( state.cHeight*dotVal/state.yMax * state.ctr/state.numctr );
            let y = state.originY - barH;
            let x = state.originX2 + state.dotSpace2*index2;
            drawArc( x, y, colors.short );
            state.activeIndex2 = index2;
            state.activeX = x;
            state.activeY = y;
            if (state.asks.length > 0) {
                state.showToolTip = true;
            }
        }
    }

    function handleMouseLeave() {
        state.showLabel = false;
        state.activeIndex = -1;
        state.activeIndex2 = -1;
        clearArea2();
        state.showToolTip = false;
        //chartRender();
    }

    function clearArea() {
        let ctx = chartInstance!;
        ctx.clearRect(0, 0,state.originX+state.cWidth, state.originY+state.cSpace);
    }
    function clearArea2() {
        let ctx = chartInstance2!;
        ctx.clearRect(0, 0,state.originX+state.cWidth+state.cSpace, state.originY+state.cSpace);
    }

    return (
        <DepthChartStyle style={props.style}>
            <ChartContainer ref={chartRef} style={props.chartStyle}>

            </ChartContainer>
            <ChartContainer className={"point"} ref={chartRef2} style={props.chartStyle}>

            </ChartContainer>
            {
                state.showToolTip
                    ? <ToolTip ref={tipRef} style={tipPositionInfo}>
                        <div className="item flex-sb">
                            <span className={"label"}>{t(`Price`)}</span>
                            <span>${selected[0]}</span>
                        </div>
                        <div className="item flex-sb">
                            <span className={"label"}>{t(`Total Size`)}</span>
                            <span>{selected[1]}</span>
                        </div>
                        <div className="item flex-sb">
                            <span className={"label"}>{t(`Total Cost`)}</span>
                            <span>${totalCost}</span>
                        </div>
                        {/*<div className="item flex-sb">
                            <span className={"label"}>{t(`Price Impact`)}</span>
                            <span>$240.000</span>
                        </div>*/}
                      </ToolTip>
                    : null
            }

        </DepthChartStyle>
    )
}
