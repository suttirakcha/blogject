import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-2">
          <h1 className="text-3xl font-bold">Welcome to Blogject!</h1>
          <p>Ready to create your first post?</p>
        </div>

        <Link to="/create-post">
          <Button className="flex items-center gap-x-2">
            <PlusCircle />
            Create your first post
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default MainPage