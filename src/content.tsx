import cssText from 'data-text:~/main.css'
import type {
  PlasmoCSConfig,
} from "plasmo"
import PlayList from '~/components/play-list'
import { Button } from '~/components/ui/button'
import { getLastPath, injectMainStyles } from '~/lib/utils'
import { usePlaylist } from '~store/play-list'

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

  // 从这开始写
  const { add } = usePlaylist()

  function handleAddToList() {
    add(lastPath, 0, 0)
  }

  return (
    <>
      <div className="p-3 space-y-2 bg-sky-50/90 rounded fixed right-2 top-2">
        <Button
          size='sm'
          onClick={handleAddToList}
        >
          添加到收藏
        </Button>
      </div>

      {/* 悬浮球 */}
      <div
        className="fixed left-4 translate-y-1/2 top-1/2"
      >
        <PlayList>
          <Button
            size='sm'
            className='hover:translate-x-1 hover:scale-110 transition-all rounded-full'
          >
            开
          </Button>
        </PlayList>
      </div>
    </>
  )
}

export default Content
