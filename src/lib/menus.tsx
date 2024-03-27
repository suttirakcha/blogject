import { LogOut } from "lucide-react"
import { ReactNode } from "react"

interface Menus {
  title: string
  icon: ReactNode
}

export const mainMenus: Menus[] = [
  {
    title:'Your posts',
    icon:<LogOut />
  }
]

export const signOutMenus: Menus[] = [
  {
    title:'Sign out',
    icon:<LogOut />
  }
]