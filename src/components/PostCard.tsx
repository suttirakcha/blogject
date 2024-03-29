import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Models } from "appwrite"

interface PostCardProps {
  post: Models.Document
}

const PostCard = ({ post } : PostCardProps) => {
  return (
    <Card>
      <CardHeader>
        {post?.imageUrl && <CardTitle className="mb-8">
          <img src={post?.imageUrl} className="w-full rounded-md"/>
        </CardTitle>}
        <CardDescription className="flex items-center gap-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post?.creator?.imageUrl} />
            <AvatarFallback className="text-sm">{post?.creator?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3>{post?.creator?.name}</h3>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-lg font-bold">{post.title}</h1>
        <p className="text-sm text-gray-400">{post.content}</p>
      </CardContent>
    </Card>
  )
}

export default PostCard