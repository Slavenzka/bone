import React from 'react'
import css from './SelectMenu.module.scss'
import ListWithScrollbar from 'components/ListWithScrollbar/ListWithScrollbar'
import { useSelector } from 'react-redux'

const SelectMenu = ({ children }) => {
  const fontSize = useSelector(state => state.elastic.curFontSize)
  const fontSizeScale = fontSize / 10

  return (
    <div className={css.wrapper}>
      <ListWithScrollbar
        className={css.scrollbar}
        listHeight={5 * 45 * fontSizeScale}
        itemHeight={45 * fontSizeScale}
        itemCount={children.length}
      >
        {(style, index) => (
          <div style={{ ...style }}>
            { children[index] }
          </div>
        )}
      </ListWithScrollbar>
    </div>
  )
}

export default SelectMenu
