import { AudioWaveform, CirclePlus } from 'lucide-react'
import PlayList from '~/components/play-list'
import { Button } from '~/components/ui/button'
import { getLastPath } from '~/lib/utils'
import { useModal } from '~/store/modal'
import { usePlaylist } from '~/store/play-list'

const AddButton = () => {
  const { add } = usePlaylist()

  function handleAddToList(e: React.MouseEvent<HTMLButtonElement>) {
    // 阻止事件冒泡
    e.stopPropagation()
    const lastPath = getLastPath()
    add(lastPath, 0, 0)
  }

  return (
    <Button
      size='icon'
      onClick={(e) => handleAddToList(e)}
      className='rounded-full flex items-center justify-center'
    >
      <CirclePlus className='size-4' />
    </Button>
  )
}

const HoverButton = () => {
  const { add } = usePlaylist()
  const { toggle, isOpen } = useModal()

  function handleToggleModal() {
    toggle()
  }

  return (
    <div
      className="fixed -left-4 translate-y-1/2 top-1/2"
    >
      <PlayList>
        <Button
          size='sm'
          className='hover:translate-x-6 transition-all rounded-full z-50 relative group'
          onClick={() => handleToggleModal()}
        >
          <AudioWaveform className='size-4' />

          <div
            className='absolute top-0 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover:translate-y-full group-hover:opacity-100 transition'
          >
            <AddButton />
          </div>
        </Button>
      </PlayList>
    </div>
  )
}

export default HoverButton
