import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { Models } from "appwrite"
import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import NoPosts from "@/components/posts/NoPosts"
import PostView from "@/components/posts/PostView"

const MainPage = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()

  return (
    <>
      <TopHeader title="Home Feed"/>
      {isPostLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {(posts as any)?.documents?.length > 0 ? (
            <div className="flex flex-col gap-6">
              {posts?.documents.map((post: Models.Document) => (
                <PostView post={post} key={post.title}/>
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

export default MainPage