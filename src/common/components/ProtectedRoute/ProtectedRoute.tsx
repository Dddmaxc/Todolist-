import { Path } from "@/common/routing/Routing"
import { Navigate, Outlet } from "react-router"

type ProtectedRouteProps = {
  children?: React.ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}
