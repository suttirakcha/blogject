import PostForm from "@/components/forms/PostForm"
import { useUserContext } from "@/providers/auth-provider"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const CreatePost = () => {

  // const { isAuthenticated } = useUserContext()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/log-in')
  // }, [isAuthenticated])

  return (
    <main>
      <header className="flex items-center gap-x-3 mb-8">
        <Link to="/your-posts">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Create Post</h1>
      </header>

      <div className="max-w-3xl m-auto">
        <PostForm />
      </div>
    </main>
  )
}

export default CreatePost