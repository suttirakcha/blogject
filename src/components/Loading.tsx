import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="animate-pulse w-fit h-fit text-indigo-500 flex flex-col items-center gap-y-4 justify-center">
      <Loader2 className="h-12 w-12 animate-spin"/>
      <h1 className="text-lg font-bold">Loading...</h1>
    </div>
  )
}

export default Loading