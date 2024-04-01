import { useUserContext } from "@/providers/auth-provider"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"

const NoPosts = () => {

  const { isAuthenticated } = useUserContext()

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-3xl font-bold">Welcome to Blogject!</h1>
        <p>Ready to create your first post?</p>
      </div>

      <Link to={isAuthenticated ? "/create-post" : "/log-in"}>
        <Button className="flex items-center gap-x-2">
          <PlusCircle />
          Create post
        </Button>
      </Link>
    </div>
  )
}

export default NoPosts