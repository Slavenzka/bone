import React from 'react'
import css from './Input.module.scss'
import classnames from 'classnames'

const Input = ({
  className,
  name,
  register,
  type = 'text',
  defaultValue,
  placeholder = 'Enter',
  onChange
}) => {
  return (
    <input
      className={classnames(css.input, className)}
      name={name}
      type={type}
      ref={register}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input
