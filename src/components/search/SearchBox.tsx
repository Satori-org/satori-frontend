import React, {ChangeEvent, useState} from 'react';
import {SearchBoxStyle} from "./searchBox.style";

interface ISearch {
    style?: React.CSSProperties,
    placeholder: string,
    onSearch(key:string):void,
    clearnable?: boolean
}
export default function SearchBox(props:ISearch) {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState(false);
    const [showClearn, setClearnStatus] = useState(false);

    function change(event:ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    // @ts-***
    // @ts-ignore
    function doSearch(event:KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13 && props.onSearch) {
            props.onSearch(value);
        }
    }

    return (
        <SearchBoxStyle className={`${status?'active':''}`} style={props.style}
             onMouseOver={() => setClearnStatus(true)}
             onMouseLeave={() => setClearnStatus(false)}>
            <img src={require("src/assets/images/search-icon.png")} className={'searchIcon'} alt="" onClick={() => props.onSearch(value)} />
            <input type="text" className={'searchText'} placeholder={props.placeholder} value={value}
                   onChange={change}
                   onKeyDown={doSearch}
                   onFocus={() => setStatus(true)}
                   onBlur={() => setStatus(false)}
            />
            {/*{
                (props.clearnable && showClearn)?<img className={styles.clearIcon} src={require("src/assets/images/close.png")} alt=""
                                onClick={() => {
                                    setValue("");
                                    props.search("");
                                }} />:null
            }*/}
        </SearchBoxStyle>
    )
}

