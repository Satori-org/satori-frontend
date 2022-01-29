import React, {CSSProperties, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {useEffectState} from "src/hooks/useEffectState";
import Toggle from '../toggle/Toggle';
import {ArrowIcon, More, PageItem, PaginationStyle} from "./Pagination.style";

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
    const state = useEffectState({
        current: props.current ?? 1,
        visible: props.visible ?? 5,
        currentVisibleIndex: 1,
        pageSize: props.pageSize ?? 10
    });

    useEffect(() => {
        props.onChange(state.current);
    }, [state.current]);

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

    const visiblePages = useMemo(() => {
        if (state.currentVisibleIndex === 1) {
            return pages.slice(0, state.visible);
        }
        let prePages = state.currentVisibleIndex * state.visible;
        if (pages.length - prePages < state.visible) {
            return pages.slice(pages.length - 5);
        }
        let start = (state.currentVisibleIndex - 1) * state.visible;
        return pages.slice(start, start + state.visible);
    }, [pages, state.currentVisibleIndex]);

    function pre() {
        if (state.current > 1 ) {
            state.current--;
        }
    }

    function next() {
        if (state.current < lastPage ) {
            state.current++;
        }
    }

    return (
        <PaginationStyle style={Object.assign({textAlign: "right", marginTop: "30px"}, props.style)}
                         className={props.className}>
            { props.total
                ? <div className={"flex-row"} style={{justifyContent: "flex-end"}}>
                    <ArrowIcon className={"arrowLeft"} onClick={pre}></ArrowIcon>
                    <PageItem className={`${state.current === 1 ? 'active' : ''}`} onClick={() => state.current = 1}>1</PageItem>
                    <Toggle vIf={state.currentVisibleIndex > 1}>
                        <More className={"more"} onClick={() => {
                            if (state.currentVisibleIndex > 1) {
                                state.currentVisibleIndex--;
                            }
                        }}>...</More>
                    </Toggle>
                    {
                        visiblePages.map((item) => {
                            return <PageItem className={`${state.current === item ? 'active' : ''}`} key={item}
                                             onClick={() => state.current = item}>{item}</PageItem>
                        })
                    }
                    <Toggle vIf={visiblePages.length === state.visible && (visiblePages[visiblePages.length - 1] + 1 < lastPage)}>
                        <More className={"more"} onClick={() => {
                            state.currentVisibleIndex++;
                        }}>...</More>
                    </Toggle>
                    <Toggle vIf={props.total > state.pageSize}>
                        <PageItem className={`${state.current === lastPage ? 'active' : ''}`}
                                  onClick={() => state.current = lastPage}>{lastPage}</PageItem>
                    </Toggle>
                    <ArrowIcon className={"arrowRight"} onClick={next}></ArrowIcon>
                  </div>
                : null
            }
        </PaginationStyle>
    )
}
