import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const injectMainStyles = (cssText: string) => {
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style)
}

export function getLastPath() {
  const pathname = window.location.pathname
  const lastPath = pathname.split('/').filter(Boolean).pop()
  return lastPath
}

export function clickOutside(ele: HTMLElement) {
}
