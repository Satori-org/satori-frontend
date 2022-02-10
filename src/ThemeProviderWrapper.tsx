import React from "react";
import {useThemeManager} from "./hooks/useThemeManager";
import {ThemeProvider} from "styled-components";
import {dark} from "./styles/dark.style";
import {light} from "./styles/light.style";

export function ThemeProviderWrapper(props: any) {
    const {isDark} = useThemeManager();

    return <ThemeProvider theme={isDark ? dark : light} {...props}>
        {props.children}
    </ThemeProvider>
}
