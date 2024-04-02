import { Bookmark, FileText, Home, Search } from "lucide-react"
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
    title:'Search',
    icon:<Search />,
    link:'/search'
  },
  {
    title:'Saved',
    icon:<Bookmark />,
    link:'/saved'
  },
  {
    title:'Your posts',
    icon:<FileText />,
    link:'/your-posts'
  },
]