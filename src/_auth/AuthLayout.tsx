import Logo from "@/components/logo"
import { Toaster } from "@/components/ui/toaster"
import { useUserContext } from "@/providers/auth-provider"
import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {

  const { isAuthenticated } = useUserContext()

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <Logo />
            <Outlet />
            <Toaster />
          </div>
        </section>
      )}
    </>
  )
}

export default AuthLayout