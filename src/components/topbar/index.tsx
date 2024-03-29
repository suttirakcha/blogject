import { Link } from "react-router-dom"
import Logo from "../logo"
import UserMenus from "./user-menus"
import { useUserContext } from "@/providers/auth-provider"
import { LogIn } from "lucide-react"

const Topbar = () => {

  const { isAuthenticated } = useUserContext()

  return (
    <div className="border-b fixed left-0 top-0 m-5 rounded-full w-[calc(100%_-_40px)] md:hidden flex bg-accent h-16 p-5 items-center justify-between">
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