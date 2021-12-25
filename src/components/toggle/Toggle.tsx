import React, {ReactNode, useEffect} from 'react';
import {useEffectState} from "../../hooks/useEffectState";

type IProps = {
    children: ReactNode
    vIf: boolean
}
export default function Toggle(props: IProps) {
    const state = useEffectState({
        element: null as any,
    });
    useEffect(() => {
        let match = false;
        state.element = null;
        React.Children.forEach( props.children ,(item: any, index) => {
            if (match) {
                return;
            }

            if (props.vIf && index === 0) {
                match = true;
                state.element = item;
            } else if(!props.vIf && index === 1) {
                match = true;
                state.element = item;
            }
        })
    }, [props.vIf, props.children]);

    return <>
        {state.element ? React.cloneElement(state.element) : null }
    </>
}
