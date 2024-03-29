import Logo from "@/components/logo"
import { Toaster } from "@/components/ui/toaster"
import { useUserContext } from "@/providers/auth-provider"
import { Outlet, Navigate, Link } from "react-router-dom"

const AuthLayout = () => {

  const { isAuthenticated } = useUserContext()

  return (
    <div className="fade-in">
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen flex flex-col gap-y-8 items-center justify-center">
          <Link to="/">
            <Logo />
          </Link>
  
          <div className="w-full max-w-xl px-5">
            <Outlet />
            <Toaster />
          </div>
        </section>
      )}
    </div>
  )
}

export default AuthLayout