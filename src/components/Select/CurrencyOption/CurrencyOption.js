import React from 'react'
import css from './CurrencyOption.module.scss'
import { components } from 'react-select'

const CurrencyOption = props => {
  const { data = {} } = props
  const { descriptor, icon: Icon } = data

  return (
    <components.Option {...props}>
      <div className={css.option}>
        <p className={css.descriptor}>
          { descriptor }
        </p>
        <p className={css.value}>
          { props.children }
        </p>
        {Icon && <Icon className={css.icon} />}
      </div>
    </components.Option>
  )
}

export default CurrencyOption
