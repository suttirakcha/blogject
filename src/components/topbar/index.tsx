import { Link } from "react-router-dom"
import Logo from "../logo"
import UserMenus from "./user-menus"

const Topbar = () => {
  return (
    <div className="border-b fixed left-0 top-0 m-5 rounded-full w-[calc(100%_-_40px)] md:hidden flex bg-accent h-16 p-5 items-center justify-between">
      <Link to='/'>
        <Logo />
      </Link>

      <UserMenus />
    </div>
  )
}

export default Topbar