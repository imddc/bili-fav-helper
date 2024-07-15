import { CircleX, Play } from 'lucide-react'
import { memo, useEffect, useRef, useState, type ElementRef } from 'react'
import { requestBaseDetail } from '~/api'
import { Skeleton } from '~components/ui/skeleton'
import { getLastPath } from '~lib/utils'
import { useModal } from '~store/modal'
import { usePlaylist, type PlayList } from '~store/play-list'
import type { BaseDetail } from '~types'

interface PlayItemProps extends PlayList {
}
const currentBv = getLastPath()

const PlayItem = memo(({ bv }: PlayItemProps) => {
  const isCurrent = bv === currentBv
  const { remove } = usePlaylist()
  const { isOpen } = useModal()

  const [data, setData] = useState<BaseDetail>({} as BaseDetail)
  const [isLoading, setIsLoading] = useState(false)
  const itemRef = useRef<ElementRef<'div'>>(null)

  async function getData() {
    setIsLoading(true)
    const res = await requestBaseDetail(bv).finally(() => {
      return setIsLoading(false)
    })
    setData(res.data)
  }

  function handleDelete() {
    remove(bv)
  }

  function handleClick() {
    if (isCurrent) {
      return
    }
    const target = new URL(`/video/${bv}`, 'https://www.bilibili.com')
    location.replace(target)
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      itemRef.current?.scrollIntoView({
        behavior: 'smooth'
      })
    })
  }, [])

  useEffect(() => {
    if (!isOpen || !isCurrent) {
      return
    }
    itemRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [isOpen])

  if (isLoading) {
    return <Skeleton className='w-full h-18' />
  }

  return (
    <div
      ref={itemRef}
      className='flex gap-2 items-center justify-between p-2 cursor-pointer rounded hover:bg-sky-50 active:bg-sky-100 active:scale-95 transition'
      onDoubleClick={handleClick}
    >
      {
        isCurrent && <Play className='size-4 animate-pulse' />
      }
      <div className='w-24 aspect-video'>
        <img src={data.pic} alt={`${bv}封面`} className='size-full rounded-md' />
      </div>

      <div className='space-y-2 flex-1 select-none'>
        <h1 className='line-clamp-1'>{data.title}</h1>
        <p className='line-clamp-1'>{data.desc}</p>
      </div>

      <div className='flex items-center'>
        <CircleX className='size-4 cursor-pointer' onClick={handleDelete} />
      </div>
    </div>
  )
})

export default PlayItem
