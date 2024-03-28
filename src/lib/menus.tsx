import { FileText, Home, Star, Users } from "lucide-react"
import { ReactNode } from "react"

interface Menus {
  title: string
  icon: ReactNode
  link: string
}

export const mainMenus: Menus[] = [
  {
    title:'Home',
    icon:<Home />,
    link:'/'
  },
  {
    title:'People',
    icon:<Users />,
    link:'/people'
  },
  {
    title:'Saved',
    icon:<Star />,
    link:'/saved'
  },
  {
    title:'Your posts',
    icon:<FileText />,
    link:'/your-posts'
  },
]