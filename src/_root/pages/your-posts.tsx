import Loading from "@/components/Loading"
import NoPosts from "@/components/posts/NoPosts"
import PostCard from "@/components/posts/PostCard"
import TopHeader from "@/components/TopHeader"
import { Button } from "@/components/ui/button"
import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

const YourPosts = () => {

  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()
  const { isAuthenticated } = useUserContext()
  const { user } = useUserContext()

  console.log(user)

  const yourPosts = posts?.documents?.filter(post => post?.creator?.$id === user.id)

  return (
    <>
      <TopHeader 
        suffix={<Link to={isAuthenticated ? "/create-post" : "/log-in"}>
          <Button variant="ghost" className="flex items-center gap-x-2">
            <PlusCircle />
            Create
          </Button>
        </Link>}
        title="Your Posts"
      />

      {isPostLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {(yourPosts as any).length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {yourPosts?.map(post => (
                <PostCard post={post} key={post.title} />
              ))}
            </div>
          ) : (
            <NoPosts />
          )}
        </>
      )}
    </>
  )
}

export default YourPosts