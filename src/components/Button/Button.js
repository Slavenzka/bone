import React from 'react'
import css from './Button.module.scss'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

export const ButtonTypes = {
  BASIC: 'basic',
  BORDERED: 'bordered',
  BURGER: 'burger'
}

const Button = ({
  className,
  label,
  onClick,
  type = 'button',
  buttonStyle = ButtonTypes.BASIC,
  url,
}) => {
  return url
    ? (
      <Link
        className={classnames(css.button, className, {
          [css.buttonBasic]: buttonStyle === ButtonTypes.BASIC,
          [css.buttonBordered]: buttonStyle === ButtonTypes.BORDERED,
        })}
        to={url}
      >
        { label }
      </Link>
    )
    : (
      <button
        className={classnames(css.button, className, {
          [css.buttonBasic]: buttonStyle === ButtonTypes.BASIC,
          [css.buttonBordered]: buttonStyle === ButtonTypes.BORDERED,
          [css.buttonBurger]: buttonStyle === ButtonTypes.BURGER
        })}
        type={type}
        onClick={onClick}
      >
        { label }
      </button>
    )
}

export default Button
