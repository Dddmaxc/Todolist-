import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import { useAppSelector } from "../common/hooks/useAppSelector"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../common/theme/theme"
import { Header } from "@/common/components/Header/Header"
import { selectThemeMode } from "./app-slice"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "@/common/routing"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useEffect } from "react"
import { initializeAppTC } from "@/features/auth/model/auth-slice"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing/>
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
