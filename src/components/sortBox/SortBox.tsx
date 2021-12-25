import React, {CSSProperties, useState, useEffect} from 'react';
import {SortStyle} from "./sortBox.style";

interface ISort {
    text: string,
    defaultColor?: string,
    activeColor?:string,
    type?:string,
    disable?:boolean,
    onChange(type:string):void
}
//let defaultColor = "#6C727E";
let activeColor = "#fff";
export default (props:ISort) => {
    const [sortType, setSortType] = useState(props.type || "");
    const [upStyle, setUpStyle] = useState<CSSProperties>({});
    const [downStyle, setDownStyle] = useState<CSSProperties>({});

    useEffect(() => {
        if (props.disable) {
            setSortType("");
        }
    }, [props.disable]);
    useEffect(() => {
        if (sortType === 'up') {
            setUpStyle({borderBottomColor: activeColor});
        } else if(sortType === 'down') {
            setDownStyle({borderTopColor: activeColor});
        }
    }, [sortType]);

    const changeSort = (type:string) => {
        if (type === sortType) {
            setUpStyle({});
            setDownStyle({});
            setSortType("");
            props.onChange("");
        } else {
            setSortType(type);
            props.onChange(type);
        }
    };
    const toggleSort = () => {
        if (!sortType) {
            changeSort("up");
        } else if(sortType === "up"){
            changeSort("down");
        } else {
            changeSort(sortType);
        }
    };

    return (
        <SortStyle className={`flex-row`}>
            <div className={`flex-row`} onClick={toggleSort} style={{cursor: "pointer"}}>
                <span className={"text"}>{props.text}</span>
                <div className={`flex-box triangleBox`}>
                    <div className={`priceUp`} style={(!props.disable && sortType==="up")?upStyle:{}}
                         onClick={(event) => {
                             changeSort("up");
                             event.stopPropagation();
                         }}></div>
                    <div className={"priceDown"} style={(!props.disable && sortType==="down")?downStyle:{}}
                         onClick={(event) => {
                             changeSort('down');
                             event.stopPropagation();
                         }}></div>
                </div>
            </div>
        </SortStyle>
    )
}
