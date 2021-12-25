import {AnyAction} from "redux";

export const actions = {
    ADD: "ADD"
};

export const initState = {
    count: 0
};

export function reducer(state: typeof initState, action: AnyAction): typeof initState {
    switch (action.type) {
        case actions.ADD:
            return {...state, count: action.data};
        default:
            return state;
    }
}
