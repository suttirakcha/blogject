import Loading from "@/components/Loading"
import PostCard from "@/components/PostCard"
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

  const yourPosts = posts?.documents?.filter(post => post?.creator?.$id === user.id)

  return (
    <main>
      <TopHeader 
        suffix={<Link to={isAuthenticated ? "/create-post" : "/log-in"}>
          <Button variant="ghost" className="flex items-center gap-x-2">
            <PlusCircle />
            Create
          </Button>
        </Link>}
        title="Your Posts"
      />
 
      <section className="max-w-3xl m-auto">
        {isPostLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {(yourPosts as any).length > 0 ? (
              <div className="flex flex-col gap-6">
                {yourPosts?.map(post => (
                  <PostCard post={post}/>
                ))}
              </div>
            ) : (
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
            )}
          </>
        )}
      </section>

    </main>
  )
}

export default YourPosts