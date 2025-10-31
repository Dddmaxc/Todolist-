import { Main } from "@/app/Main"
import { Login } from "@/features/todolist/ui/login/Login"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../pageNotFound/PageNotFound"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { useAppSelector } from "../hooks/useAppSelector"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLogout = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLogout} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<h2>Faq</h2>} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!isLogout} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
