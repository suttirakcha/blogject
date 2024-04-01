import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { Models } from "appwrite"
import PostCard from "@/components/PostCard"
import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"

const MainPage = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()

  console.log(posts?.documents)

  return (
    <main>
      <TopHeader title="Home Feed"/>

      <section className="max-w-3xl m-auto">
        {isPostLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts?.documents.map((post: Models.Document) => (
              <PostCard post={post} key={post.title}/>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default MainPage