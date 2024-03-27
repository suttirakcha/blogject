import Logo from "./logo"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { useSignOutAccount } from "@/lib/react-query/queries-and-mutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mainMenus } from "@/lib/menus"

const LeftSidebar = () => {

  const { user } = useUserContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className="hidden md:flex flex-col justify-between fixed left-0 top-0 w-[300px] m-5 bg-accent p-5 rounded-xl h-[calc(100%_-_40px)]">
      <section className="flex flex-col gap-y-6">
        <Link to='/'>
          <Logo />
        </Link>

        <ul className="flex flex-col gap-y-3">
          {mainMenus.map(menu => (
            <li key={menu.title}>
              <Link to={menu.link}>
                <Button className="flex items-center gap-x-2 justify-start text-base px-2" variant="ghost">
                  {menu.icon}
                  {menu.title}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl">{user.name}</h3>
        </div>
        <Button className="flex items-center gap-x-2 justify-start text-base px-2" variant="ghost">
          <LogOut />
          Log out
        </Button>
      </section>
    </nav>
  )
}

export default LeftSidebar