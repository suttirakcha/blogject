import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { Models } from "appwrite"
import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import NoPosts from "@/components/posts/NoPosts"
import PostView from "@/components/posts/PostView"
import UserCard from "@/components/users/UserCard"

const MainPage = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()
  const { data: users } = useGetUsers()

  return (
    <>
      <TopHeader title="Home Feed"/>

      <section className="flex flex-col gap-y-8">
        {!isPostLoading && (
          <div className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">Recommended users</h1>
            
            <UserCard users={users?.documents}/>
          </div>
        )}

        <div className="flex flex-col gap-y-3">
          {isPostLoading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold">Recommended posts</h1>
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
        </div>
      </section>
    </>
  )
}

export default MainPage