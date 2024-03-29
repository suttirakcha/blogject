import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetRecentPosts } from "@/lib/react-query/queries-and-mutations"
import { Models } from "appwrite"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PostCard from "@/components/PostCard"

const MainPage = () => {

  const { data: posts, isPending: isPostLoading } = useGetRecentPosts()

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Home Feed</h1>

      <div className="flex flex-col gap-y-8">
        {posts?.documents.map((post: Models.Document) => (
          <PostCard post={post}/>
        ))}
      </div>
    </main>
  )
}

export default MainPage