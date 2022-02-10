import React, {CSSProperties, ReactNode} from 'react';
import { Submit, Loading } from './loadingButton.style';
import {getWalletProvider} from "src/config";

interface IProps {
    loading:boolean,
    text?:string,
    loadingText?:string,
    children?:ReactNode,
    onClick?(event?:React.MouseEvent<HTMLButtonElement>):void,
    style?:CSSProperties,
    className?: string
}
export default function LoadButton(props: IProps) {

    return (
        <Submit className={`flex-box ${props.loading?'loading':''} ${props.className || ''}`} style={props.style}
                disabled={props.loading || !getWalletProvider()}
                onClick={props.onClick}>
            {/*{
                props.loading?<Loading inline={true} width={"10"} color={"#fff"}></Loading>:null
            }*/}
            <Loading>{(props.loading && typeof props.loadingText !== 'undefined')?props.loadingText:props.text}</Loading>
            { !props.text ? props.children : null }
        </Submit>
    )
}
