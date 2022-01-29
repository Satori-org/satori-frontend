import React, {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react';
import {ActiveLabel, ChartContainer, ChartTitle, LineChartStyle} from './LineChart.style';
import {useEffectState} from "src/hooks/useEffectState";
import {colors} from "../../styles/style";
import Toggle from '../toggle/Toggle';


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
    lineWidth?: number
}
export default function LineChart(props: IProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<CanvasRenderingContext2D | null>();
    const state = useEffectState({
        cWidth: 0,
        cHeight: 0,
        cMargin: 0,
        cSpace: 0,
        originX: 0,
        originY: 0,
        tobalDots: 0,
        dotSpace: 0,
        maxValue: 0,
        totalYNomber: 0,
        ctr: 0,
        numctr: 0,
        speed: 0,
        crossArr: [],
        showLabel: false,
        activeIndex: 0
    });
    let timer:NodeJS.Timeout;

    useEffect(() => {
        setChartInstance(chartRef.current?.getContext("2d"));
    }, []);
    useEffect(() => {
        if (chartInstance) {
            initChart();
            if (!props.onlyLine) {
                initEvent();
            }
            chartRender();
        }
    }, [chartInstance]);
    useEffect(() => {
        if (state.activeIndex > 0) {
            state.showLabel = true;
        }
    }, [state.activeIndex]);

    function chartRender() {
        if (props.onlyLine) {
            drawLineOnly();
        } else {
            drawLineLabelMarkers(); // Drawing chart axes, labels and markers
            drawLineAnimate(); // Animation for drawing line graphs
        }
    }



    // Chart initialization
    function initChart(){
        // Chart Information
        let canvas = chartRef.current!;
        //state.cMargin = 60;
        if (!props.onlyLine) {
            state.cMargin = props.cMargin ?? 60;
            state.cSpace = props.cSpace ?? 80;
        }
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

        state.cHeight = canvas.height - state.cMargin - state.cSpace;
        //state.cWidth = canvas.width - state.cMargin - state.cSpace;
        state.cWidth = canvas.width - state.cMargin;
        state.originX = state.cMargin + state.cSpace;
        state.originY = state.cMargin + state.cHeight;

        // Folding Line Chart Information
        state.tobalDots = props.dataArr.length;
        if (props.onlyLine) {
            state.dotSpace = Math.floor( state.cWidth/(state.tobalDots - 1) );
        } else {
            state.dotSpace = Math.floor( state.cWidth/state.tobalDots );
        }
        state.maxValue = 0;
        for(let i=0; i<props.dataArr.length; i++){
            let dotVal = Math.floor( props.dataArr[i][1] );
            if( dotVal > state.maxValue ){
                state.maxValue = dotVal;
            }
        }
        state.maxValue += 50;
        state.totalYNomber = 4;
        // Sports Related
        state.ctr = 1;
        //state.numctr = 100;
        state.numctr = 1;
        state.speed = 6;

        chartInstance!.translate(0.5,0.5);  // When drawing a 1-pixel line only, the coordinate points need to be offset so that a 1-pixel solid line can be drawn
    }

    // Drawing chart axes, labels and markers
    function drawLineLabelMarkers(){
        let ctx = chartInstance!;
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#566a80";
        ctx.strokeStyle = colors.tradeBgColor;
        // y-axis
        drawLine(state.originX, state.originY, state.originX, state.cMargin);
        // x-axis
        drawLine(state.originX, state.originY, state.originX+state.cWidth-state.cMargin*2, state.originY);

        // Drawing markers
        drawMarkers();
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

    // Drawing markers
    function drawMarkers(){
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        ctx.strokeStyle = "#E0E0E0";
        ctx.fillStyle = colors.disabledFontColor;
        // Plot the y-axis and the middle horizontal line
        let oneVal = Math.floor(state.maxValue/state.totalYNomber);
        ctx.textAlign = "right";
        for(let i = 0; i <= state.totalYNomber; i++){
            let markerVal =  i*oneVal;
            let xMarker = state.originX-5;
            let yMarker = Math.floor( state.cHeight*(1-markerVal/state.maxValue) ) + state.cMargin;

            ctx.fillText(String(markerVal), xMarker, yMarker+3, state.cSpace); // font
            /*if(i>0){
                drawLine(state.originX + 2, yMarker, state.originX + state.cWidth, yMarker);
            }*/
        }
        // Plot the x-axis and the middle vertical line
        ctx.textAlign = "center";
        for(let i=0; i < state.tobalDots; i++){
            let markerVal = props.dataArr[i][0];
            let xMarker = state.originX + i*state.dotSpace;
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
        ctx.strokeStyle = props.lineColor || colors.activeColor;  //"#49FE79";

        //Connections
        ctx.beginPath();
        for(let i=0; i< state.tobalDots; i++){
            let dotVal = props.dataArr[i][1];
            let barH = Math.floor( state.cHeight*dotVal/state.maxValue* state.ctr/state.numctr );//
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
        let gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, 'rgba(177, 224, 247, 0.24)');
        gradient.addColorStop(1, 'rgba(121, 189, 235, 0)');

        ctx.fillStyle = gradient;
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
    function drawArc( x: number, y: number){
        let canvas = chartRef.current!;
        let ctx = chartInstance!;
        ctx.beginPath();
        ctx.arc( x, y, 9, 0, Math.PI*2 );
        ctx.fillStyle = "#DBEEFC";
        ctx.fill();
        ctx.closePath();
    }

    function initEvent() {
        const chartElement = chartRef.current!;
        //let timer:NodeJS.Timeout;
        chartElement.addEventListener("mousemove", handleMouseOver);
        chartElement.addEventListener("mouseleave", handleMouseLeave);
    }

    function handleMouseOver(event: MouseEvent) {
        clearTimeout(timer);
        let offsetXChartContent = event.offsetX * 2 - state.originX;
        let offsetYChartContent = event.offsetY * 2 - state.originY;
        let index = Math.round(offsetXChartContent / state.dotSpace);
        if (index > 0 && props.dataArr[index]) {
            clearArea();
            chartRender();
            let dotVal = props.dataArr[index][1];
            drawLine(state.dotSpace * index + state.originX, state.originY, state.dotSpace * index + state.originX, state.cMargin, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });
            let Y = (state.maxValue - dotVal) / state.maxValue*(state.cHeight) + state.cMargin;
            drawLine(state.originX, Y, state.originX+state.cWidth, Y, {
                color: "#8A97A3",
                width: 1,
                isDash: true
            });
            let barH = Math.floor( state.cHeight*dotVal/state.maxValue * state.ctr/state.numctr );
            let y = state.originY - barH;
            let x = state.originX + state.dotSpace*index;
            drawArc( x, y );  //绘制点
            state.activeIndex = index;
        }
    }

    function handleMouseLeave() {
        state.showLabel = false;
        state.activeIndex = 0;
        clearTimeout(timer);
        clearArea();
        chartRender();
    }

    function clearArea() {
        let ctx = chartInstance!;
        ctx.clearRect(0, 0,state.originX+state.cWidth, state.originY+state.cSpace);
    }

    return (
        <LineChartStyle style={props.style}>
            {
                props.title ? <ChartTitle>{props.title}</ChartTitle> : null
            }
            <ChartContainer ref={chartRef} style={props.chartStyle}>

            </ChartContainer>
            <Toggle vIf={state.showLabel}>
                <ActiveLabel style={{left: `${(state.dotSpace * state.activeIndex + state.cSpace+state.cMargin)/2}px`}}>{props.dataArr[state.activeIndex] && props.dataArr[state.activeIndex][1]}</ActiveLabel>
            </Toggle>
        </LineChartStyle>
    )
}
