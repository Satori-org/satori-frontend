import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import {useThemeManager} from "./useThemeManager";
import {ITheme} from "../styles/style";


const useTheme = () => {
    const {isDark, toggleTheme} = useThemeManager();
    const theme: ITheme = useContext(StyledThemeContext);
    return { isDark, theme, toggleTheme }
}

export default useTheme
