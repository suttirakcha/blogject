import TopHeader from "@/components/TopHeader"
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
    <>
      <TopHeader 
        prefix={<Link to="/your-posts">
          <ArrowLeft />
        </Link>}
        title="Create Post"
      />

      <div className="max-w-3xl m-auto">
        <PostForm />
      </div>
    </>
  )
}

export default CreatePost