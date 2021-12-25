import React, {CSSProperties, useEffect, useMemo} from 'react';
import {TabSlider, TabStyle} from './Tab.style';
import {useEffectState} from "../../hooks/useEffectState";

type IProps = {
    options: {text: string}[]
    onChange(active: number): void
    defaultAcitive?: number
}
export default function Tab(props: IProps) {
    const state = useEffectState({
         active: props.defaultAcitive ?? 0
    });

    useEffect(() => {
        props.onChange(state.active);
    }, [state.active]);

    const sliderStyle = useMemo((): CSSProperties => {
        return {
            transform: `translate(${state.active*100}%)`
        }
    }, [state.active]);

    return (
        <TabStyle len={props.options.length}>
            {
                props.options.map((item,index) => {
                    return <div className={`item ${state.active === index ? 'active' : ''}`}
                                key={index}
                                onClick={() => {
                                    state.active = index;
                                }}>{item.text}</div>
                })
            }
            <TabSlider len={props.options.length} style={sliderStyle} />
        </TabStyle>
    )
}
