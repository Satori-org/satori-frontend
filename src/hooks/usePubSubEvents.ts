import {useEffect} from "react";
import PubSub from "pubsub-js";

export function usePubSubEvents(message: string, event: Function) {
    useEffect(() => {
        const namespace = PubSub.subscribe(message, () => {
            event();
        });

        return () => {
            PubSub.unsubscribe(namespace);
        }
    }, [message, event]);
}
