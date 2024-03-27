import { getCurrentUser } from "@/lib/api";
import { ContextType, User } from "@/types";
import { createContext, useContext, useState, useEffect } from "react";

export const initial_user: User = {
  id: '',
  name: '',
  email: '',
  imageUrl: '',
  bio: ''
}

const initial_state = {
  user: initial_user,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<ContextType>(initial_state)

const AuthProvider = ({ children } : { children: React.ReactNode }) => {

  const [user, setUser] = useState<User>(initial_user)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser()

      if (currentAccount){
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        })

        setIsAuthenticated(true)

        return true
      }

      return false

    } catch (err) {
      console.log(err)

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  useEffect(() => {
    // if (localStorage.getItem('cookieFallback') === '[]'){
    //   navigate('/sign-in')
    // }

    checkAuthUser()
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)