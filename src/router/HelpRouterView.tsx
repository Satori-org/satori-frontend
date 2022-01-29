import React from 'react';
import {ReactRouter} from 'src/react-router-perfect/Index';
import {Iroutes} from "../react-router-perfect/types";

const Document = () => import(/* webpackChunkName: "help" */"src/views/help/document/Document");
const Protocol = () => import(/* webpackChunkName: "help" */"src/views/help/document/Protocol");
const Announcement = () => import(/* webpackChunkName: "help" */"src/views/help/announcement/Announcement");
const AnnouncementDetail = () => import(/* webpackChunkName: "help" */"src/views/help/announcement/AnnouncementDetail");

export default function HelpRouterView() {

    const routes: Iroutes[] = [
        {
            path: "/help/document",
            component: Document,
            exact: true
        },
        {
            path: "/help/document/protocol",
            component: Protocol
        },
        {
            path: "/help/announcement",
            component: Announcement,
            exact: true
        },
        {
            path: "/help/announcement/detail",
            component: AnnouncementDetail
        }
    ];

    return (
        <ReactRouter routes={routes} />
    )
}
