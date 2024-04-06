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
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import PostFooter from "./PostFooter"
import { useUserContext } from "@/providers/auth-provider"
import { Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useDeletePost } from "@/lib/react-query/queries-and-mutations"
import { toast } from "../ui/use-toast"

interface PostCardProps {
  post: Models.Document
}

const PostCard = ({ post } : PostCardProps) => {



  const { user } = useUserContext()
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()

  function handleDeletePost(e: React.MouseEvent){
    e.stopPropagation()

    const deletedPost = deletePost({
      postId: post.$id
    })

    if (!deletedPost){
      toast({
        title: 'There was an error deleting the post, please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Successfully deleted the post',
      })
    }
  }

  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post?.creator?.imageUrl} />
              <AvatarFallback className="text-sm">{post?.creator?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h3 className="text-base leading-4">{post?.creator?.name}</h3>
              <p className="text-sm font-normal">{formatDate(post?.$createdAt)}</p>
            </div>
          </div>
          {user.id === post?.creator?.$id ? (
            <div className="flex items-center gap-x-4">
              <Link to={`/posts/${post.$id}`}>
                <Edit className="h-5 w-5 stroke-indigo-500" />
              </Link>
              <Trash2 className="h-5 w-5 stroke-red-500" onClick={handleDeletePost}/>
            </div>
          ) : null}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-4">
        {post?.imageUrl && 
          <img src={post?.imageUrl} className="w-full rounded-md h-[60vh] object-cover"/>
        }
        <div className="flex flex-col text-left">
          <h1 className="text-lg font-bold">{post.title}</h1>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-pre">{post.content}</p>
        </div>

        {post?.tags?.[0] !== '' && post?.tags?.length > 0 && (
          <div className="flex gap-x-2">
            <h3 className="text-sm text-gray-400 font-bold">Tags:</h3>

            <div className="flex gap-2">
              {post?.tags?.map((tag: string) => (
                <Badge variant="outline" key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        <PostFooter post={post} userId={user.id}/>
      </CardContent>
    </Card>
  )
}

export default PostCard