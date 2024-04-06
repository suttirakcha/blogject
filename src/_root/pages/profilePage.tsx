import TopHeader from "@/components/TopHeader"
import { useGetRecentPosts, useGetUserById, useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Loading from "@/components/Loading"
import PostView from "@/components/posts/PostView"
import NoPosts from "@/components/posts/NoPosts"

const ProfilePage = () => {

  const { id } = useParams()
  const { data: users } = useGetUsers()
  const user = users?.documents?.filter(d => d.$id === id)[0]
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()
  
  const userPosts = posts?.documents?.filter(post => post?.creator?.$id === id)

  return (
    <>
      <TopHeader title="Profile"/>

      <div className="flex gap-x-4 items-center mb-8">
        <img src={user?.imageUrl} className="rounded-full h-[100px] w-[100px]" />
        <div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p>{user?.bio}</p>
        </div>
      </div>

      {isPostLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {(userPosts as any).length > 0 ? (
            <div className="flex flex-col gap-6">
              {userPosts?.map(post => (
                <PostView post={post} key={post.title} />
              ))}
            </div>
          ) : (
            <h1>There is no post on {user?.name}'s account.</h1>
          )}
        </>
      )}
    </>
  )
}

export default ProfilePage