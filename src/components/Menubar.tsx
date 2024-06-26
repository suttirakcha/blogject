import Logo from "./logo"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { LogIn, LogOut, MonitorDown, UserCog } from "lucide-react"
import { useSignOutAccount } from "@/lib/react-query/queries-and-mutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/providers/auth-provider"
import { mainMenus } from "@/lib/menus"
import { cn } from "@/lib/utils"
import AvatarAccount from "./AvatarAccount"

interface MenuButtonProps {
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
}

const LeftSidebar = () => {
  const { user, isAuthenticated } = useUserContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  const MenuButton = ({ children, onClick, isActive } : MenuButtonProps) => {
    return (
      <Button className={cn("flex items-center gap-2 h-full justify-center md:justify-start text-base w-full flex-col md:flex-row", {"bg-indigo-800": isActive})} variant="ghost" onClick={onClick}>
        {children}
      </Button>
    )
  }

  return (
    <>
      <nav className="hidden md:flex flex-col justify-between fixed left-0 top-0 w-[300px] m-5 bg-accent p-5 rounded-xl h-[calc(100%_-_40px)]">
        <section className="flex flex-col gap-y-6">
          <Link to='/'>
            <Logo />
          </Link>

          <ul className="flex flex-col gap-y-3">
            {mainMenus.map(menu => (
              <li key={menu.title}>
                <Link to={menu.link}>
                  <MenuButton isActive={location.pathname === menu.link}>
                    {menu.icon}
                    {menu.title}
                  </MenuButton>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {isAuthenticated ? (
          <section className="flex flex-col gap-y-2">
            <Link to={`/profile/${user.id}`} className="mb-4">
              <div className="flex items-center gap-x-4">
                <AvatarAccount />
                <h3 className="text-xl">{user.name}</h3>
              </div>
            </Link>
            <MenuButton onClick={() => navigate('/update-user')}>
              <UserCog />
              Update User
            </MenuButton>
            <MenuButton onClick={() => signOut()}>
              <LogOut />
              Log out
            </MenuButton>
          </section>
        ) : (
          <section className="flex flex-col gap-y-2">
            <MenuButton onClick={() => navigate('/log-in')}>
              <LogIn />
              Log in
            </MenuButton>
            <MenuButton onClick={() => navigate('/sign-up')}>
              <MonitorDown />
              Sign up
            </MenuButton>
          </section>
        )}

      </nav>

      <footer className="fixed bottom-0 w-full bg-accent md:hidden px-5 py-3 z-[50]">
        <ul className="grid grid-cols-4">
          {mainMenus.map(menu => (
            <li key={menu.title}>
              <Link to={menu.link}>
                <MenuButton isActive={location.pathname === menu.link}>
                  {menu.icon}
                  {menu.title}
                </MenuButton>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}

export default LeftSidebar