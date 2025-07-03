import { useMemo } from 'react'
type Options = {
  contentHeight?: number | string
}
const defaultContnetHeight = 550
const useMolstarTools = ({ contentHeight }: Options) => {
  const rootHeight = useMemo(() => {
    if (!contentHeight)
      return `${defaultContnetHeight}px`
    if (typeof contentHeight === 'number')
      return `${contentHeight}px`
    return contentHeight
  }, [contentHeight])
  return { rootHeight }
}

export { useMolstarTools }
