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
    <Dialog open>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>播放列表</DialogTitle>
        </DialogHeader>

        {
          playlist.map(item => (
            <PlayItem key={item.bv} {...item} />
          ))
        }

      </DialogContent>
    </Dialog>
  )
}

export default PlayList
