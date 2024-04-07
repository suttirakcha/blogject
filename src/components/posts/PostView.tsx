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
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

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
        {isAuthenticated ? (
          <DialogContent className="w-3/4 max-w-6xl rounded-md">
            <DialogHeader className="flex flex-col md:flex-row gap-4 w-full text-left">
              {post?.imageUrl && (
                <img src={post?.imageUrl} className="rounded-md object-cover md:w-1/2"/>
              )}
              <div className="flex flex-col gap-y-2">
                <DialogTitle>{post?.title}</DialogTitle>
                <DialogDescription>
                  {post?.content}
                </DialogDescription>
              </div>
            </DialogHeader>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">To view the posts, please log in or sign up</DialogTitle>
              <DialogDescription className="flex justify-center gap-x-4 !mt-4">
                <Link to='/log-in'>
                  <Button className="text-base">Log in</Button>  
                </Link>
                <Link to='/sign-up'>
                  <Button className="text-base">Sign up</Button>  
                </Link>   
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
    </Dialog>
  )
}

export default PostView