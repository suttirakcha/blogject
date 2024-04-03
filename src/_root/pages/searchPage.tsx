import TopHeader from "@/components/TopHeader"
import { Input } from "@/components/ui/input"
import { useGetUsers } from "@/lib/react-query/queries-and-mutations"

const SearchPage = () => {

  const { data: users } = useGetUsers()

  return (
    <>
      <TopHeader title="Search posts or people"/>

      <Input placeholder="Search here..."/>
    </>
  )
}

export default SearchPage