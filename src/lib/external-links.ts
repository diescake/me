export function addExternalLinkIcons(htmlContent: string): string {
  // 内部リンクのパターン（/から始まるパス）を除外し、外部リンクにのみアイコンを追加
  const regex = /<a\s+(?:[^>]*?\s+)?href="((?!\/)[^"]+)"([^>]*)>(.*?)<\/a>/g

  return htmlContent.replace(regex, (match, url, attrs, text) => {
    try {
      // URLが有効かチェック
      new URL(url)
      // メールリンクは除外
      if (url.startsWith('mailto:')) {
        return match
      }
      // 外部リンクの場合、アイコンを追加
      return `<a href="${url}"${attrs} class="inline-flex items-center">${text}<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1 -mt-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`
    } catch {
      // 無効なURLの場合は元のリンクをそのまま返す
      return match
    }
  })
}
