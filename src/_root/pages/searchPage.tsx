import TopHeader from "@/components/TopHeader"
import { Input } from "@/components/ui/input"

const SearchPage = () => {
  return (
    <>
      <TopHeader title="Search posts or people"/>

      <Input placeholder="Search here..."/>
    </>
  )
}

export default SearchPage