import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const currentDate = new Date()
  const inputDate = new Date(dateString)

  const timeDiff = currentDate.getTime() - inputDate.getTime()
  const secondsDiff = timeDiff / 1000

  if (secondsDiff < 60){
    return 'Just now';
  } else if (secondsDiff < (60 * 60)){
    const minutes = Math.floor(secondsDiff / 60)
    return `${minutes} ${minutes == 1 ? 'minute' : 'minutes'} ago`
  } else if (secondsDiff < (60 * 60 * 24)){
    const hours = Math.floor(secondsDiff / (60 * 60))
    return `${hours} ${hours == 1 ? 'hour' : 'hours'} ago`
  } else {
    const days = Math.floor(secondsDiff / (60 * 60 * 24))
    return `${days} ${days == 1 ? 'day' : 'days'} ago`
  }
}