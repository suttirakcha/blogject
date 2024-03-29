import PostForm from "@/components/forms/PostForm"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const CreatePost = () => {
  return (
    <main>
      <header className="flex items-center gap-x-3 mb-8">
        <Link to="/your-posts">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Create Post</h1>
      </header>

      <div className="max-w-3xl m-auto">
        <PostForm />
      </div>
    </main>
  )
}

export default CreatePost