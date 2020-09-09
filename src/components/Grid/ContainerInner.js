import React from 'react'
import css from './Grid.module.scss'
import classnames from 'classnames'

const ContainerInner = ({
  className,
  children
}) => {
  return (
    <div className={classnames(css.containerInner, className)}>
      { children }
    </div>
  )
}

export default ContainerInner
