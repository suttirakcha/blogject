import { getCurrentUser } from "@/lib/api";
import { ContextType, User } from "@/types";
import { createContext, useContext, useState, useEffect } from "react";

export const INITIAL_USER: User = {
  id: '',
  name: '',
  email: '',
  imageUrl: '',
  bio: ''
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<ContextType>(INITIAL_STATE)

const AuthProvider = ({ children } : { children: React.ReactNode }) => {

  const [user, setUser] = useState<User>(INITIAL_USER)
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