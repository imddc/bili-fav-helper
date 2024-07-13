const baseUrl = 'https://api.bilibili.com/x/'

enum Routes {
  baseDetail = 'web-interface/view',
}

export async function requestBaseDetail(bv: string) {
  return fetch(`${baseUrl}${Routes.baseDetail}?bvid=${bv}`).then(
    res => res.json()
  )
}
