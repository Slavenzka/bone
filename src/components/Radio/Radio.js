import React from 'react'
import css from './Radio.module.scss'
import classnames from 'classnames'

const Radio = ({
  className,
  name,
  register,
  value,
  isDefault
}) => {
  const id=`id for ${value}`

  return (
    <>
      <input
        className={classnames(css.input, 'visuallyHidden')}
        type='radio'
        name={name}
        ref={register}
        value={value}
        defaultChecked={isDefault}
        id={id}
      />
      <label htmlFor={id} className={css.label}>
        { value }
      </label>
    </>

  )
}

export default Radio
