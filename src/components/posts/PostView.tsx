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

interface PostViewProps {
  post: Models.Document
}

const PostView = ({ post } : PostViewProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PostCard post={post}/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {post?.imageUrl && (
            <img src={post?.imageUrl} className="rounded-md"/>
          )}
          <DialogTitle>{post?.title}</DialogTitle>
          <DialogDescription>
            {post?.content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PostView