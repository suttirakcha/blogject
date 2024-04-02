import { useUserContext } from "@/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AvatarAccount = () => {

  const { user } = useUserContext()

  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarAccount