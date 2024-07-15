import { AudioWaveform } from 'lucide-react'
import PlayList from '~/components/play-list'
import { Button } from '~/components/ui/button'
import { useModal } from '~/store/modal'
import { usePlaylist } from '~/store/play-list'

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
          className='hover:translate-x-6 hover:scale-110 transition-all rounded-full'
          onClick={() => handleToggleModal()}
        >
          <AudioWaveform className='size-4' />
        </Button>
      </PlayList>
    </div>
  )
}

export default HoverButton
