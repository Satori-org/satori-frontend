import React from 'react';
import {NUMBER_REG} from "src/common/regExp";
import {isInputNumber} from "src/common/utilTools";
import Input, {IdefalutProps} from "../form/Input";
import {useEffectState} from "src/hooks/useEffectState";

interface IProps extends IdefalutProps {
    decimal?: number
}
export default function InputNumber(props: IProps) {
    const state = useEffectState({
        placeholder: props.placeholder || ""
    });

    const { simpleBorder, inputStyle,hideTips, ...rest } = props;
    return (
        <Input label={props.label}
               right={props.right}
               inputStyle={props.inputStyle || {width: "80px", textAlign: "right"}}
               {...rest}
               placeholder={state.placeholder}
               hideTips={true}
               regex={[{regStr: NUMBER_REG, tips: ""}]}
               onFocus={() => state.placeholder = ""}
               onBlur={() => state.placeholder = props.placeholder || ""}
               onChange={(value) => {
                   if (props.onChange && (value === "" || isInputNumber(value))) {
                       //state.price = value;
                       props.onChange(value)
                   }
               }}  />
    )
}
