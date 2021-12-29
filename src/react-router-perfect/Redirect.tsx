import React, {useEffect} from 'react';
import {$router} from "./Index";

export default function Redirect(props: {to: string}) {

    useEffect(() => {
        $router.push({pathname: props.to})
    }, []);

    return (
        <></>
    )
}
