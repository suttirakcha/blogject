import { FileText, Home, LogOut, Users } from "lucide-react"
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
    title:'Accounts',
    icon:<Users />,
    link:'/'
  },
  {
    title:'Your posts',
    icon:<FileText />,
    link:'/'
  },
]