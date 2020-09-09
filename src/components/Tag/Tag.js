import React from 'react'
import css from './Tag.module.scss'
import classnames from 'classnames'

const Tag = ({
  className,
  label,
}) => {
  return (
    <span className={classnames(css.tag, className)}>
      { label }
    </span>
  )
}

export default Tag
