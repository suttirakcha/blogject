import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import PostView from "@/components/posts/PostView"
import { useGetCurrentUser, useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"

const SavedPostsPage = () => {

  const { data: currentUser } = useGetCurrentUser()
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()
  const savedPosts = posts?.documents?.filter(post => (
    post?.save?.find((s: any) => s.user?.$id === currentUser?.$id)
  ))

  return (
    <>
      <TopHeader title="Saved Posts"/>

      {isPostLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {(savedPosts as any)?.length > 0 ? (
            <div className="flex flex-col gap-6">
              {savedPosts?.map((post) => (
                <PostView post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-3xl font-bold">No saved posts</h1>
              <p>Your saved posts will appear here. Explore posts and save them.</p>
            </div>
          )}
        </>
      )}

    </>
  )
}

export default SavedPostsPage