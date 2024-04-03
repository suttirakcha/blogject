import TopHeader from "@/components/TopHeader"
import { useUserContext } from "@/providers/auth-provider"

const ProfilePage = () => {

  const { user } = useUserContext()

  return (
    <>
      <TopHeader title="Profile"/>
    </>
  )
}