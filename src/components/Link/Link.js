// common
import React from 'react'
import PropTypes from 'prop-types'
// packages
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
// styles
import css from './link.scss'

const Link = ({ children, className, link, text, ...extraProps }) => {
  const componentProps = { ...extraProps }

  const route = link || '#'

  const isHttp = route && typeof route === 'string' && route.indexOf('http') !== -1

  const Component = route && isHttp ? 'a' : RouterLink

  if (route) {
    if (isHttp) {
      componentProps.tag = 'a'
      componentProps.href = route
      componentProps.target = '_blank'
      componentProps.rel = 'noopener noreferrer'
    } else {
      componentProps.to = route
    }
  }

  return (
    <Component
      className={cn(className, css.link)}
      {...componentProps}
    >
      {text && text}
      {children && children}
    </Component>
  )
}

Link.propTypes = {
  /** текст */
  children: PropTypes.node,
  /** Дополнительный класс */
  className: PropTypes.string,
  /** Ссылка */
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** текст */
  text: PropTypes.string
}

export default Link
