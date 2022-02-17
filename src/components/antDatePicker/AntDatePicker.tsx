import React, {useEffect, useRef} from 'react';
import {DatePicker, Tooltip} from 'antd';
import {PickerProps} from "antd/lib/date-picker/generatePicker";
import {Moment} from "moment";
import 'moment/locale/zh-cn';
import 'moment/locale/ka';
import {useTranslation} from "react-i18next";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import {useEffectState} from "../../hooks/useEffectState";

type PickerPropType = PickerProps<Moment>;
interface IProps{
    warnText?: string
    required?: boolean
}
export default function AntDatePicker(props: PickerPropType & IProps) {
    const {t} = useTranslation();
    const contarinRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const state = useEffectState({
        value: "",
        visible: false
    });

    useEffect(() => {
        let Observer = new MutationObserver(function () {
            if (inputRef.current!.dataset.verror && props.required) {
                state.visible = !state.value || state.value.length === 0;
            }
        });

        Observer.observe(inputRef.current!, { attributes: true })
    }, []);

    function onChange(moment: any, value: string) {
        console.log(value);
        state.value = value;
        state.visible = !value;
        props.onChange && props.onChange(moment, value);
    }

    return (
        <div style={{position: "relative"}} ref={contarinRef}>
            <Tooltip visible={state.visible} title={props.warnText || t(`请选择日期`)} placement={"leftTop"} getPopupContainer={() => contarinRef.current!}>
                <DatePicker {...props} size={"large"} style={props.style || {width: "100%", height: "48px", borderRadius: "8px"}}
                            onChange={onChange}>
                    <span>132456879</span>
                </DatePicker>
            </Tooltip>
            <input type="text" name={props.name}
                   value={state.value}
                   ref={inputRef} data-verror={(!state.value || state.value.length === 0) ? 'true' : ''}
                   data-vtype={typeof state.value}
                   style={{position: "absolute", pointerEvents: "none", left: 0, opacity: 0, width: "0px"}} />
        </div>
    )
}
