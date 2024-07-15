import { usePlaylist } from "~/store/play-list"
import { getLastPath, play } from "~/lib/utils"
import { useEffect } from "react"


export function useVideoControl() {
  const { playlist } = usePlaylist()
  const player = document.querySelector('.bpx-player-video-wrap').querySelector('video')

  const controlMap = {
    'ended': () => {
      console.log('ended 视频播放完成')
      const lastIndex = getLastPath()
      if (!playlist.map(_ => _.bv).includes(lastIndex)) {
        return
      }

      const indexInPlayList = playlist.map(_ => _.bv).indexOf(lastIndex)
      if (indexInPlayList === playlist.length - 1) {
        // 暂时先循环播放
        play(playlist[0].bv)
        return
      }
      play(playlist[indexInPlayList + 1].bv)
    },
    'pause': () => {
      console.log('视频暂停')
    },
  }

  useEffect(() => {
    for (const eventName in controlMap) {
      console.log(eventName)
      player.addEventListener(eventName, controlMap[eventName])
    }

    return () => {
      for (const eventName in controlMap) {
        player.removeEventListener(eventName, controlMap[eventName])
      }
    }
  })
}
