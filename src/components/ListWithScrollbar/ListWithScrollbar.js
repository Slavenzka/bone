import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import SimpleBar from 'simplebar-react'

const ListWithScrollbar = ({
  className,
  children,
  listHeight,
  itemHeight,
  itemCount
}) => {
  const [scrollBarWidth, setScrollbarWidth] = useState(17)
  const listRef = useRef(null)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const updateScrollbarWidth = useCallback(() => {
    if (outerRef.current && innerRef.current) {
      const width = outerRef.current.getBoundingClientRect().width - innerRef.current.getBoundingClientRect().width
      if (width !== scrollBarWidth) {
        setScrollbarWidth(width)
      }
    }
  },[setScrollbarWidth, scrollBarWidth])

  useEffect(() => {
    updateScrollbarWidth()
  })

  return (
    <SimpleBar
      style={{ height: `${listHeight / 10}rem` }}
      autoHide={false}
    >
      {({ scrollableNodeRef, contentNodeRef }) => {
        let listWidth = '100%'
        if (scrollableNodeRef.current && contentNodeRef.current && listRef.current) {
          outerRef.current = scrollableNodeRef.current
          innerRef.current = contentNodeRef.current
          const scrollWidthRelative = scrollBarWidth / listRef.current._outerRef.getBoundingClientRect().width * 100
          listWidth = `10${scrollWidthRelative}%`
        }
        return (
          <>
            <List
              height={listHeight}
              ref={listRef}
              itemCount={itemCount}
              itemSize={itemHeight}
              width={listWidth}
              outerRef={scrollableNodeRef}
              innerRef={contentNodeRef}
            >
              {({ style, index }) => {
                return children(style, index)
              }}
            </List>
          </>
        )}}
    </SimpleBar>
  )
}

export default ListWithScrollbar
