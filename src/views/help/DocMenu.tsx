import React, {ReactNode, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import { RouterLink } from 'src/react-router-perfect/Index';
import {DocMenuStyle, RowStyle} from './styles/DocMenu.style';
import {useEffectState} from "../../hooks/useEffectState";
import Toggle from "../../components/toggle/Toggle";



type IRoute = {text: string, pathname: string, children?: IRoute[]}
type IRow = {
    item: IRoute
    children?: ReactNode
};
function Row(props: IRow) {
    const state = useEffectState({
        showChild: false,
        selected: false
    });

    return <RowStyle>
        <RouterLink to={props.item.pathname}
                    className={"flex-sb menuParent"}
                    activeClassName={"active"}
                    exact={!!(props.item.children && props.item.children.length > 0)}
                    activeCallback={(active) => state.selected = active}
                    beforeOnClick={() => {
                        if (props.item.children && props.item.children.length > 0) {
                            state.showChild = !state.showChild
                        }
                    }}>
            <span className={"parentLabel"}>{props.item.text}</span>
            <img src={state.selected ? require("src/assets/images/arrow_right_active.png") : require("src/assets/images/arrow_right.png")}
                 className={`icon ${state.showChild ? 'active' : ''}`} alt="" />
        </RouterLink>
        <Toggle vIf={state.showChild}>
            <ul className={"childrenBox"}>
                {
                    props.item.children?.map((item, index) => {
                        return <li key={index} className={"flex-row"}>
                            <RouterLink to={item.pathname} className={"child"} activeClassName={"activeItem"}>{item.text}</RouterLink>
                        </li>

                    })
                }
            </ul>
        </Toggle>
    </RowStyle>
}

export default function DocMenu() {
    const {t} = useTranslation();

    const list = useMemo(() => {
        return [
            {
                text: t(`document`),
                pathname: "/help/document",
                children: [
                    {text: t(`Introduction`), pathname: "/help/document/protocol"},
                    {text: t(`Guide`), pathname: "/help/document/guide"},
                    {text: t(`Questions`), pathname: "/help/document/questions"},
                ]
            },
            {text: t(`Announcement`), pathname: "/help/announcement", children: []},
        ]
    }, [t]);

    return (
        <DocMenuStyle>
            <h3 className={"title"}>{t(`Help Center`)}</h3>
            <ul>
                {
                    list.map((item, index) => {
                        return <Row key={index} item={item}></Row>
                    })
                }
            </ul>

        </DocMenuStyle>
    )
}
