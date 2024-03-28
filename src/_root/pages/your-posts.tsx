import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

const YourPosts = () => {
  return (
    <main>
      <header className="flex items-center gap-x-3">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <Link to="/create-post">
          <Button variant="ghost" className="flex items-center gap-x-2">
            <PlusCircle />
            Create
          </Button>
        </Link>
      </header>
    </main>
  )
}

export default YourPosts