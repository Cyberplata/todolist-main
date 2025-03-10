import { useAppSelector } from "common/hooks"
import { Path } from "common/routing/Routing"
import { type ReactNode, useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import { selectIsLoggedIn } from "../../features/auth/model"

// Это HOC-компонент (Higher Order Component), который оборачивает защищённые страницы
// Если isLoggedIn = true, рендерит children (нужную страницу).
// Если isLoggedIn = false, перенаправляет пользователя на /login.

type Props = {
   // children: JSX.Element | null
   children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   const navigate = useNavigate()

   useEffect(() => {
      if (!isLoggedIn) {
         navigate(Path.Login)
      }
   }, [isLoggedIn, navigate])

   if (!isLoggedIn) return null // Важно: возвращаем что-то (ReactNode)

   return <>{children}</>

   // return isLoggedIn ? <>{children}</> : <Navigate to={Path.Login}/>;
   // return isLoggedIn ? <>{children}</> : null
}
