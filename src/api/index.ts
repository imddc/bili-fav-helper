import type { BaseDetail, ResponseType } from "~/types"

const baseUrl = 'https://api.bilibili.com/x/'

enum Routes {
  baseDetail = 'web-interface/view',
}

export async function requestBaseDetail(bv: string): Promise<ResponseType<BaseDetail>> {
  return fetch(`${baseUrl}${Routes.baseDetail}?bvid=${bv}`).then(
    res => res.json()
  )
}
