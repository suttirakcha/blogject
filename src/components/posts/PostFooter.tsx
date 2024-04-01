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
import { checkIfLiked, formatDate } from "@/lib/utils"
import { Bookmark, Heart } from "lucide-react"
import { useDeleteSavedPosts, useGetCurrentUser, useLikePosts, useSavePosts } from "@/lib/react-query/queries-and-mutations"
import { useState, useEffect } from "react"

interface PostFooterProps {
  post: Models.Document
  userId: string
}

const PostFooter = ({ post, userId } : PostFooterProps) => {

  const likesList = post.likes.map((user: Models.Document) => user.$id)
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePosts()
  const { mutate: savePost } = useSavePosts()
  const { mutate: deleteSavedPost } = useDeleteSavedPosts()

  const { data: currentUser } = useGetCurrentUser()
  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id)

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    let newLikes = [...likes]
    const hasLiked = newLikes.includes(userId)

    if (hasLiked){
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({ postId: post.$id, likesArray: newLikes })
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)
      deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({ postId: post.$id, userId })
      setIsSaved(true)
    }
  }

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Heart onClick={handleLikePost} stroke={checkIfLiked(likes, userId) ? '#f56969' : 'white'} fill={checkIfLiked(likes, userId) ? '#f56969' : 'transparent'}/>
        <p className="text-sm">{likes.length} {likes.length === 1 ? 'like' : 'likes'}</p>
      </div>
      <div>
        <Bookmark onClick={handleSavePost} fill={isSaved ? 'white' : 'transparent'}/>
      </div>
    </div>
  )
}

export default PostFooter