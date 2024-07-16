import cssText from 'data-text:~/main.css'
import type { PlasmoCSConfig } from "plasmo"
import HoverButton from '~/components/hover-button'
import { useVideoControl } from '~/hooks/use-video-control'
import { getLastPath, injectMainStyles } from '~/lib/utils'

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

// 引入tailwind
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function getLastPath() {
  const pathname = window.location.pathname
  const lastPath = pathname.split('/').filter(Boolean).pop()
  return lastPath
}

function isBv(path: string) {
  return path && path.startsWith('BV')
}

const Content = () => {
  const lastPath = getLastPath()
  if (!isBv(lastPath)) {
    return null
  }

  injectMainStyles(cssText)

  useVideoControl()

  return (
    <>
      <HoverButton />
    </>
  )
}

export default Content
