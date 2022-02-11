import {useStore} from "react-redux";
import {IState} from "../store/reducer";
import {useCallback} from "react";
import {mapDispatchToProps} from "../store/connect";
import {THEME} from "../common/enum";

export function useThemeManager() {
    const store = useStore<IState>();
    const storeData = store.getState();
    const dispatch = mapDispatchToProps(store.dispatch);

    const toggleTheme = useCallback(() => {
        dispatch.toggleTheme(storeData.theme === THEME.dark ? THEME.light : THEME.dark)
    }, [dispatch, storeData.theme]);

    return {isDark: storeData.theme === THEME.dark, toggleTheme}
}
