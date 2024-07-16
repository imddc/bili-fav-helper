import { CircleOff, X } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import PlayItem from '~/components/play-item'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { getLastPath, play } from '~/lib/utils'
import { useConfig } from '~/store/config'
import { useModal } from '~/store/modal'
import { usePlaylist } from '~/store/play-list'

interface PlayListProps extends PropsWithChildren {
}

const PlayList = ({ children }: PlayListProps) => {
  const { playlist, remove } = usePlaylist()
  const { isOpen, onOpen, onClose } = useModal()
  const { hosting, setHosting } = useConfig()

  function playAll() {
    const first = playlist[0]
    play(first.bv)
  }

  function handleRemove(bv: string) {
    if (bv === getLastPath()) {
      // current bv 
      remove(bv)
      const index = playlist.findIndex(_ => _.bv === bv)
      const next = index === playlist.length - 1 ? playlist[0] : playlist[index + 1]
      play(next.bv)
    } else {
      remove(bv)
    }
  }

  function handleCheckedChange(val: boolean) {
    setHosting(val)
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-50">
        <DialogClose className='absolute right-4 top-4' onClick={onClose}>
          <X className='size-4' />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>播放列表</DialogTitle>
        </DialogHeader>

        <div className='flex justify-end items-center gap-4'>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="terms"
            >
              控制播放行为
            </label>

            <Checkbox id="terms" checked={hosting} onCheckedChange={handleCheckedChange} />
          </div>

          <Button size='sm' variant='secondary' onClick={() => playAll()}>播放全部</Button>
        </div>

        <div className='max-h-[60vh] overflow-y-auto pr-2'>
          {playlist.length === 0 ?
            <div className='flex flex-col items-center justify-center p-2 space-y-2'>
              <CircleOff className='size-24 text-slate-400' />
              <p>没有数据</p>
            </div>
            :
            playlist.map(item => (
              <PlayItem key={item.bv} {...item} remove={(bv) => handleRemove(bv)} />
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlayList
