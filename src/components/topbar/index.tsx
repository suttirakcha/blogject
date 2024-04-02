import { Link } from "react-router-dom"
import Logo from "../logo"
import UserMenus from "./user-menus"
import { useUserContext } from "@/providers/auth-provider"
import { LogIn } from "lucide-react"

const Topbar = () => {

  const { isAuthenticated } = useUserContext()

  return (
    <div className="fixed left-0 top-0 m-5 w-[calc(100%_-_40px)] rounded-full bg-accent md:hidden flex h-16 p-5 items-center justify-between z-[50]">
      <Link to='/'>
        <Logo />
      </Link>

      {isAuthenticated ? (
        <UserMenus />
      ) : (
        <Link to="/log-in">
          <LogIn/>
        </Link>
      )}
    </div>
  )
}

export default Topbar