import { Main } from "app/Main"
import { Page404 } from "common/components"
import { ProtectedRoute } from "common/routing/ProtectedRoute"
import { Route, Routes } from "react-router"
import { FAQ } from "../../features/auth/ui/Faq"
import { Login } from "../../features/auth/ui/Login"

export const Path = {
   Main: "/",
   Login: "login",
   NotFound: "*",
   Faq: "faq"
} as const

export const Routing = () => {
   return (
      <Routes>
         {/*<Route index element={<Main />} />*/}
         <Route
            path={Path.Main}
            element={
               <ProtectedRoute>
                  <Main />
               </ProtectedRoute>
            }
         />
         <Route
            path={Path.Faq}
            element={
               <ProtectedRoute>
                  <FAQ />
               </ProtectedRoute>
            }
         />
         <Route path={Path.Login} element={<Login />} />
         <Route path={Path.NotFound} element={<Page404 />} />
      </Routes>
   )
}
