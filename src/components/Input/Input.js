import React from 'react'
import css from './Input.module.scss'
import classnames from 'classnames'

export const InputTypes = {
  CUSTOMIZATION: 'CUSTOMIZATION',
  CALCULATOR: `CALCULATOR`
}

const Input = ({
  className,
  name,
  register,
  type = 'text',
  defaultValue,
  placeholder = 'Enter',
  onChange,
  isDisabled,
  inputType = InputTypes.CUSTOMIZATION
}) => {
  return (
    <input
      className={classnames(css.input, className, {
        [css.inputCustomization]: inputType === InputTypes.CUSTOMIZATION,
        [css.inputCalculator]: inputType === InputTypes.CALCULATOR
      })}
      name={name}
      type={type}
      ref={register}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      disabled={isDisabled}
    />
  )
}

export default Input
