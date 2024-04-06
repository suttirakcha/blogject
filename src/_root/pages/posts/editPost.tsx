import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import PostForm from "@/components/forms/PostForm"
import { useGetPostById } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')
  const { isAuthenticated } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    !isAuthenticated && navigate('/log-in')
  }, [])

  return (
    <>
      <TopHeader 
        prefix={<Link to="/your-posts">
          <ArrowLeft />
        </Link>}
        title="Update Post"
      />

      {isPending ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="max-w-3xl m-auto">
          <PostForm post={post} action="Update"/>
        </div>
      )}
    </>
  )
}

export default EditPost