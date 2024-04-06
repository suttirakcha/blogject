import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import UpdateUserForm from "@/components/forms/UpdateUserForm"
import { useGetCurrentUser } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const UpdateUser = () => {

  const navigate = useNavigate()
  const { isAuthenticated } = useUserContext()

  useEffect(() => {
    !isAuthenticated && navigate('/log-in')
  }, [])

  return (
    <>
      <TopHeader 
        prefix={<button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>}
        title="Update User"
      />
        <div className="max-w-3xl m-auto">
          <UpdateUserForm />
        </div>
    </>
  )
}

export default UpdateUser