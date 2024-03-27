import { useEffect } from "react"
import MainPage from "./pages/MainPage"
import { useNavigate } from "react-router-dom"

const RootLayout = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("cookieFallback") === '[]' || localStorage.getItem("cookieFallback") === null){
      navigate('/sign-in')
    }
  })

  return (
    <>
      <MainPage />
    </>
  )
}

export default RootLayout