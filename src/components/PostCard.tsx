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
import { Badge } from "./ui/badge"
import { formatDate } from "@/lib/utils"

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
            <p>{formatDate(post?.$createdAt)}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-lg font-bold">{post.title}</h1>
        <p className="text-sm text-gray-400">{post.content}</p>

        {post?.tags?.[0] !== '' && post?.tags?.length > 0 && (
          <div className="flex flex-col mt-4 gap-y-2">
            <h3 className="text-sm text-gray-400 font-bold">Tags</h3>

            <div className="flex gap-2">
              {post?.tags?.map((tag: string) => (
                <Badge variant="outline" key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PostCard