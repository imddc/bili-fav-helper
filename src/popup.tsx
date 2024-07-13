import { useState } from "react"
import { requestBaseDetail } from '~/api'
import { Input } from '~/components/ui/input'
import './main.css'

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  sendResponse('我收到了你的来信')
  console.log('接收了来自 content.js的消息', req.info)
})


async function getBVDetail() {
  const res = await requestBaseDetail('BV1Sb4y1X7p7')
  console.log(res, 'res')
}


function IndexPopup() {
  const [data, setData] = useState("111")

  getBVDetail()

  return (
    <div className="text-red-500 text-2xl w-80 p-4 space-y-2">
      <div>
        this is bili fav helper
      </div>

      <Input placeholder="input here" />
    </div>
  )
}

export default IndexPopup
