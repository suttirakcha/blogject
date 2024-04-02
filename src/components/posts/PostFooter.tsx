
import { Models } from "appwrite"
import { checkIfLiked } from "@/lib/utils"
import { Bookmark, Heart, Loader2 } from "lucide-react"
import { useDeleteSavedPosts, useGetCurrentUser, useLikePosts, useSavePosts } from "@/lib/react-query/queries-and-mutations"
import { useState, useEffect } from "react"
import { useUserContext } from "@/providers/auth-provider"

interface PostFooterProps {
  post: Models.Document
  userId: string
}

const PostFooter = ({ post, userId } : PostFooterProps) => {

  const likesList = post.likes.map((user: Models.Document) => user.$id)
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePosts()
  const { mutate: savePost, isPending: isSavingPost } = useSavePosts()
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPosts()

  const { data: currentUser } = useGetCurrentUser()
  const { isAuthenticated } = useUserContext()
  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id)

  const handleLikePost = (e: React.MouseEvent) => {
    if (isAuthenticated){
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
  }

  const handleSavePost = (e: React.MouseEvent) => {
    if (isAuthenticated){
      e.stopPropagation()

      if (savedPostRecord) {
        setIsSaved(false)
        deleteSavedPost(savedPostRecord.$id)
      } else {
        savePost({ postId: post.$id, userId })
        setIsSaved(true)
      } 
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
        {isSavingPost || isDeletingSaved ? <Loader2 className="animate-spin text-indigo-600"/> : <Bookmark onClick={handleSavePost} fill={isSaved ? 'white' : 'transparent'}/>}
      </div>
    </div>
  )
}

export default PostFooter