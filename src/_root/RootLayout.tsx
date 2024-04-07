import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Topbar from "@/components/topbar/index"
import LeftSidebar from "@/components/Menubar"
import { Toaster } from "@/components/ui/toaster"

const RootLayout = () => {
  return (
    <div className="fade-in">
      <Topbar />
      <LeftSidebar />

      <section className="mt-[100px] pb-[136px] p-10 md:pb-10 md:ml-[320px]">
  
        <main className="max-w-3xl m-auto md:pb-0">
          <Outlet />
        </main>

        <Toaster />
      </section>
    </div>
  )
}

export default RootLayout