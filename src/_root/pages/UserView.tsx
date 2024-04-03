import { useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { useParams } from "react-router-dom"

const UserView = () => {

  const { userId } = useParams()
  const { data: user } = useGetUsers()

  return (
    <div>

    </div>
  )
}

export default UserView