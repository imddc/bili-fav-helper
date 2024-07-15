import { X } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import PlayItem from '~/components/play-item'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { play } from '~/lib/utils'
import { useModal } from '~/store/modal'
import { usePlaylist } from '~/store/play-list'

interface PlayListProps extends PropsWithChildren {
}

const PlayList = ({ children }: PlayListProps) => {
  const { playlist } = usePlaylist()
  const { isOpen, onOpen, onClose } = useModal()

  function handleOpenChange(open: boolean) {
    open ? onOpen() : onClose()
  }

  function playAll() {
    const first = playlist[0]
    play(first.bv)
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogClose className='absolute right-4 top-4' onClick={onClose}>
          <X className='size-4' />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>播放列表</DialogTitle>
        </DialogHeader>

        <div className='flex justify-end'>
          <Button size='sm' variant='secondary' onClick={() => playAll()}>播放全部</Button>
        </div>

        <div className='max-h-[60vh] overflow-y-auto pr-2'>
          {
            playlist.map(item => (
              <PlayItem key={item.bv} {...item} />
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlayList
