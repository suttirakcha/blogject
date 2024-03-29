import PostCard from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

const YourPosts = () => {

  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()
  const { user } = useUserContext()

  console.log(posts?.documents[0].creator.$id)
  console.log(user.id)

  return (
    <main>
      <header className="flex items-center gap-x-3 mb-8">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <Link to="/create-post">
          <Button variant="ghost" className="flex items-center gap-x-2">
            <PlusCircle />
            Create
          </Button>
        </Link>
      </header>
 
      <div className="flex flex-col gap-y-8">
        {posts?.documents?.filter(post => post?.creator?.$id === user.id).map(post => (
          <PostCard post={post}/>
        ))}
      </div>
    </main>
  )
}

export default YourPosts