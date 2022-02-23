import React, {CSSProperties, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from '../toggle/Toggle';
import {ArrowIcon, More, PageItem, PaginationStyle} from "./Pagination.style";
import {useThemeManager} from "src/hooks/useThemeManager";

interface IPagination{
    total: number
    pageSize?: number
    current?: number
    onChange(page: number): void
    style?: CSSProperties
    className?: string
    visible?: number
    justifyCcontent?: string
}
export default function Pagination(props:IPagination) {
    const {t} = useTranslation();
    const {isDark} = useThemeManager();
    const state = useEffectState({
        current: props.current ?? 1,
        visible: props.visible ?? 5,
        visibleStart: 0,
        currentVisibleIndex: 1,
        pageSize: props.pageSize ?? 10
    });

    /*useEffect(() => {
        props.onChange(state.current);
    }, [state.current]);*/
    useEffect(() => {
        if (props.current && props.current !== state.current) {
            state.current = props.current;
        }
    }, [props.current, state.current]);

    useEffect(() => {
        //state.current = 1;
        state.visibleStart = 0;
    }, [props.total]);
    const pages = useMemo(() => {
        const max = Math.ceil(props.total/state.pageSize);
        let arr = new Array(max).fill("").map((item,index) => {
            return index + 1;
        });
        return arr.slice(1,-1);
    }, [props.total, state.pageSize]);
    const lastPage = useMemo(() => {
        return props.total <= state.pageSize ? 1 : pages.length + 2;
    }, [pages, props.total, state.pageSize]);

    /*useEffect(() => {
        if (state.currentVisibleIndex === 1) {
            state.visibleStart = 0;
        }
        state.visibleStart = (state.currentVisibleIndex - 1) * state.visible;
    }, [state.currentVisibleIndex, state.visible]);*/

    const visiblePages = useMemo(() => {
        /*let prePages = state.currentVisibleIndex * state.visible;
        if (pages.length - prePages < state.visible) {
            return pages.slice(pages.length - 5);
        }*/
        return pages.slice(state.visibleStart, state.visibleStart + state.visible);
    }, [pages, state.visibleStart, state.visible]);
    useEffect(() => {

    }, [visiblePages]);

    function pre() {
        if (state.current === 1 ) {
            return;
        }
        state.current--;
        if (!visiblePages.includes(state.current) && state.visibleStart > 0) {
            state.visibleStart -= 1;
        }
        props.onChange(state.current);
    }

    function next() {
        if (state.current === lastPage ) {
            return;
        }
        state.current++;
        if (!visiblePages.includes(state.current) && (state.visibleStart + state.visible) < pages.length) {
            state.visibleStart += 1;
        }
        props.onChange(state.current);
    }

    return (
        <PaginationStyle style={Object.assign({textAlign: "right", marginTop: "30px"}, props.style)}
                         className={props.className}>
            { props.total
                ? <div className={"flex-row"} style={{justifyContent: "flex-end"}}>
                    <ArrowIcon className={"arrowLeft"}
                               src={isDark?require("src/assets/images/dark/pre.png"):require("src/assets/images/light/pre.png")}
                               onClick={pre} />
                    <PageItem className={`${state.current === 1 ? 'active' : ''}`} onClick={() => {
                        state.current = 1;
                        props.onChange(1);
                    }}>1</PageItem>
                    <Toggle vIf={state.visibleStart > 0}>
                        <More className={"more"} onClick={() => {
                            /*if (state.currentVisibleIndex > 1) {
                                state.currentVisibleIndex--;
                            }*/
                            if (state.visibleStart - state.visible < 0) {
                                state.visibleStart = 0;
                            } else {
                                state.visibleStart -= state.visible;
                            }
                        }}>...</More>
                    </Toggle>
                    {
                        visiblePages.map((item) => {
                            return <PageItem className={`${state.current === item ? 'active' : ''}`} key={item}
                                             onClick={() => {
                                                 state.current = item;
                                                 props.onChange(item);
                                             }}>{item}</PageItem>
                        })
                    }
                    <Toggle vIf={visiblePages.length === state.visible && (visiblePages[visiblePages.length - 1] + 1 < lastPage)}>
                        <More className={"more"} onClick={() => {
                            // state.currentVisibleIndex++;
                            if (lastPage - (state.visibleStart + state.visible + 1) - 1 < state.visible) {
                                state.visibleStart = lastPage - state.visible - 2;
                            } else {
                                state.visibleStart += state.visible;
                            }
                        }}>...</More>
                    </Toggle>
                    <Toggle vIf={props.total > state.pageSize}>
                        <PageItem className={`${state.current === lastPage ? 'active' : ''}`}
                                  onClick={() => {
                                      state.current = lastPage;
                                      props.onChange(lastPage);
                                  }}>{lastPage}</PageItem>
                    </Toggle>
                    <ArrowIcon className={"arrowRight"}
                               src={isDark?require("src/assets/images/dark/pre.png"):require("src/assets/images/light/pre.png")}
                               onClick={next} />
                  </div>
                : null
            }
        </PaginationStyle>
    )
}
