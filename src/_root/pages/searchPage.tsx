import TopHeader from "@/components/TopHeader"
import { Input } from "@/components/ui/input"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries-and-mutations"
import { ChangeEvent, useState } from "react"

const SearchPage = () => {

  const { data: users } = useGetUsers()
  const { data: posts } = useGetRecentPosts()
  const [search, setSearch] = useState('')

  const usersResults = users?.documents?.filter(user => user?.name?.toLowerCase().includes(search.toLowerCase()))
  const postsResults = posts?.documents?.filter(post => post?.title?.toLowerCase().includes(search.toLowerCase()))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <TopHeader title="Search posts or people"/>
      <Input placeholder="Search here..." onChange={handleSearch}/>

      {(usersResults as any)?.length > 0 && search !== "" ? (
        <>
          <h1 className="text-2xl font-bold">Users</h1>
          {usersResults?.map(user => (
            <>{user.name}</>
          ))}
        </>
      ) : null}

      {(postsResults as any)?.length > 0 && search !== "" ? (
        <>
          <h1 className="text-2xl font-bold">Posts</h1>
          {postsResults?.map(post => (
            <>
              {post.title}
              {post.content}
            </>
          ))}
        </>
      ) : null}
    </>
  )
}

export default SearchPage