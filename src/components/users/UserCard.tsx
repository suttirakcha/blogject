import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { Link } from "react-router-dom"
  
const UserCard = () => {
  const { data: users } = useGetUsers()

  return (
    <div className="grid grid-cols-5 gap-x-3">
      {users?.documents?.map((user: any) => (
        <Link to={`/profile/${user.accountId}`} className="w-full flex">
          <Card className="w-full p-5 flex flex-col items-center gap-y-2">
            <CardTitle>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </CardTitle>
            <CardDescription className="text-base text-white">{user.name}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default UserCard