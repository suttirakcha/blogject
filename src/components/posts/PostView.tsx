import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Models } from "appwrite"
import PostCard from "./PostCard"
import { useUserContext } from "@/providers/auth-provider"

interface PostViewProps {
  post: Models.Document
}

const PostView = ({ post } : PostViewProps) => {
  const { isAuthenticated } = useUserContext()

  return (
    <Dialog>
      <DialogTrigger>
        <PostCard post={post}/>
      </DialogTrigger>
      <DialogContent>
        {isAuthenticated ? (
          <DialogHeader>
            {post?.imageUrl && (
              <img src={post?.imageUrl} className="rounded-md"/>
            )}
            <DialogTitle>{post?.title}</DialogTitle>
            <DialogDescription>
              {post?.content}
            </DialogDescription>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>To view the posts, please log in or register</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PostView