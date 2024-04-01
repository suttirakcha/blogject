export interface NewUser {
  name: string
  email: string
  password: string
}

export interface SignIn {
  email: string
  password: string
}

export interface Post {
  userId: string
  title: string
  content: string
  file: File[]
  tags?: string
}

export interface UserToDB {
  accountId: string
  email: string
  name: string
  imageUrl: URL
}

export interface User {
  id: string
  name: string
  email: string
  imageUrl: string
  bio: string
}

export interface Likes {
  postId: string
  likesArray: string[]
}

export interface Saves {
  postId: string
  userId: string
}

export interface ContextType {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isLoading: boolean
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}