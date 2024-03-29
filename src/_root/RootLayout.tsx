import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Topbar from "@/components/topbar/index"
import LeftSidebar from "@/components/left-sidebar"
import { Toaster } from "@/components/ui/toaster"

const RootLayout = () => {

  const navigate = useNavigate()
  const cookieFallback = localStorage.getItem("cookieFallback")

  useEffect(() => {
    if (cookieFallback === '[]' || cookieFallback === null){
      navigate('/sign-in')
    }
  }, [cookieFallback])

  return (
    <>
      <Topbar />
      <LeftSidebar />

      <section className="mt-[84px] md:mt-0 p-10 md:ml-[320px]">
        <Outlet />
        <Toaster />
      </section>
    </>
  )
}

export default RootLayout