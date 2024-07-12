import cssText from 'data-text:~/main.css'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { injectMainStyles } from '~/lib/utils'

// 引入tailwind
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Content = () => {
  injectMainStyles(cssText)

  return (
    <div className="p-4 space-y-2 bg-sky-50 rounded m-2">
      <div>
        <h1>
          Content
        </h1>
      </div>

      <Input />
      <Button size='sm'>click here</Button>
    </div>
  )
}

export default Content
