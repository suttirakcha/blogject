import Logo from "@/components/logo"
import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const isAuthenticated = false

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="m-auto max-w-2xl">
          <Logo />
          <Outlet />
        </section>
      )}
    </>
  )
}

export default AuthLayout