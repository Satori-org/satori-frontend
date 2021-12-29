import React, {useCallback, useRef, useEffect, useState} from 'react';
import {SliderStyle, StepItem} from "./slider.style";
import {colors} from "../../styles/style";

type Iitem = {value: number};
interface ISlider {
    marks: Array<Iitem>,
    disabled?: boolean,
    value?:number,
    onChange(value:number):void,
    tipFormatter?(value:number):JSX.Element,
    stepClassName?: string
}

export default function RSlider(props:ISlider) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [parentX, setParentX] = useState(0);
    //const [clientX, setClientX] = useState(0);
    const [parentWidth, setParentWidth] = useState(0);
    const [percen, setPercen] = useState(props.value || 0);
    const [value, setValue] = useState( 0);
    const [hover, setHover] = useState( false);
    const parentXRef = useRef(0);
    const parentWidthRef = useRef(0);
    const disableRef = useRef(props.disabled);

    useEffect(() => {
        disableRef.current = props.disabled;
    }, [props.disabled]);
    useEffect(() => {
        if (typeof props.value === 'number' && !props.disabled) {
            setPercen(props.value);
        }
    }, [props.value, props.disabled]);

    useEffect(() => {
        parentXRef.current = parentX;
    }, [parentX]);
    useEffect(() => {
        parentWidthRef.current = parentWidth;
    }, [parentWidth]);
    useEffect(() => {
        props.onChange(value);
    }, [value]);

    useEffect(() => {
        getParentParams();
        document.addEventListener("click", documentClick);
        return () => {
            //removeMouseEvent();
            document.removeEventListener("click", documentClick);
        };
    }, []);
    /*拖动鼠标*/
    function handleMouse (event:MouseEvent|React.MouseEvent<HTMLSpanElement>, left?:number) {
        let mouseX = left || event.clientX;
        //setClientX(mouseX);
        let value = (mouseX - parentXRef.current)/parentWidthRef.current*100;
        if (value >= props.marks[props.marks.length - 1].value) {
            value = 100;
        }else if(value <= props.marks[0].value) {
            value = 0;
        }
        setPercen(value);
        setValue(value);
    }
    /*鼠标按下*/
    function handleHold(event:React.MouseEvent<HTMLSpanElement>) {
        if (disableRef.current) {
            return;
        }
        setHover(true);
        addMouseEvent();
        getParentParams();
        event.stopPropagation();
        event.preventDefault();
    }
    function getParentParams() {
        if (!sliderRef.current) {
            return;
        }
        let paren_x = sliderRef.current.getBoundingClientRect().left;
        let paren_width = sliderRef.current.offsetWidth;
        setParentX(paren_x);
        setParentWidth(paren_width);
    }
    function clickProcess(event:React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        if (disableRef.current) {
            return;
        }
        setHover(true);
        getParentParams();
        let left = event.clientX;
        setTimeout(() => {
            handleMouse(event, left);
        }, 0);
    }
    function clickItem(event:React.MouseEvent<HTMLSpanElement>, item:Iitem) {
        if (!disableRef.current) {
            setPercen(item.value);
            setValue(item.value);
        }
        event.stopPropagation();
    }
    function addMouseEvent() {
        window.addEventListener("mousemove", handleMouse);
        window.addEventListener("mouseup", removeMouseEvent);
    }
    function removeMouseEvent(event: MouseEvent) {
        window.removeEventListener("mousemove", handleMouse);
        event.stopPropagation();
    }
    function documentClick() {
        setHover(false);
    }
    return (
        <SliderStyle style={{background: `linear-gradient(90deg, ${colors.activeColor} 0,${colors.activeColor} ${percen}%,${colors.inputBgColor} ${percen}%,${colors.inputBgColor} 100%)`}}
             onClick={useCallback(clickProcess, [])}
             ref={sliderRef}>
            {
                props.marks.map((item, index) => {
                    return (
                        <StepItem className={`${percen>=item.value?"active":""}`} key={index}
                              onClick={(event) => clickItem(event, item)}
                              style={{left: `${item.value}%`}}>
                        </StepItem>
                    )
                })
            }
            <div className={`step ${props.disabled?"disabled":""} ${hover?"hover":""} ${props.stepClassName??""}`}
                 onMouseDown={useCallback(handleHold, [])}
                 onMouseOver={() => !props.disabled && setHover(true)}
                 /*onMouseLeave={() => setHover(false)}*/
                 style={{transform: `translate(${percen/100*parentWidth}px, -50%)`}}>
                {
                    hover?(
                        <div className={"tip"}>
                            {props.tipFormatter && props.tipFormatter(Math.ceil(percen))}
                        </div>
                    ):null
                }
            </div>
        </SliderStyle>
    )
}
