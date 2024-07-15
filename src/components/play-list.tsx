import { X } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import PlayItem from '~/components/play-item'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { usePlaylist } from '~/store/play-list'
import { useModal } from '~store/modal'

interface PlayListProps extends PropsWithChildren {
}

const PlayList = ({ children }: PlayListProps) => {
  const { playlist } = usePlaylist()
  const { isOpen, onOpen, onClose } = useModal()

  function handleOpenChange(open: boolean) {
    open ? onOpen() : onClose()
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
