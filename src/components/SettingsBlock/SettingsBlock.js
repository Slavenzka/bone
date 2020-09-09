import React from 'react'
import css from './SettingsBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import Radio from 'components/Radio/Radio'
import Input from 'components/Input/Input'

const SettingsBlock = ({
  className,
  label,
  hint,
  options,
  namespace,
  register,
}) => {
  const items = options.map(({ value, isDefault }, index) => {
    return (
      <li key={`${label} option#${index}`}>
        <Radio
          name={`radio input ${namespace}`}
          register={register}
          value={value}
          isDefault={isDefault}
        />
      </li>
    )
  })

  items.push(
    <li key={`${label} input field`}>
      <Input
        name={`manual input ${namespace}`}
        register={register}
      />
    </li>
  )

  return (
    <div
      className={classnames(css.wrapper, className)}
    >
      <Heading
        className={css.heading}
        label={label}
        size={HeadingTypes.size.MEDIUM}
        color={HeadingTypes.colors.LIGHTEST}
        tag='h3'
      />
      <ul
        className={css.list}
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr) 8.9rem`
        }}
      >
        {items}
      </ul>
    </div>
  )
}

export default SettingsBlock
