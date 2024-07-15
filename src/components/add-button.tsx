import { Button } from '~/components/ui/button'
import { getLastPath } from '~/lib/utils'
import { usePlaylist } from '~/store/play-list'


const lastPath = getLastPath()
const AddButton = () => {
  const { add } = usePlaylist()

  function handleAddToList() {
    add(lastPath, 0, 0)
  }

  return (
    <div className="p-3 space-y-2 bg-sky-50/90 rounded fixed right-2 top-2">
      <Button
        size='sm'
        onClick={handleAddToList}
      >
        添加到收藏
      </Button>
    </div>
  )
}

export default AddButton
