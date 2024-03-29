import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { Models } from "appwrite"
import PostCard from "@/components/PostCard"
import Loading from "@/components/Loading"

const MainPage = () => {

  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()

  console.log(posts)

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Home Feed</h1>

      {isPostLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6">
          {posts?.documents.map((post: Models.Document) => (
            <PostCard post={post}/>
          ))}
        </div>
      )}
    </main>
  )
}

export default MainPage