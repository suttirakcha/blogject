import Loading from "@/components/Loading"
import TopHeader from "@/components/TopHeader"
import UpdateUserForm from "@/components/forms/UpdateUserForm"
import { useGetCurrentUser } from "@/lib/react-query/queries-and-mutations"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const UpdateUser = () => {

  const navigate = useNavigate()

  const { data: currentUser, isPending } = useGetCurrentUser()

  return (
    <>
      <TopHeader 
        prefix={<button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>}
        title="Update User"
      />

      {isPending ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="max-w-3xl m-auto">
          <UpdateUserForm user={currentUser}/>
        </div>
      )}
    </>
  )
}

export default UpdateUser