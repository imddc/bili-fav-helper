import { type PropsWithChildren } from 'react'
import PlayItem from '~/components/play-item'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { usePlaylist } from '~/store/play-list'

interface PlayListProps extends PropsWithChildren {
}

const PlayList = ({ children }: PlayListProps) => {
  const { playlist } = usePlaylist()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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
