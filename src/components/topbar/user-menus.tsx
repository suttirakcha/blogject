import { useUserContext } from "@/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSignOutAccount } from "@/lib/react-query/queries-and-mutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, UserCog } from "lucide-react"
import AvatarAccount from "../AvatarAccount"

const UserMenus = () => {
  const iconClassName = "w-4 h-4 mr-2"
  const { user } = useUserContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarAccount />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => navigate('/update-user')}>
          <UserCog className={iconClassName}/>
          Update User
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className={iconClassName}/>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenus