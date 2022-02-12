import React, {CSSProperties} from 'react';
import { useTranslation } from 'react-i18next';
import { ModalBox } from './modal.style';


type IProps = {
    title?: string,
    children?: React.ReactNode
    handleClick?(): void
    close?(): void
    disableHead?: boolean
    style?: CSSProperties
    titleStyle?: CSSProperties
    fullScreen?: boolean
}
export default function Modal(props: IProps) {
    const {t} = useTranslation();

    return (
        <ModalBox onClick={props.handleClick} style={props.fullScreen ? {overflow: "auto"} : {}}>
            <div className={`content borderRadius`} style={props.style}>
                {
                    props.disableHead
                        ? null
                        : <div className={"flex-sb"} style={Object.assign({}, {marginBottom: "0.12rem"}, props.titleStyle)}>
                            <h1 className="title">{props.title}</h1>
                            {/*<div className={"close"} onClick={props.close}>
                                <img src={require("src/assets/images/close.png")} className={"closeIcon"} alt=""/>
                            </div>*/}
                        </div>
                }
                {props.children}
            </div>
        </ModalBox>
    )
}
