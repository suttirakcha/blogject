import Logo from "./logo"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useSignOutAccount } from "@/lib/react-query/queries-and-mutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { useUserContext } from "@/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserMenus from "./user-menus"

const LeftSidebar = () => {

  const { user } = useUserContext()
  const { mutate: signOut, isSuccess, isPending } = useSignOutAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className="hidden md:flex flex-col justify-between fixed left-0 top-0 w-[300px] m-5 bg-accent p-5 rounded-xl h-[calc(100%_-_40px)]">
      <section>
        <Link to='/'>
          <Logo />
        </Link>
      </section>

      <section className="flex flex-col gap-y-3">
        <UserMenus />
      </section>
    </nav>
  )
}

export default LeftSidebar