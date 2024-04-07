import PostView from "@/components/posts/PostView"
import TopHeader from "@/components/TopHeader"
import { Input } from "@/components/ui/input"
import UserCard from "@/components/users/UserCard"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { X } from "lucide-react"
import { ChangeEvent, useState } from "react"

const SearchPage = () => {

  const { data: users } = useGetUsers()
  const { data: posts } = useGetRecentPosts()
  const [search, setSearch] = useState('')

  const usersResults: any = users?.documents?.filter(user => user?.name?.toLowerCase().includes(search.toLowerCase()))
  const postsResults: any = posts?.documents?.filter(post => post?.title?.toLowerCase().includes(search.toLowerCase()))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <TopHeader title="Search posts or people"/>
      <div className="relative">
        <Input placeholder="Search here..." onChange={handleSearch} value={search}/>
        {search !== "" && <X className="absolute right-2 top-2 cursor-pointer" onClick={() => setSearch("")}/>}
      </div>

      <section className="flex flex-col gap-y-8 mt-4">
        {usersResults?.length == 0 && postsResults?.length == 0 ? 
          <h1>No search results...</h1>
        : null}

        {usersResults?.length > 0 && search !== "" ? (
          <div className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">Users</h1>
            <UserCard users={usersResults}/>
          </div>
        ) : null}

        {postsResults?.length > 0 && search !== "" ? (
          <div className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">Posts</h1>
            <div className="flex flex-col gap-6">
              {postsResults?.map((post: any) => (
                <PostView post={post}/>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default SearchPage