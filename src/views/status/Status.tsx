import React from 'react';
import { useTranslation } from 'react-i18next';
import {StatusList, StatusStyle, StatusTitle} from './Status.style';
import StatusItem from './StatusItem';
import {useFetchPostArr} from "src/ajax";
import {getNotice, INotice} from 'src/ajax/types';

export default function Status() {
    const {t} = useTranslation();
    const { data, loading, reload } = useFetchPostArr<INotice>(getNotice);

    return (
        <StatusStyle>
            <div className="content">
                <StatusTitle>{t(`Status`)}</StatusTitle>
                <StatusList>
                    {
                        data.map((item) => {
                            return <StatusItem data={item} key={item.id}></StatusItem>
                        })
                    }
                </StatusList>
            </div>
        </StatusStyle>
    )
}
