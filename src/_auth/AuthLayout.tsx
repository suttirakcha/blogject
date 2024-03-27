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
        <section className="h-screen flex flex-col gap-y-8 items-center justify-center">
          <Logo />
          <div className="w-full max-w-xl px-5">
            <Outlet />
            <Toaster />
          </div>
        </section>
      )}
    </>
  )
}

export default AuthLayout