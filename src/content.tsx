import cssText from 'data-text:~/main.css'
import type { PlasmoCSConfig } from "plasmo"
import { Button } from '~/components/ui/button'
import { injectMainStyles } from '~/lib/utils'

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
  return !!path.startsWith('BV')
}

const Content = () => {
  const lastPath = getLastPath()
  if (!isBv(lastPath)) {
    console.log(lastPath)
    return null
  }

  injectMainStyles(cssText)

  function handleAddToList() {
    console.log(lastPath)

    chrome.runtime.sendMessage({
      info: "我是 content.js"
    }, res => {
      // 答复
      alert(res)
    })
  }

  return (
    <div className="p-3 space-y-2 bg-sky-50/90 rounded fixed left-2 top-2">
      <Button
        size='sm'
        onClick={handleAddToList}
      >
        添加到收藏
      </Button>
    </div>
  )
}

export default Content
