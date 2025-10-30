import { AppBar, Container, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { getTheme } from "@/common/theme/theme"
import { changeThemeMode, selectStatus, selectThemeMode } from "@/app/app-slice"
import { containerSx } from "@/common/styles/container.styles"
import { NavButton } from "../NavButton/NavButton"
import { logoutTC, selectIsLoggedIn } from "@/features/auth/model/auth-slice"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const setStatus = useAppSelector(selectStatus)
  const isLogged = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(
      changeThemeMode({
        themeMode: themeMode === "light" ? "dark" : "light",
      }),
    )
  }

  const logautHandler = () => {
    dispatch(logoutTC())
  }


  return (
    <>
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar>
          <Container maxWidth={"lg"} sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              {isLogged && <NavButton onClick={logautHandler}>Logaut</NavButton>}
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color={"default"} onChange={changeMode} />
            </div>
          </Container>
        </Toolbar>
        {setStatus === "loading" && <LinearProgress />}
      </AppBar>
    </>
  )
}
