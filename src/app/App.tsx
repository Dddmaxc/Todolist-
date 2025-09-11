import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import { useAppSelector } from "../common/hooks/useAppSelector"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../common/theme/theme"
import { Main } from "./Main"
import { Header } from "@/common/components/Header/Header"
import { selectThemeMode } from "./app-slice"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
